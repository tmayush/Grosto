const fs = require("fs");
const path = require("path");

const GLOBALS = {
  INDEX: {},
  PATHVARS: {
    CWD: __dirname,
    ROOT: path.dirname(__dirname),
  },
};

// Reading files/config
try {
  GLOBALS.FILELOCATIONS = JSON.parse(
    fs.readFileSync("./data_files/file_locations.json", "utf8")
  );
  GLOBALS.HOSTFILE = JSON.parse(
    fs.readFileSync(
      `${GLOBALS.PATHVARS.ROOT}/server/data_files/hostfile.json`,
      "utf8"
    )
  );
  GLOBALS.CONTENTTYPES = JSON.parse(
    fs.readFileSync(
      `${GLOBALS.PATHVARS.ROOT}/server/data_files/contentTypes.json`,
      "utf8"
    )
  );
} catch (err) {
  throw err;
}

GLOBALS.PATHVARS.PUBLICDIR = path.join(GLOBALS.PATHVARS.ROOT, "public");
GLOBALS.PATHVARS.LOGDIR = path.join(GLOBALS.PATHVARS.CWD, "logs");

GLOBALS.INDEX.PORT = process.env.PORT || GLOBALS.HOSTFILE.PORT;
GLOBALS.INDEX.HOST = GLOBALS.HOSTFILE.HOST;
GLOBALS.INDEX.webAddress = `http://${GLOBALS.INDEX.HOST}:${GLOBALS.INDEX.PORT}`;

// Loading products
const products_json_str = fs.readFileSync(
  path.join(GLOBALS.PATHVARS.ROOT, GLOBALS.FILELOCATIONS.products_list),
  "utf8"
);
GLOBALS.PRODUCTS = JSON.parse(products_json_str);

GLOBALS.PAGE_404 = path.join(
  GLOBALS.PATHVARS.PUBLICDIR,
  "templates",
  "not_found.html"
);

module.exports = { GLOBALS };
