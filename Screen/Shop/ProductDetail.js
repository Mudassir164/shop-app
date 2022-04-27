import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Image,
} from "react-native";
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constant/Colors";
import * as cartAction from "../../Store/action/Cart";

const ProductDetail = ({ route, navigation }) => {
  const { productId, title } = route.params;
  useEffect(() => {
    navigation.setOptions({ title: title });
  }, [navigation]);

  const dispatch = useDispatch();

  const ProductDetails = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: ProductDetails.imagUrl }} />

      <View
        style={{
          height: 50,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 10,
          // borderColor: "black",
          // borderWidth: 1,
        }}
      >
        <Button
          title="Add to Cart"
          color={Colors.primary}
          onPress={() => {
            dispatch(cartAction.addToCart(ProductDetails));
          }}
        />
      </View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 17,
          color: "grey",
          fontWeight: "bold",
        }}
      >
        ${ProductDetails.price}
      </Text>
      <Text style={{ textAlign: "center" }}>{ProductDetails.description}</Text>
    </ScrollView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
});
