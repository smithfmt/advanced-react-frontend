import { gql, useMutation } from "@apollo/client";
import useForm from "../lib/useForm";
import ErrorMessage from "./ErrorMessage";
import FormStyles from "./styles/FormStyles";
import Router from "next/router";


const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!) {
        sendUserPasswordResetLink(email: $email)
    }
`;

const RequestReset = () => {
    const { inputs, handleChange, resetForm } = useForm({ email: "" });
    const [signup, { data, loading, error }] = useMutation(REQUEST_RESET_MUTATION, {
        variables: inputs,
    });
    return (
        <FormStyles method="post" onSubmit={async (e) => {
            e.preventDefault();
            await signup().catch(console.error);
            resetForm();
        }}>
            <ErrorMessage error={error} />
            <h2>Request a Password Reset</h2>
            <fieldset disabled={loading} aria-busy={loading}>
                {data?.sendUserPasswordResetLink === true && <p>Success! Check your email for a link!</p>}
                <label htmlFor="email">
                    Email
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email Adress"
                        autoComplete="email"
                        value={inputs.email}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Request Reset</button>
            </fieldset>
        </FormStyles>
    );
};
export default RequestReset;