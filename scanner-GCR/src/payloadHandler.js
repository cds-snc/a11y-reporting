"use strict";
import { requestScan } from "./lib";
const mongoose = require('mongoose');
const { scannedModel } = require("./lib/model");

export const handle = async (baseURL, slug) => {
  const result = await requestScan(baseURL + slug);
  // if result, else return error
  if (result) {
    // write to DB
    const timestamp = new Date();
    let scannedPage = new scannedModel({baseURL: baseURL, slug: slug, violations: result.violations, timeStamp: timestamp})
    scannedPage = await scannedPage.save();
    return true;
  } else{
    console.log("Shouldn't see this..");
    return false;
  }
};
