import { SET_ARTICLE_DETAILS, API, FETCH_ARTICLE_DETAILS } from "../constants/action-types";

export function fetchArticleDetails() {
  return {
    type: API,
    payload: {
      url: 'https://fakestoreapi.com/products',
      method: "GET",
      data: null,
      onSuccess: setArticleDetails,
      onFailure: () => {
        console.log("Error occured loading articles");
      },
      label: FETCH_ARTICLE_DETAILS
    }
  };
}

function setArticleDetails(data) {
  return {
    type: SET_ARTICLE_DETAILS,
    payload: data
  };
}
