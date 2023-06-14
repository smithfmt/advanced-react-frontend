import { gql, useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "../lib/User";
import useForm from "../lib/useForm";
import ErrorMessage from "./ErrorMessage";
import FormStyles from "./styles/FormStyles";
import Router from "next/router";


const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
        createUser(data: { email: $email,name: $name,password: $password }) {
            id
            email
            name
        }
    }
`;

const SignUp = () => {
    const { inputs, handleChange, resetForm } = useForm({ email: "", password: "", name: "" });
    const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
        variables: inputs,
    });
    return (
        <FormStyles method="post" onSubmit={async (e) => {
            e.preventDefault();
            await signup().catch(console.error);
            resetForm();
        }}>
            <ErrorMessage error={error} />
            <h2>Sign Up For An Account</h2>
            <fieldset disabled={loading} aria-busy={loading}>
                {data?.createUser && <p>Signed up with {data.createUser.email} - Please Go Ahead and Sign in</p>}
                <label htmlFor="name">
                    Your Name
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        autoComplete="name"
                        value={inputs.name}
                        onChange={handleChange}
                    />
                </label>
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
export default SignUp;