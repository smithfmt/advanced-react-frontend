import { gql, useMutation } from "@apollo/client";
import useForm from "../lib/useForm";
import ErrorMessage from "./ErrorMessage";
import FormStyles from "./styles/FormStyles";
import Router from "next/router";


const RESET_MUTATION = gql`
    mutation RESET_MUTATION($email: String!, $token: String!, $password: String!) {
        redeemUserPasswordResetToken(email: $email, token: $token, password: $password) {
            code
            message
        }
    }
`;

type Props = {
    token: string,
};

const Reset = ({ token }: Props) => {
    const { inputs, handleChange, resetForm } = useForm({ email: "", password: "", token, });
    const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
        variables: inputs,
    });
    const successError = data?.redeemUserPasswordResetToken?.code ? data?.redeemUserPasswordResetToken : undefined;
    return (
        <FormStyles method="post" onSubmit={async (e) => {
            e.preventDefault();
            await reset().catch(console.error);
            resetForm();
        }}>
            <ErrorMessage error={error || successError} />
            <h2>Reset your Password</h2>
            <fieldset disabled={loading} aria-busy={loading}>
                {data?.redeemUserPasswordResetToken === null && <p>Success! You can Now Sign in</p>}
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
                <label htmlFor="password">
                    Password
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="password"
                        value={inputs.password}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Request Reset</button>
            </fieldset>
        </FormStyles>
    );
};
export default Reset;