function checkProductPage(filePath) {
  return /\/product_page\/[^\.]+(\.html)?$/.test(filePath);
}

function checkCategoryPage(filePath) {
  return /\/category_page\/[^\.]+(\.html)?$/.test(filePath);
}

// const list = [
//   "/product_page.html",
//   "/product_page/",
//   "/product_page/123.html",
//   "/product_page/123.css",
//   "/product_page/123",
//   "/product_page/abc",
//   "/product_pag",
//   "/",
//   "/pages/products.html",
// ];
// list.forEach((url_path) => {
//   const result = checkCategoryPage(url_path);
// });

// list.forEach((link) => {
//   console.log(checkProductPage(link));
// });

module.exports = {
  checkProductPage,
  checkCategoryPage,
};
