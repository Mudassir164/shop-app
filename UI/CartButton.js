import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constant/Colors";

const CartButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          marginLeft: 10,
          position: "relative",
          width: 52,
          height: 35,
        }}
      >
        <Ionicons name="cart" size={30} color="white" />
        <View
          style={{
            marginLeft: 10,
            position: "absolute",
            top: -3,
            right: 4,
            width: 20,
            height: 20,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FF0000",
          }}
        >
          <Text style={{ color: "white" }}>{props.itemQuant}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartButton;
