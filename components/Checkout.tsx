import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import styled from "styled-components";
import SickButton from "./styles/SickButton";
import { FormEvent, useState } from "react";
import nProgress from "nprogress";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useCart } from "../lib/cartState";
import { CURRENT_USER_QUERY } from "../lib/User";


const CheckoutFormStyles = styled.form`
    box-shadow: 0 1px 2px 2px rgba(0,0,0,0.04);
    border: 1px solid rgba(0,0,0,0.06);
    border-radius: 5px;
    padding: 1rem;
    display: grid;
    grid-gap: 1rem;
`;

const CREATE_ORDER_MUTATION = gql`
    mutation CREATE_ORDER_MUTATION($token: String!) {
        checkout(token: $token) {
            id
            charge
            total
            items {
                id
                name
            }
        }
    }  
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY||"")

const CheckoutForm = () => {
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();
    const { closeCart } = useCart();
    const [checkout, {error: graphqlError}] = useMutation(CREATE_ORDER_MUTATION, { refetchQueries: [{ query: CURRENT_USER_QUERY }] });
    const handleSubmit = async (e: FormEvent) => {
        if (!stripe||!elements) return false; // return error
        // stop form submit and turn loader on
        e.preventDefault();
        setLoading(true);
        // start the page transition
        nProgress.start();
        // create the payment method via stripe
        const cardElement = elements.getElement(CardElement);
        if (!cardElement) return false; // return error
        const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });
        // handle any errors from stripe 
        if (paymentError) {
            setError(paymentError);
            nProgress.done();
            return;
        };
        // send token to keystone server via custom mutation
        const order = await checkout({ variables: { token: paymentMethod.id } });
        // change page to view the order
        router.push({
            pathname: "/order/[id]",
            query: { id: order.data.checkout.id },
        });
        // close the cart
        closeCart();
        // turn off loader
        setLoading(false);
        nProgress.done();
    };

    return (
        <CheckoutFormStyles onSubmit={(e) => {handleSubmit(e)}}>
            {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
            {graphqlError && <p style={{ fontSize: 12 }}>{graphqlError.message}</p>}
            <CardElement/>
            <SickButton>Check Out Now</SickButton>
        </CheckoutFormStyles>
    );
};

const Checkout = () => {
    return (
        <Elements stripe={stripeLib}>
            <CheckoutForm />
        </Elements>
    );
};

export default Checkout;