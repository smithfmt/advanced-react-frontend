import UpdateProduct from "../components/UpdateProduct";

type Props = {
    query: {
        id: string,
    },
};

const UpdatePage = ({ query }: Props) => {
    return (
        <div>
            <UpdateProduct id={query.id} />
        </div>
    );
};

export default UpdatePage;