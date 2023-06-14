import { useQuery, gql, useMutation } from "@apollo/client";

type Props = {
    id: string,
    children: any,
};

const DELETE_PRODUCT_MUTATION = gql`
    mutation DELETE_PRODUCT_MUTATION($id: ID!) {
        deleteProduct(where: {id: $id}) {
            id
            name
        }
    }
`;

const update = (cache: any, payload: any) => {
    cache.evict(cache.identify(payload.data.deleteProduct))
};

const DeleteProduct = ({ id, children }: Props) => {
    const [deleteProduct, { loading }] = useMutation(
        DELETE_PRODUCT_MUTATION,
        { variables: { id }, update, },
    );
    return (
        <button type="button" disabled={loading} onClick={() => {
            if (confirm("Are you sure you want to delete this item?")) {
                deleteProduct().catch(err => alert(err.message))
            };
        }}>
            {children}
        </button>
    );
};

export default DeleteProduct;