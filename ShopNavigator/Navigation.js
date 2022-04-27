// In App.js in a new project

import * as React from "react";
import { View, Text, Platform } from "react-native";
// import { createDrawerNavigator } from "@react-navigation/drawer";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProductOverviewScreen from "../Screen/Shop/ProductOverviewScreen";
import ProductDetailScreen from "../Screen/Shop/ProductDetail";
import CartScreen from "../Screen/Shop/CartScreen";
import OrderScreen from "../Screen/Shop/OrderScreen";
import UserProductScreen from "../Screen/User/UserProductScreen";
import EditProductScreen from "../Screen/User/EditProductScreen";
import Colors from "../constant/Colors";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const HeaderStyle = {
  headerTitleAlign: "center",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: Colors.accent,
  },
  headerTitleStyle: {
    fontWeight: "900",
    fontSize: 20,
  },
};
const DrawerStyle = {
  headerShown: false,
  drawerActiveTintColor: Colors.accent,
  drawerInactiveTintColor: "white",

  drawerItemStyle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  drawerStyle: {
    backgroundColor: "#78b5f4",
    width: 270,
  },
};
const DrawerIcon =
  (name) =>
  ({ focused, size }) =>
    (
      <Ionicons
        name={name}
        size={25}
        color={focused ? Colors.accent : "white"}
      />
    );

function MainScreen() {
  return (
    // <NavigationContainer>
    <Stack.Navigator screenOptions={HeaderStyle}>
      <Stack.Screen name="Home" component={ProductOverviewScreen} />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
      <Stack.Screen name="CartScreen" component={CartScreen} />
    </Stack.Navigator>
  );
}
function OrderScreens() {
  return (
    <Stack.Navigator screenOptions={HeaderStyle}>
      <Stack.Screen name="Order" component={OrderScreen} />
    </Stack.Navigator>
  );
}
function UserProductScreens() {
  return (
    <Stack.Navigator screenOptions={HeaderStyle}>
      <Stack.Screen name="User Product" component={UserProductScreen} />
      <Stack.Screen name="EditProductScreen" component={EditProductScreen} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();
function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="MainScreen"
        screenOptions={DrawerStyle}
      >
        <Drawer.Screen
          name="Products"
          component={MainScreen}
          options={{
            drawerIcon: DrawerIcon("md-cart"),
          }}
        />
        <Drawer.Screen
          name="Orders"
          component={OrderScreens}
          options={{
            drawerIcon: DrawerIcon("md-list"),
          }}
        />
        <Drawer.Screen
          name="Admin"
          component={UserProductScreens}
          options={{
            drawerIcon: DrawerIcon("md-create"),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
