import { View, Text, FlatList, Button, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as cartAction from "../../Store/action/Cart";
import * as productAction from "../../Store/action/Product";
import ProductItem from "../../component/shop/ProductItem";
import CustomHeaderButton from "../../UI/CustomHeaderButton";
import CartButton from "../../UI/CartButton";
import Colors from "../../constant/Colors";

const ProductOverviewScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.availableProducts);
  const Carts = useSelector((state) => state.cart.items);
  const Quantity = Object.values(Carts).reduce((a, b) => a + b.quantity, 0);
  const totalCartProduct = Quantity;
  const [isLoading, setisLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  // ______________________________=_______________________________________
  const LoadedProducts = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(productAction.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setError, setisLoading, productAction]);

  useEffect(() => {
    setisLoading(true);
    LoadedProducts().then(() => {
      setisLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    navigation.setOptions({
      title: "All Products",
      headerRight: () => (
        <>
          <CartButton
            onPress={() => {
              navigation.navigate("CartScreen");
            }}
            itemQuant={totalCartProduct}
          />
        </>
      ),
      headerLeft: () => (
        <>
          <CustomHeaderButton
            onPress={() => {
              navigation.toggleDrawer();
            }}
            name="md-menu"
          />
        </>
      ),
    });
  }, [navigation, totalCartProduct]);

  //______________________________________-________________________________________

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Some thing went wrong</Text>
        <Button
          title="try Again!"
          onPress={LoadedProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (products.length === 0 && !isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No Products Found</Text>
      </View>
    );
  }
  return (
    <FlatList
      onRefresh={LoadedProducts}
      refreshing={isRefreshing}
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imagUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          buttonFunction1={() => {
            navigation.navigate("ProductDetailScreen", {
              productId: itemData.item.id,
              title: itemData.item.title,
            });
          }}
          navigation={navigation}
          productId={itemData.item.id}
          buttonFunction2={() => {
            dispatch(cartAction.addToCart(itemData.item));
          }}
          buttonTitle1="View Details"
          buttonTitle2="Add to cart"
        />
      )}
    />
  );
};

export default ProductOverviewScreen;
