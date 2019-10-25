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
  const result = await scannedModel.find({baseURL: baseURL});
  return result;
}

export const getScansForDate = async (baseURL, date) => {
  const d = new Date(date);
  const result = await scannedModel.find({
    baseURL: baseURL,
    timeStamp: {
      $lte: new Date(d.getTime() + 1000*86400),
      $gte: d
    }
  });
  return result;
}

export const getDistinctDates = async (baseURL) => {
  const result = await scannedModel.aggregate(
    [
      {
        $match: {baseURL: baseURL}
      },{
        $project: {
          year: {"$year": "$timeStamp" },
          month: {"$month": "$timeStamp"},
          day: {"$dayOfMonth": "$timeStamp"}
        }
      },{
        $group: {
          _id: {
            year: '$year',
            month: '$month',
            dayOfMonth: '$day'
          },
          count: {
            $sum: 1
          }
        }
      }, {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.dayOfMonth": 1
        }
      }
    ]
  );
  console.log(result);
  return result;
}