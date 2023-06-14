import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";


interface StateContextType {
    cartOpen: boolean
    setCartOpen: Dispatch<SetStateAction<boolean>>;
    toggleCart: Function,
    openCart: Function,
    closeCart: Function,
}

const LocalStateContext = createContext<StateContextType>({
    cartOpen: false,
    setCartOpen: () => { },
    toggleCart: () => { },
    openCart: () => { },
    closeCart: () => { },
});

type Props = {
    children?: ReactNode,
};

const CartStateProvider = ({ children }: Props) => {
    // This is our own custom provider, we will store data and functionality here and anyone can access it via a consumer
    const [cartOpen, setCartOpen] = useState(false);
    const toggleCart = () => setCartOpen(!cartOpen);
    const openCart = () => setCartOpen(true);
    const closeCart = () => setCartOpen(false);
    return (
        <LocalStateContext.Provider value={{ cartOpen, setCartOpen, toggleCart, openCart, closeCart }}>
            {children}
        </LocalStateContext.Provider>
    );
};

const useCart = () => {
    const all = useContext(LocalStateContext);
    return all;
};

export { CartStateProvider, useCart };