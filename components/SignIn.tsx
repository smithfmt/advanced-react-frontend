import { gql, useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "../lib/User";
import useForm from "../lib/useForm";
import ErrorMessage from "./ErrorMessage";
import FormStyles from "./styles/FormStyles";
import Router from "next/router";


const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!) {
        authenticateUserWithPassword(email: $email, password: $password) {
            ... on UserAuthenticationWithPasswordSuccess {
                item {
                    id
                }
            }
            ... on UserAuthenticationWithPasswordFailure {
                message
            }
        } 
    }
`;

const SignIn = () => {
    const { inputs, handleChange, resetForm } = useForm({ email: "", password: "" });
    const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
        variables: inputs,
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });

    const error = data?.authenticateUserWithPassword?.__typename === "UserAuthenticationWithPasswordFailure"
        ? { ...data?.authenticateUserWithPassword, code: "400" }
        : undefined;
    return (
        <FormStyles method="post" onSubmit={async (e) => {
            e.preventDefault();
            await signin();
            resetForm();
            if (!error) {
                Router.push({
                    pathname: `/`,
                });
            };
        }}>
            <ErrorMessage error={error} />
            <h2>Sign Into Your Account</h2>
            <fieldset disabled={loading} aria-busy={loading}>
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
                <button type="submit">Sign In!</button>
            </fieldset>
        </FormStyles>
    );
};
export default SignIn;