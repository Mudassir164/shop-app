import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import ProductReducers from "./Store/Reducer/Products";
import CartReducers from "./Store/Reducer/Cart";
import OrderReducers from "./Store/Reducer/Order";
import ProductOverviewScreen from "./Screen/Shop/ProductOverviewScreen";

import Navigation from "./ShopNavigator/Navigation";

const rootReducer = combineReducers({
  products: ProductReducers,
  cart: CartReducers,
  orders: OrderReducers,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
