import { ADD_ORDER, SET_ORDER } from "../action/Order";
import Order from "../../modal/Order";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER:
      return {
        orders: action.orders,
      };
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,

        action.orderData.item,
        action.orderData.amount,
        action.orderData.date
      );

      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
  }
  return state;
};
