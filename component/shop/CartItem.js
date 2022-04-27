import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../../constant/Colors";

const CartItem = (props) => {
  return (
    // <View style={styles.cartItem}>
    //   <View style={styles.itemData}>
    //     <Text style={styles.quantity}>{props.quantity} </Text>
    //     <Text style={styles.mainText}>{props.title}</Text>
    //   </View>
    //   <View style={styles.itemData}>
    //     <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>

    //   </View>
    // </View>
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        // justifyContent: "center",
        alignContent: "flex-end",
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "white",
        marginBottom: 5,
        margin: 10,
      }}
    >
      <View
        style={{ borderColor: Colors.accent, borderWidth: 3, borderRadius: 50 }}
      >
        <Image
          style={styles.image}
          source={{
            uri: props.imagUrl,
          }}
        />
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "flex-end",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",

            justifyContent: "space-between",
            alignitems: "center",
          }}
        >
          <Text style={styles.title}>{props.title}</Text>
          {props.btnShow ? (
            <View>
              <TouchableOpacity
                onPress={props.onRemove}
                // style={styles.deleteButton}
              >
                <Ionicons
                  name={
                    Platform.OS === "android" ? "md-close-outline" : "ios-trash"
                  }
                  size={25}
                  color={Colors.accent}
                />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",

            justifyContent: "space-between",
            alignitems: "center",
            padding: 3,
          }}
        >
          <Text style={styles.quantity}>{props.quantity} </Text>
          <Text style={styles.price}>${props.amount.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    // marginLeft: 10,
    // marginTop: 10,
  },
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    // fontFamily: 'open-sans',
    color: "#888",
    fontSize: 18,
  },
  mainText: {
    // fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default CartItem;
