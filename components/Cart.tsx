import { styled } from "styled-components";
import { useUser } from "../lib/User";
import CartStyles from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import formatMoney from "../lib/formatMoney";
import calcTotalPrice from "../lib/calcTotalPrice";
import { useCart } from "../lib/cartState";
import CloseButton from "./styles/CloseButton";

type CartItemType = {
    id: string,
    quantity: number,
    product: {
        id: string,
        price: number,
        name: string
        description: string,
        photo: {
            image: {
                publicUrlTransformed: string,
            },
        },
    },
};

type Props = {
    cartItem: CartItemType,
};

const CartItemStyles = styled.li`
    padding: 1rem 0;
    border-bottom: 1px solid var(--lightGrey);
    display: grid;
    grid-template-columns: auto 1fr auto;
    img {
        margin-right: 1rem;
    }
    h3,
    p {
        margin: 0;
    }
`

const CartItem = ({ cartItem }: Props) => {
    const { product } = cartItem;
    if (!product) return null;
    return (
        <CartItemStyles>
            <img width="100" src={product.photo.image.publicUrlTransformed} alt={product.name} />
            <div>
                <h3>{product.name}</h3>
                <p>
                    {formatMoney(product.price * cartItem.quantity)}
                    {` : `}
                    <em>{cartItem.quantity} &times; {formatMoney(product.price)} each</em>
                </p>
            </div>
        </CartItemStyles>
    )
};

const Cart = () => {
    const me = useUser();
    const { cartOpen, closeCart } = useCart();
    if (!me) return null;
    return (
        <CartStyles open={cartOpen}>
            <header>
                <Supreme>{me.name}'s Cart</Supreme>
                <CloseButton onClick={() => closeCart()}>&times;</CloseButton>
            </header>
            <ul>
                {me.cart.map((cartItem: CartItemType) => <CartItem key={cartItem.id} cartItem={cartItem} />)}
            </ul>
            <footer>
                <p>{formatMoney(calcTotalPrice(me.cart))}</p>
            </footer>
        </CartStyles>
    );
};

export default Cart;