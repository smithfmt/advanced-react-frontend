import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import { useUser } from "../lib/User";
import SignOut from "./SignOut";
import { useCart } from "../lib/cartState";
import CartCount from "./CartCount";

const Nav = () => {
    const user = useUser();
    const { openCart } = useCart();
    return (
        <NavStyles>
            <Link href="/products">Products</Link>
            {
                user && (
                    <>
                        <Link href="/sell">Sell</Link>
                        <Link href="/orders">Orders</Link>
                        <Link href="/account">Account</Link>
                        <SignOut>Sign Out</SignOut>
                        <button type="button" onClick={() => openCart()}>
                            My Cart
                            <CartCount count={user.cart.reduce((acc: number, cur: any) => {return acc + (cur.product ? cur.quantity:0)},0)} />
                        </button>
                    </>
                )
            }
            {
                !user && (
                    <Link href="/signin">Sign In</Link>
                )
            }

        </NavStyles>
    );
};

export default Nav;