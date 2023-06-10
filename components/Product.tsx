import Link from "next/link";
import ItemStyles from "./styles/ItemStyles";
import Title from "./styles/Title";
import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";

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
        </ItemStyles>
    );
};

export default Product;