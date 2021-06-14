import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

export const selectCartItemsCount = createSelector (
    [selectCartItems],
    cartItems =>
      cartItems.reduce(                                       //reduce è un selettore x ottenere uno stato
          (accumulatedQuantity, cartItem) =>
          accumulatedQuantity + cartItem.quantity,
          0
      )
);