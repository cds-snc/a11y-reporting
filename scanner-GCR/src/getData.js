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

export const getScans = async (baseURL, slug, date) => {
  let query = {baseURL: baseURL};
  if (slug)
    query.slug = slug;
  if (date) {
    let d = new Date(date);
    query.timeStamp = {
      $lte: new Date(d.getTime() + 1000*86400),
      $gte: d
    }
  }
  const result = await scannedModel.find(query);
  return result;
}

export const getDistinctSlugs = async(baseURL) => {
  const result = await scannedModel.find({baseURL: baseURL}).distinct("slug", function(err, slugs) {
    if (err) {
      console.error(err);
      return [];
    }
    return slugs;
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