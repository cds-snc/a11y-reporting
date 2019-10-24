"use strict"
const mongoose = require('mongoose');
const { scannedModel } = require("./lib/model");

export const getBaseURLs = async () => {
  // query
  const result = await scannedModel.find().distinct("baseURL", function(err, urls) {
    if (err) {
      console.error(err);
      return [];
    }
    return urls;
  });
  return result;
};

export const getScansForURL = async (baseURL) => {
  console.log("starting query")
  const result = await scannedModel.find({baseURL: baseURL})
  console.log("Result: " + JSON.stringify(result));
  return result;
}