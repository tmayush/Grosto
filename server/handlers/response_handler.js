const fs = require("fs/promises");
const { getContentType } = require("../utils/files");
const { GLOBALS } = require("../namespaces.js");

/**
 * send response to client
 * @param {Object} res Response object
 * @param {Number} status status code to send in the response
 * @param {String} content content to send in the response
 * @param {String} [contentType="text/html"] content type to set in the header of the response
 * @param {String} [encoding="utf8"] encoding of data in the response
 */
async function sendResponse(
  res,
  status,
  content,
  contentType = "text/html",
  encoding = "utf8"
) {
  res.writeHead(status, { "Content-Type": contentType });
  res.end(content, encoding);
}

/**
 * Sends file content to the client
 * @param {Object} res
 * @param {String} fp filepath of the file
 */
async function sendFile(res, fp) {
  try {
    const content = await fs.readFile(fp);
    await sendResponse(res, 200, content, getContentType(fp));
  } catch (err) {
    if (err.code === "ENOENT") {
      try {
        const content_404 = await fs.readFile(GLOBALS.PAGE_404);
        await sendResponse(res, 200, content_404);
      } catch (err) {
        console.error(err.stack);
        await sendResponse(res, 500, `Server Error: ${500}`);
      }
    } else {
      console.error(err.stack);
      await sendResponse(res, 500, `Server Error: ${500}`);
    }
  }
}

module.exports = {
  sendResponse,
  sendFile,
};
