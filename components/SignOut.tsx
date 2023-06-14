import { gql, useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "../lib/User";

type Props = {
    children: any,
};

const SIGN_OUT_MUTATION = gql`
    mutation {
        endSession
    }
`;

const SignOut = ({ children }: Props) => {
    const [signout] = useMutation(SIGN_OUT_MUTATION, {
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });
    return (
        <button type="button" onClick={() => signout()}>{children}</button>
    );
};

export default SignOut;