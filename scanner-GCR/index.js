require = require("esm")(module); // eslint-disable-line no-global-assign
const express = require('express');
const app = express();
const handle = require("./src/payloadHandler").handle;
const {
  getBaseURLs,
  getScans,
  getDistinctDates,
  getDistinctSlugs,
} = require("./src/getData");
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

app.get('/getScans', (req, res) => {
  (async () => {
    console.log("params: " + JSON.stringify(req.query));
    const baseURL = req.query.baseURL,
      slug = req.query.slug,
      date = req.query.date;
    const scans = await getScans(baseURL, slug, date);

    res.set('Access-Control-Allow-Origin', '*');
    if (scans)
      res.status(200).send(scans);
    else
      res.status(400).send("bad request");
  })();
});

app.get('/getDistinctDates', (req, res) => {
  (async () => {
    console.log("params: " + JSON.stringify(req.query));
    const baseURL = req.query.baseURL;
    const dates = await getDistinctDates(baseURL);

    res.set('Access-Control-Allow-Origin', '*');
    if (dates)
      res.status(200).send(dates);
    else
      res.status(400).send("bad request");
  })();
});

app.get('/getDistinctSlugs', (req, res) => {
  (async () => {
    console.log("params: " + JSON.stringify(req.query));
    const baseURL = req.query.baseURL;
    const slugs = await getDistinctSlugs(baseURL);

    res.set('Access-Control-Allow-Origin', '*');
    if (slugs)
      res.status(200).send(slugs);
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