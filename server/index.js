const http = require("http");
const path = require("path");

const { GLOBALS } = require("./namespaces.js");
const { sendFile } = require("./handlers/response_handler.js");
const {
  detectAPIRequest,
  resolveAPIRequest,
} = require("./handlers/api_handler.js");
const {
  checkProductPage,
  checkCategoryPage,
} = require("./handlers/request_type_handler.js");
const { getFilePath } = require("./utils/files.js");
const { sanitizeURL } = require("./utils/url.js");

const server = http.createServer((client_req, res) => {
  const reqURL = client_req.url;
  const middleware = {
    isApiRequest: async () => {
      if (detectAPIRequest(reqURL)) {
        return resolveAPIRequest(reqURL, res);
      } else return false;
    },
    templatePageRequest: async () => {
      const reqURLS = sanitizeURL(reqURL);
      // URL requesting a product page template
      if (checkProductPage(reqURLS)) {
        await sendFile(
          res,
          path.join(
            GLOBALS.PATHVARS.PUBLICDIR,
            "templates",
            "cus_product_page.html"
          )
        );
        return true;
      }
      // URL requesting a category page template
      else if (checkCategoryPage(reqURLS)) {
        await sendFile(
          res,
          path.join(
            GLOBALS.PATHVARS.PUBLICDIR,
            "templates",
            "cus_category_page.html"
          )
        );
        return true;
      }
      // URL not requesting a page template
      else return false;
    },
    fileRequest: async () => {
      // Sanitize file name
      const sanitized_url = sanitizeURL(reqURL);
      const filePath = getFilePath(sanitized_url);
      await sendFile(res, filePath);
      return true;
    },
  };

  (async () => {
    for (const value of Object.values(middleware)) {
      const matchFound = await value();
      if (matchFound === true) {
        break;
      }
    }
  })();
});

const app = server.listen(GLOBALS.INDEX.PORT, () => {
  console.log(`Server running on ${GLOBALS.INDEX.webAddress}`);
});
