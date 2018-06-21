const MongoDB = require("mongodb");
const MongoClient = MongoDB.MongoClient;
const mongojs = require("mongojs");

class DatabaseManager {
  constructor(db = "test1", url = "mongodb://localhost:27017/") {
    this.db = db;
    this.url = url;
    this.MongoClient = MongoDB.MongoClient;
  }

  createCollection(collection) {
    this.MongoClient.connect(
      this.url,
      (err, db) => {
        if (err) throw err;
        const dbo = db.db(this.db);
        dbo.createCollection(collection, (err, res) => {
          db.close();
          if (err) throw err;
          // console.log(`[${collection}] has been CREATED in [${this.db}]`);
        });
      }
    );
  }

  dropCollection(collection) {
    this.MongoClient.connect(
      this.url,
      (err, db) => {
        if (err) throw err;
        const dbo = db.db(this.db);
        dbo.collection(collection).drop((err, delOK) => {
          db.close();
          if (err) throw err;
          if (delOK) {
            // console.log(`[${collection}] has been DELETED in [${this.db}]`);
          }
        });
      }
    );
  }

  async listCollections(callback) {
    let db = mongojs("testDB");
    return await db.getCollectionNames((err, colNames) => {
      db.close();
      // if (err) return console.log(err);
      return colNames;
      return callback(colNames);
    });
  }

  dropCollectionIfExists(collection) {
    this.listCollections(collections => {
      const collectionExists = collections.filter(c => c.name === collection);
      if (collectionExists.length > 0) {
        this.dropCollection(collection);
      } else {
        // console.log(`[${collection}] not found in db [${this.db}]`);
      }
    });
  }

  createCollectionIfExists(collection) {
    this.listCollections(collections => {
      const collectionExists = collections.filter(c => c.name === collection);
      if (collectionExists.length > 0) {
        // console.log(`[${collection}] already exists in db [${this.db}]`);
      } else {
        this.createCollection(collection);
      }
    });
  }

  insert(object, collection) {
    if (!Object.keys(object).includes("tweet")) {
      throw new Error("Use 'tweet' as top-level key");
    }

    let db = mongojs("testDB", [collection]);
    return db[collection].insert(object, () => {
      db.close();
    });
  }

  async findOne(search, collection, cb) {
    let db = mongojs("testDB", [collection]);
    await db[collection].findOne(search, function(object, result) {
      db.close();
      if (cb) {
        cb(result);
      }
    });
  }
}

module.exports = DatabaseManager;
