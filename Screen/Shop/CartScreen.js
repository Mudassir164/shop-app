import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../component/shop/CartItem";
import Colors from "../../constant/Colors";
import * as cartAction from "../../Store/action/Cart";
import * as OrderAction from "../../Store/action/Order";

const CartScreen = () => {
  const cartTotalAmount = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const cartss = useSelector((state) => state.cart);
  const [Isloading, setIsloading] = useState(false);
  const productI = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].Producttitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
        imagUrl: state.cart.items[key].imagUrl,
      });
    }
    return transformedCartItems;
  });
  const sendOrderHandler = async () => {
    if (!cartTotalAmount) {
      alert("Your cart is empty");
      return;
    }
    setIsloading(true);
    await dispatch(OrderAction.addOrder(productI, cartTotalAmount));
    setIsloading(false);
  };
  return (
    <View>
      <View style={styles.card}>
        <View style={styles.total}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Total:</Text>
          <Text
            style={{ fontSize: 20, fontWeight: "bold", color: Colors.primary }}
          >
            ${cartTotalAmount.toFixed(2)}
          </Text>
        </View>
        <View style={styles.Button}>
          {Isloading ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <Button
              title="Order Now"
              color={Colors.primary}
              onPress={sendOrderHandler}
            />
          )}
        </View>
      </View>
      <FlatList
        data={productI}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            onRemove={() => {
              dispatch(cartAction.removeFromCart(itemData.item.productId));
            }}
            btnShow={true}
            imagUrl={itemData.item.imagUrl}
          />
        )}
      />
    </View>
  );
};

export default CartScreen;
const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 3,
  },
  total: {
    flexDirection: "row",
  },
  Button: {
    borderRadius: 10,
  },
});
