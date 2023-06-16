import { gql, useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "../lib/User";

const ADD_TO_CART_MUTATION = gql`
    mutation ADD_TO_CART_MUTATION($id: ID!) {
        addToCart(productId: $id) {
            id
        }
    }
`;

const AddToCart = ({ id }: { id: string}) => {
    const [addToCart, {loading}] = useMutation(ADD_TO_CART_MUTATION, {
        variables: {id},
        refetchQueries: [{query: CURRENT_USER_QUERY}],
    });
    return (
        <button type="button" disabled={loading} onClick={() => {addToCart()}}>Add{loading && "ing"} To Cart {">"}</button>
    );
};

export default AddToCart;