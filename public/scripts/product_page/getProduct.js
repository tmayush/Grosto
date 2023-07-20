import { PRODUCTPAGE } from "/scripts/product_page/productPage.js";
import { calcProductDetails } from "/scripts/product_page/calcProductPage.js";

((PRODUCTPAGE, calcProductDetails) => {
  const URLPATHNAME = window.location.pathname;
  // const apiParams = {
  //   type: "single_product",
  //   product_id: getPIDFromPath(URLPATHNAME),
  // };
  const apiParams = {
    ids: getPIDFromPath(URLPATHNAME),
  };
  const xhr = new XMLHttpRequest();
  const result = _constructAPIURL("/api/products", apiParams);
  // const result = "/api/product?ids=123";
  xhr.onload = function () {
    let resText;
    if (this.status === 200) {
      resText = this.responseText;
    }
    // console.log(resText);
    const response = JSON.parse(resText);
    console.log(response);

    // Selecting first object because we are only requesting one product,
    // so the response will only contain one object
    PRODUCTPAGE.productDetails = response[0];
    calcProductDetails(PRODUCTPAGE);
  };

  function _constructAPIURL(baseURL, apiParams) {
    let apiURL = baseURL + "?";
    for (const [key, value] of Object.entries(apiParams)) {
      apiURL += `${key}=${value}&`;
    }
    apiURL = apiURL.slice(0, -1);
    return apiURL;
  }

  function getPIDFromPath(path) {
    const PIDStartIndex = path.lastIndexOf("/") + 1;
    // console.log(catStartIndex);
    return path.slice(PIDStartIndex);
  }

  function constructAPIURL(apiParams) {
    let apiURL = `/api?`;
    for (const [key, value] of Object.entries(apiParams)) {
      apiURL += `${key}=${value}&`;
    }
    apiURL = apiURL.slice(0, -1);
    return apiURL;
  }
  // console.log(URLPATHNAME);
  // console.log(result);
  xhr.open("GET", result, true);
  xhr.send();
})(PRODUCTPAGE, calcProductDetails);
