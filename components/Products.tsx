import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Product from "./Product";
import { perPage } from "../config";

export const ALL_PRODUCTS_QUERY = gql`
    query ALL_PRODUCTS_QUERY($skip: Int = 0, $take: Int) {
        products(take: $take, skip: $skip) {
            id
            name
            price
            description
            photo {
                id
                image {
                    publicUrlTransformed
                }
            }
        }
    }
`;

const ProductsListStyles = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
`;

type Props = {
    page: number,
};

const Products = ({ page }: Props) => {
    const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
        variables: {
            skip: page * perPage - perPage,
            take: perPage,
        }
    });
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>
    return (
        <div>
            <ProductsListStyles>
                {data.products.map((product: any) => {
                    return (
                        <Product key={product.id} product={product} />
                    )
                })}
            </ProductsListStyles>
        </div>
    );
};

export default Products;