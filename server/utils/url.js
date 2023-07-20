const path = require("path");

/**
 * converts a filepath that may or may not have .html extension and return one which does
 * @param {String} url
 * @returns {String} Structured URL with the proper filename extension
 */
function sanitizeURL(url) {
  // Correct the file path so it can handle encoded characters like spaces and other encoded characters
  // Ex: %20 will be converted to ' '
  let cleaned_URL = decodeURIComponent(url);
  if (/\..+/.test(url)) return cleaned_URL;
  const cleaned_URL_length = cleaned_URL.length;
  // const slice_length = cleaned_URL_length;
  cleaned_URL = cleaned_URL === "/" ? "index" : cleaned_URL;
  if (cleaned_URL[cleaned_URL_length - 1] == "/")
    cleaned_URL = cleaned_URL.slice(0, cleaned_URL_length - 1);
  if (path.extname(cleaned_URL) !== ".html") {
    cleaned_URL += ".html";
  }
  // console.log(cleaned_URL);
  return cleaned_URL;
}

module.exports = {
  sanitizeURL,
};
