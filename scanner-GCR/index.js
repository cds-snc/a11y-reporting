require = require("esm")(module); // eslint-disable-line no-global-assign
const express = require('express');
const app = express();
const handle = require("./src/payloadHandler").handle;
const path = require("path");

app.get('/', (req, res) => {
  (async() => {
    console.log("params: " + JSON.stringify(req.query));
    let baseURL = req.query.baseURL,
      slug = req.query.slug;
    let result = await handle(baseURL, slug);
    res.send(result);
  })();

});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Axe Scanner listening on port ', port);
});