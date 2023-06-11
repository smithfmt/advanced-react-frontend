import { useQuery, gql, useMutation } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";
import FormStyles from "./styles/FormStyles";
import useForm from "../lib/useForm";

type Props = {
    id: string,
};

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    product(where: { id: $id }) {
        id
        name
        description
        price
    }
  }  
`;

const UPDATE_PRODUCT_MUTATION = gql`
    mutation UPDATE_PRODUCT_MUTATION(
        $id: ID!
        $name: String
        $description: String
        $price: Int
    ) {
        updateProduct(
            where: {id: $id},
            data: { name: $name, description: $description, price: $price },
        ) {
            id
            name
            description
            price
        }
    }
`

const UpdateProduct = ({ id }: Props) => {
    const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, { variables: { id } })
    const [updateProduct, { data: mutData, error: mutError, loading: mutLoading }] = useMutation(UPDATE_PRODUCT_MUTATION);

    const { inputs, handleChange, resetForm, clearForm } = useForm(data?.product);
    if (loading) return <p>Loading...</p>;
    return (
        <FormStyles onSubmit={async (e) => {
            e.preventDefault();
            const res = await updateProduct({
                variables: {
                    id,
                    name: inputs.name,
                    description: inputs.description,
                    price: inputs.price,
                }
            });
            // const res = await createProduct();
            // clearForm();
            // Router.push({    
            //     pathname: `/product/${res.data.createProduct.id}`,
            // });
        }}>
            <ErrorMessage error={error || mutError} />
            <fieldset disabled={mutLoading} aria-busy={mutLoading}>
                <label htmlFor="name">
                    Name
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={inputs.name}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="price">
                    Price
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="price"
                        value={inputs.price}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="description">
                    Description
                    <textarea
                        id="description"
                        name="description"
                        placeholder="description"
                        value={inputs.description}
                        onChange={handleChange}
                    />
                </label>

                <button type="submit">Update Product</button>
            </fieldset>
        </FormStyles>
    );
};

export default UpdateProduct;