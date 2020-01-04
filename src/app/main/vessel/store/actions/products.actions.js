import axios from "axios";

export const GET_PRODUCTS = "[VESSEL APP] GET PRODUCTS";
export const SET_PRODUCTS_SEARCH_TEXT = "[VESSEL APP] SET PRODUCTS SEARCH TEXT";

export function getProducts() {
  const request = axios.get("/api/e-commerce-app/products");

  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_PRODUCTS,
        payload: response.data
      })
    );
}

export function setProductsSearchText(event) {
  return {
    type: SET_PRODUCTS_SEARCH_TEXT,
    searchText: event.target.value
  };
}
