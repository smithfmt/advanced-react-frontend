const calcTotalPrice = (cart: [{ product: { price: number }, quantity: number }]) => {
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.product) return tally;
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
};

export default calcTotalPrice;