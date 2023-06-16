import Head from "next/head"
import PaginationStyles from "./styles/PaginationStyles"
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";
import { perPage } from "../config";

type Props = {
    page: number,
};

export const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        productsCount
    }  
`;

const Pagination = ({ page }: Props) => {
    const { data, error, loading } = useQuery(PAGINATION_QUERY);
    if (loading) return "Loading..."
    if (error) return <ErrorMessage error={error} />
    const { productsCount: count } = data;
    const pageCount = Math.ceil(count / perPage);
    return (
        <PaginationStyles>
            <Head>
                <title> Sick Fits - Page {page} of {pageCount}</title>
            </Head>
            <Link href={`/products/${page - 1}`} aria-disabled={page <= 1}>{"<- Prev"}</Link>
            <p>Page {page} of {pageCount}</p>
            <p>{count} Items Total</p>
            <Link href={`/products/${page + 1}`} aria-disabled={page >= pageCount}>{"Next ->"}</Link>
        </PaginationStyles>
    );
};

export default Pagination;