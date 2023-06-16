import { gql, useQuery } from "@apollo/client";
import ErrorMessage from "../components/ErrorMessage";
import formatMoney from "../lib/formatMoney";
import styled from "styled-components";
import OrderItemStyles from "../components/styles/OrderItemStyles";
import Link from "next/link";
import Head from "next/head";

const USER_ORDER_QUERY = gql`
    query USER_ORDER_QUERY {
        orders {
            id
            charge
            total
            user {
                id
            }
            items {
                id
                name
                description
                price
                quantity
                photo {
                    image {
                        publicUrlTransformed
                    }
                }
            }
        }
    }
`;

const OrderUl = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    grid-gap: 4rem;
`;

const countItemsInOrder = (order: any) => {
    return order.items.reduce((acc:any, cur:any) => acc + cur.quantity, 0);
};

const OrderPage = () => {
    const { data, error, loading } = useQuery(USER_ORDER_QUERY);
    if (loading) return <p>Loading...</p>;
    if (error) return <ErrorMessage error={error} />;
    const { orders } = data;
    return (
        <div>
            <Head>
                <title>Your Orders ({orders.length})</title>
            </Head>
            <h2>You have {orders.length} orders!</h2>
            <OrderUl>
                {orders.map((order: any) => {
                    const itemCount = countItemsInOrder(order);
                    return(
                        <OrderItemStyles>
                            <Link href={`/order/${order.id}`}>
                                <div className="order-meta">
                                    <p>{itemCount} Item{itemCount>1&&"s"}</p>
                                    <p>{order.items.length} Product{order.items.length>1&&"s"}</p>
                                    <p>{formatMoney(order.total)}</p>
                                </div>
                                <div className="images">
                                    {order.items.map((item:any) => <img key={item.id} src={item.photo?.image?.publicUrlTransformed} alt={item.name} />)}
                                </div>
                            </Link>
                        </OrderItemStyles>
                    )}
                )}
            </OrderUl>
        </div>
    );
};

export default OrderPage;