import { FlatList, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderItem from "../../component/shop/OrderItem";
import * as OrderAction from "../../Store/action/Order";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";

const OrderScreen = () => {
  const OrderItems = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  const [Isloading, setIsloading] = useState(false);

  useEffect(() => {
    setIsloading(true);
    dispatch(OrderAction.fetchOrders());
    setIsloading(false);
  }, [dispatch, setIsloading]);

  if (Isloading) {
    return (
      <View
        style={{ flex: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  return (
    <FlatList
      data={OrderItems}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.item}
        />
      )}
    />
  );
};

export default OrderScreen;
