import Product from "../../modal/product";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const FETCH_PRODUCT_START = "FETCH_PRODUCT_START";
export const SET_PRODUCT = "SET_PRODUCT";

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    await fetch(
      `https://rn-shop-app-f0c9c.firebaseio.com/products/${productId}.json`,
      {
        method: "DELETE",
      }
    );
    dispatch({
      type: DELETE_PRODUCT,
      PId: productId,
    });
  };
};
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const responce = await fetch(
        "https://shop-react-native-7b7f8-default-rtdb.firebaseio.com/products.json"
      );
      if (!responce.ok) {
        throw new Error("Something went wrong");
      }
      const resData = await responce.json();
      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            "u1",

            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            +resData[key].price
          )
        );
      }

      dispatch({ type: "SET_PRODUCT", products: loadedProducts });
    } catch (error) {
      //send to custom analytics server
      throw error;
    }
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    const responce = await fetch(
      "https://shop-react-native-7b7f8-default-rtdb.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );
    const responseData = await responce.json();
    console.log(responseData);
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        title,
        description,
        imageUrl,
        price,
      },
    });
  };

  // return {
  //   type: CREATE_PRODUCT,
  //   productData: {
  //     title,
  //     description,
  //     imageUrl,
  //     price,
  //   },
  // };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch) => {
    const responce = await fetch(
      `https://shop-react-native-7b7f8-default-rtdb.firebaseio.com/products/${id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );

    dispatch({
      type: UPDATE_PRODUCT,
      productData: {
        PId: id,
        title: title,
        description: description,
        imageUrl: imageUrl,
        // price: price,
      },
    });
  };
};
