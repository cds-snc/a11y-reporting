const mongoose = require("mongoose");

const scannedSchema = new mongoose.Schema(
  {
    baseURL: String,
    slug: String,
    violations: Array,
    timeStamp: Date
  }
);

export const scannedModel = mongoose.model("scanned-page", scannedSchema);