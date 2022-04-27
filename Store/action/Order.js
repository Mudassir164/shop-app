import Order from "../../modal/Order";
export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDER = "SET_ORDER";

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const responce = await fetch(
        "https://shop-react-native-7b7f8-default-rtdb.firebaseio.com/orders/u1.json"
      );
      if (!responce.ok) {
        throw new Error("Something went wrong");
      }
      const resData = await responce.json();
      console.log(resData);
      const loadedOrders = [];
      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }

      dispatch({ type: "SET_ORDER", orders: loadedOrders });
    } catch (error) {
      //send to custom analytics server
      throw error;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  const date = new Date();
  return async (dispatch) => {
    const responce = await fetch(
      "https://shop-react-native-7b7f8-default-rtdb.firebaseio.com/orders/u1.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    const resData = await responce.json();
    console.log(resData.name);
    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        item: cartItems,
        amount: totalAmount,
        date: date,
      },
    });
  };
};
