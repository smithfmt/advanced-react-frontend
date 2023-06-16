import Link from "next/link";
import ItemStyles from "./styles/ItemStyles";
import Title from "./styles/Title";
import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";
import DeleteProduct from "./DeleteProduct";
import AddToCart from "./AddToCart";

type Props = {
    product: {
        id: string,
        name: string,
        description: string,
        photo?: {
            id: string,
            image: {
                publicUrlTransformed: string,
            },
        },
        photoId?: string,
        status?: string,
        price?: number,
    }
}

const Product = ({ product }: Props) => {
    return (
        <ItemStyles>
            <img src={product?.photo?.image?.publicUrlTransformed} alt={product.name} />
            <Title>
                <Link href={`/product/${product.id}`}>{product.name}</Link>
            </Title>
            <PriceTag>{formatMoney(product.price)}</PriceTag>
            <p>{product.description}</p>
            <div className="buttonList">
                <Link href={{
                    pathname: "update",
                    query: {
                        id: product.id,
                    }
                }}>
                    {"Edit >"}
                </Link>
                <AddToCart id={product.id} />
                <DeleteProduct id={product.id} >Delete x</DeleteProduct>
            </div>
        </ItemStyles>
    );
};

export default Product;