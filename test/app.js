const main = require('../lib/main');
const fs = require('fs');
const data = require("./data");

const seasons  = main.start(data);
fs.writeFile ("output.json", JSON.stringify(seasons), function(err) {
  if (err) throw err;
  console.log('complete');
  }
);
