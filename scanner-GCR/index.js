require = require("esm")(module); // eslint-disable-line no-global-assign
const express = require('express');
const app = express();
const handle = require("./src/payloadHandler").handle;
const {getBaseURLs, getScansForURL} = require("./src/getData");
const {getDB, initDB} = require("./src/db");
const path = require("path");

// submit scans endpoint
app.get('/submit', (req, res) => {
  (async () => {
    console.log("params: " + JSON.stringify(req.query));
    const baseURL = req.query.baseURL,
      slug = req.query.slug;
    const result = await handle(baseURL, slug);
    res.set('Access-Control-Allow-Origin', '*');
    if (result)
      res.status(200).send("success");
    else
      res.status(400).send("bad request");
  })();

});

// get data endpoint(s)
app.get('/getbaseURLs', (req, res) => {
  (async () => {
    const baseURLs = await getBaseURLs();
    res.set('Access-Control-Allow-Origin', '*');
    if (baseURLs) {
      res.status(200).send(baseURLs);
    } else {
      res.status(400).send("error fetching data");
    }
  })();
});

app.get('/getScansForURL', (req, res) => {
  (async () => {
    console.log("params: " + JSON.stringify(req.query));
    const baseURL = req.query.baseURL;
    const scans = await getScansForURL(baseURL);

    res.set('Access-Control-Allow-Origin', '*');
    if (scans)
      res.status(200).send(scans);
    else
      res.status(400).send("bad request");
  })();
});

const port = process.env.PORT || 8080;

initDB(function(err) {
  app.listen(port, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Axe Scanner listening on port ', port);
    }
  });
});