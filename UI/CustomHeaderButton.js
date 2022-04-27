import React from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const CustomHeaderButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View>
        <Ionicons name={props.name} size={27} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default CustomHeaderButton;
