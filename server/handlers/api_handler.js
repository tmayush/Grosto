const path = require("path");
const { URL } = require("url");

const { GLOBALS } = require("../namespaces.js");
const { sendResponse, sendFile } = require("./response_handler.js");
const { getContentTypeByExtension } = require("../utils/files.js");
const {
  findProductByID,
  findProductsByCategory,
} = require("../models/products_model.js");

/**
 *
 * @param {String} reqURL
 * @param {Object} res
 * @returns
 */
async function resolveAPIRequest(reqURL, res) {
  let reqWebURLObj;
  try {
    // If it asks for an api request then try to convert it into a URL
    reqWebURLObj = new URL(reqURL, GLOBALS.INDEX.webAddress);
  } catch (error) {
    console.log("error");
    return sendResponse(res, 400, "Invaid Request, Check URL");
  }
  const searchParams = reqWebURLObj.searchParams;
  const reqType = path.basename(reqWebURLObj.pathname);

  // Single Product
  if (reqType === "products") {
    const products = [];
    for (let product_id of searchParams.get("ids").split(",")) {
      products.push(await findProductByID(parseInt(product_id)));
    }
    const responseText = JSON.stringify(products);
    await sendResponse(
      res,
      200,
      responseText,
      getContentTypeByExtension("json")
    );
    return true;
  }

  // Products based on a category
  else if (reqType === "categories") {
    let products = [];
    for (let category_name of searchParams.get("names").split(",")) {
      products = [
        ...products,
        ...(await findProductsByCategory(category_name)),
      ];
    }
    const responseText = JSON.stringify(products);
    await sendResponse(
      res,
      200,
      responseText,
      getContentTypeByExtension("json")
    );
    return true;
  }

  // common components
  else if (reqType == "common_components") {
    await sendFile(
      res,
      path.join(
        GLOBALS.PATHVARS.PUBLICDIR,
        "page components",
        `${searchParams.get("ids")}.html`
      )
    );
  }

  // API request type doesn't match with any, so send a 400
  else {
    const err_msg = {
      msg: "Request type does not exist",
      your_request_type: reqType,
    };
    const content = JSON.stringify(err_msg);
    await sendResponse(res, 400, content, getContentTypeByExtension("json"));
    return true;
  }
}

/**
 * Detects if a request is a valid API request
 * @param {String} reqURL path of the folder that the client is requesting from. [SHOULD NOT BE AN ADDRESS!]
 * @returns {Boolean}
 */
function detectAPIRequest(reqURL) {
  return /^\/api\//.test(reqURL);
}

module.exports = {
  detectAPIRequest,
  resolveAPIRequest,
};
