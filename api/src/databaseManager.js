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
      this.db.close();
    });
  }

  dropCollection(collection) {
    db[collection].drop(r => {
      this.db.close();
    });
  }

  listCollections(callback) {
    return this.db.getCollectionNames((err, colNames) => {
      this.db.close();
      return callback(colNames);
    });
  }

  dropCollectionIfExists(collection) {
    this.listCollections(collections => {
      const collectionExists = collections.filter(c => c === collection);
      if (collectionExists.length > 0) {
        this.dropCollection(collection);
      } else {
      }
    });
  }

  createCollectionIfExists(collection) {
    this.listCollections(collections => {
      const collectionExists = collections.filter(c => c.name === collection);
      if (collectionExists.length > 0) {
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
