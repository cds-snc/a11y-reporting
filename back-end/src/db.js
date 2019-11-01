const mongoose = require('mongoose');

let _db;

const initDB = async (callback) => {
  if (_db) {
    return callback(null, _db);
  } else {
    try {
      mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
      var db = mongoose.connection;
      db.on('error', err => {
        console.error(err);
      });
      await db.once('open', async function() {
        console.log("Database connection established.");
        _db = db;
        return callback(null, _db);
      });
    } catch(error) {
      console.log(error);
      return callback(error);
    }
  }
};

const getDB = () => {
  if (_db) {
    return _db;
  } else {
    // throw an error
    return false;
  }
};

module.exports = {
  initDB,
  getDB
}