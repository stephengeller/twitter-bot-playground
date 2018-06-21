const MongoDB = require("mongodb");
const mongojs = require("mongojs");

class DatabaseManager {
  constructor(dbName = "testDB", url = "mongodb://localhost:27017/") {
    this.dbName = dbName;
    this.db = mongojs(this.dbName);
    this.url = url;
  }

  createCollection(collection) {
    this.db.createCollection(collection, err => {
      console.log(err);
      this.db.close();
    });
  }

  dropCollection(collection) {
    db[collection].drop(r => {
      console.log(`[${collection}] has been DELETED in [${this.dbName}]`);
      this.db.close();
    });
  }

  listCollections(callback) {
    return this.db.getCollectionNames((err, colNames) => {
      this.db.close();
      // if (err) return console.log(err);
      return callback(colNames);
    });
  }

  dropCollectionIfExists(collection) {
    console.log(collection);
    this.listCollections(collections => {
      console.log(collections);
      const collectionExists = collections.filter(c => c === collection);
      if (collectionExists.length > 0) {
        this.dropCollection(collection);
      } else {
        console.log(`[${collection}] not found in db [${this.dbName}]`);
      }
    });
  }

  createCollectionIfExists(collection) {
    this.listCollections(collections => {
      const collectionExists = collections.filter(c => c.name === collection);
      if (collectionExists.length > 0) {
        console.log(collections);
        // console.log(`[${collection}] already exists in db [${this.dbName}]`);
        console.log(`[${collection}] already exists in db [${this.dbName}]`);
      } else {
        this.createCollection(collection);
      }
    });
  }

  insert(object, collection) {
    if (!Object.keys(object).includes("tweet")) {
      throw new Error("Use 'tweet' as top-level key");
    }
    const db = mongojs(this.dbName, [collection]);

    return db[collection].insert(object, () => {
      db.close();
    });
  }

  async findOne(search, collection, cb) {
    const db = mongojs(this.dbName, [collection]);

    await db[collection].findOne(search, (object, result) => {
      db.close();
      if (cb) {
        cb(result);
      }
    });
  }
}

module.exports = DatabaseManager;
