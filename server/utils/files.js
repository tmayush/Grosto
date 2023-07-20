const path = require("path");

const { GLOBALS } = require("../namespaces.js");

function getContentTypeByExtension(ext) {
  // Checking if the file extension is present in one of the keys
  if (Object.keys(GLOBALS.CONTENTTYPES).indexOf(ext) !== -1)
    return GLOBALS.CONTENTTYPES[ext];
  return false;
}

function getContentType(fp) {
  const fileNameExt = path.extname(fp).slice(1);
  return getContentTypeByExtension(fileNameExt);
}

/**
 * get full system path to the file from the URL
 * @param {String} url_sanitized properly structred url path
 * @returns {String} full system path to the file
 */
function getFilePath(url_sanitized) {
  if (path.extname(url_sanitized) === ".html") {
    const fileName = path.basename(url_sanitized);
    // html files are located in "pages" folder within "public" as long as it is not index.html
    if (fileName !== "index.html")
      return path.join(GLOBALS.PATHVARS.PUBLICDIR, "pages", fileName);
  }
  // all every other files except HTML files (EXCEPTION:index.html)
  return path.join(GLOBALS.PATHVARS.PUBLICDIR, url_sanitized);
}

module.exports = {
  getContentType,
  getContentTypeByExtension,
  getFilePath,
};
