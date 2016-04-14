require("babel-polyfill");
require("babel-core/register")({
  extensions: [".es6", ".es", ".jsx", ".js"],
  presets: ["es2015", "stage-0"]
});

console.log(process.argv);
const codePath  = process.argv[2] ? process.argv[2] : "source/app.js";

require(`./${codePath}`);
