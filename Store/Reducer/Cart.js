import CartItem from "../../modal/cartItem";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../action/Cart";
import { ADD_ORDER } from "../action/Order";
import { DELETE_PRODUCT } from "../action/Product";

const initialState = {
  items: {},
  totalPrice: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      // console.log(action.product);
      const productPrice = addedProduct.price;
      const producttitle = addedProduct.title;
      const productImage = addedProduct.imagUrl;
      let newCardItem;
      if (state.items[addedProduct.id]) {
        newCardItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          producttitle,
          state.items[addedProduct.id].sum + productPrice,
          productImage
        );
      } else {
        newCardItem = new CartItem(
          1,
          productPrice,
          producttitle,
          productPrice,
          productImage
        );
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: newCardItem },
        totalPrice: state.totalPrice + productPrice,
      };

    // -------------------------------Remove from cart-----------------------------------
    case REMOVE_FROM_CART:
      const currentQuantity = state.items[action.productId].quantity; //to get quantity selected item
      let upDateCartItem;
      if (currentQuantity > 1) {
        const upDateCartItem1 = new CartItem(
          state.items[action.productId].quantity - 1,
          state.items[action.productId].productPrice,
          state.items[action.productId].Producttitle,
          state.items[action.productId].sum -
            state.items[action.productId].productPrice,
          state.items[action.productId].imagUrl
        );
        upDateCartItem = {
          ...state.items,
          [action.productId]: upDateCartItem1,
        };
      } else {
        upDateCartItem = { ...state.items };
        delete upDateCartItem[action.productId];
      }

      return {
        ...state,
        items: upDateCartItem,
        totalPrice:
          state.totalPrice - state.items[action.productId].productPrice,
      };
    case ADD_ORDER:
      return initialState;

    case DELETE_PRODUCT:
      if (!state.items[action.PId]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.PId].sum;
      delete updatedItems[action.PId];
      return {
        ...state,
        items: updatedItems,
        totalPrice: state.totalPrice - itemTotal,
      };
  }
  return state;
};
