import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../component/shop/ProductItem";
import * as ProductAction from "../../Store/action/Product";
import CustomHeaderButton from "../../UI/CustomHeaderButton";

const UserProductScreen = ({ navigation }) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();
  const edit = (id) => {
    navigation.navigate("EditProductScreen", { productId: id });
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <CustomHeaderButton
            onPress={() => {
              navigation.navigate("EditProductScreen", { productId: "" });
            }}
            name="pencil"
          />
        </>
      ),
    });
  }, [navigation]);
  const deleteProduct = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(ProductAction.deleteProduct(id));
        },
      },
    ]);
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imagUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          productId={itemData.item.id}
          buttonTitle1="Edit"
          buttonTitle2="Delete"
          buttonFunction1={() => {
            edit(itemData.item.id);
          }}
          buttonFunction2={() => {
            deleteProduct(itemData.item.id);
          }}
        />
      )}
    />
  );
};

export default UserProductScreen;

const styles = StyleSheet.create({});
