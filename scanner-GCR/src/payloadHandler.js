"use strict";
import { requestScan } from "./lib";
const mongoose = require('mongoose');
const { scannedModel } = require("./lib/model");

export const handle = async (baseURL, slug) => {
  const result = await requestScan(baseURL + slug);

  // if result, else return error
  if (result) {
    try {
      mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
      console.log(process.env.DB_URL);
      var db = mongoose.connection;
      db.on('error', err => {
        console.error(err);
      });
      db.once('open', async function() {
        try {
          // write to DB
          const timestamp = new Date();
          let scannedPage = new scannedModel({baseURL: baseURL, slug: slug, violations: result.violations, timeStamp: timestamp})
          scannedPage = await scannedPage.save();
          return scannedPage;
        } catch (e) {
          console.log(e.message);
          return false;
        }
      });
    } catch(error) {
      console.log(error);
    }
  }
  return "No scan";
};
