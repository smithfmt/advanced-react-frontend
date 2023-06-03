const calcTotalPrice = (cart: [{ item: { price: number }, quantity: number }]) => {
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.item) return tally;
    return tally + cartItem.quantity * cartItem.item.price;
  }, 0);
};

export default calcTotalPrice;