import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import React, { useState, useEffect, useCallback, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomHeaderButton from "../../UI/CustomHeaderButton";
import * as productAction from "../../Store/action/Product";
import Input from "../../component/shop/Input";

const REDUCER_UPDATE = "update";
const FormReducer = (state, action) => {
  if (action.type === REDUCER_UPDATE) {
    const updateValues = {
      ...state.inputValues,
      [action.inputField]: action.value,
    };
    const updateValidities = {
      ...state.inputValidities,
      [action.inputField]: action.isValid,
    };
    // console.log(updateValidities);
    let updateFormIsValid = true;
    for (const key in updateValidities) {
      updateFormIsValid = updateFormIsValid && updateValidities[key];
    }

    return {
      inputValues: updateValues,
      inputValidities: updateValidities,
      formIsValid: updateFormIsValid,
    };
  }
  return state;
};

const EditProductScreen = ({ navigation, route }) => {
  const editProducts = useSelector((state) =>
    state.products.userProducts.find(
      (prod) => prod.id === route.params.productId
    )
  );

  const [formState, dispatchFromState] = useReducer(FormReducer, {
    inputValues: {
      title: editProducts ? editProducts.title : "",
      imageUrl: editProducts ? editProducts.imagUrl : "",
      description: editProducts ? editProducts.description : "",
      price: "",
    },
    inputValidities: {
      title: editProducts ? true : false,
      imageUrl: editProducts ? true : false,
      description: editProducts ? true : false,
      price: editProducts ? true : false,
    },
    formIsValid: editProducts ? true : false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: editProducts ? "Edit Product" : "Add Product",
      headerRight: () => (
        <>
          <CustomHeaderButton
            onPress={() => {
              if (formState.formIsValid) {
                navigation.goBack();
                if (editProducts) {
                  dispatch(
                    productAction.updateProduct(
                      editProducts.id,
                      formState.inputValues.title,
                      formState.inputValues.description,
                      formState.inputValues.imageUrl
                    )
                  );
                } else {
                  dispatch(
                    productAction.createProduct(
                      formState.inputValues.title,
                      formState.inputValues.description,
                      formState.inputValues.imageUrl,
                      formState.inputValues.price
                    )
                  );
                }
              } else {
                Alert.alert("wrong", "please enter a valid title", [
                  { text: "ok" },
                ]);
              }
            }}
            name="checkmark"
          />
        </>
      ),
    });
  }, [navigation, dispatch, editProducts, formState, productAction]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      console.log(inputValue);
      dispatchFromState({
        type: REDUCER_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        inputField: inputIdentifier,
      });
      // console.log(inputValue, inputValidity);
    },
    [dispatchFromState, REDUCER_UPDATE]
  );

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id="title"
          label="Title"
          errorText="Please Enter a valid title"
          autoCapitalize="sentences"
          autoCorrect
          keyboardType="default"
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editProducts ? editProducts.title : ""}
          initiallyValid={!!editProducts}
          required
        />
        <Input
          id="imageUrl"
          label="Image URL"
          errorText="Please Enter a valid Image URL"
          autoCorrect
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editProducts ? editProducts.imagUrl : ""}
          initiallyValid={!!editProducts}
          required
        />

        {editProducts ? null : (
          <Input
            id="price"
            label="Price"
            errorText="Please Enter a valid Price"
            keyboardType="decimal-pad"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editProducts ? editProducts.price : ""}
            required
            min={0.1}
          />
        )}
        <Input
          id="description"
          label="Description"
          errorText="Please Enter a valid Description"
          autoCorrect
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editProducts ? editProducts.description : ""}
          initiallyValid={!!editProducts}
          required
          numberOfLines={3}
          // minLength={5}
          multiline
        />
      </View>
    </ScrollView>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    // fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});
