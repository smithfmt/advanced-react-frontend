import SingleProduct from "../../components/SingleProduct";

type Props = {
    query: {
        id: string,
    },
};

const SingleProductPage = ({ query }: Props) => {
    return (
        <SingleProduct id={query.id} />
    );
};

export default SingleProductPage;