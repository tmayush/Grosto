const { GLOBALS } = require("../namespaces");

async function findProductByID(product_id) {
  for (let i = 0; i < GLOBALS.PRODUCTS.length; i++) {
    const product_item = GLOBALS.PRODUCTS[i];
    if (product_id === product_item.product_id) {
      return product_item;
    }
  }
  return false;
}

async function findProductsByCategory(category_name) {
  const product_collection = GLOBALS.PRODUCTS.filter((product_item) => {
    return category_name === product_item.product_aisle.toLowerCase();
  });
  return product_collection;
}

module.exports = {
  findProductByID,
  findProductsByCategory,
};
