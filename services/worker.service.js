const mongoService = require("./mongo.service");
const ObjectId = require("mongodb").ObjectId;

function query(filter) {
  return mongoService.connectToDb().then(dbConn => {
    const workerCollection = dbConn.collection('workers');
    return workerCollection.find().sort({ 'name': 1 }).toArray();
  })
    .catch(err => console.error(err))
}
function getById(workerId) {
  workerId = new ObjectId(workerId);
  return mongoService.connectToDb().then(dbConn => {
    const workerCollection = dbConn.collection("workers");
    return workerCollection.findOne({ _id: workerId });
  })
    .catch(err => console.error(err))
}
function remove(id) {
  workerId = new ObjectId(id);
  return mongoService.connectToDb().then(dbConn => {
    const workerCollection = dbConn.collection("workers");
    return workerCollection.deleteOne({ _id: workerId });
  })
    .catch(err => console.error(err))
}

function add(worker) {
  return mongoService.connectToDb().then(db => {
    const collection = db.collection("workers");
    return collection.insertOne(worker).then(result => {
      console.log("Worker inserted successfully")
      worker._id = result.insertedId;
      return worker;
    })
      .catch(err => console.error(err))
  });
}

function update(worker) {
  workerId = new ObjectId(worker._id);
  delete worker._id;
  return mongoService.connectToDb().then(db => {
    const collection = db.collection("workers");
    return collection
      .updateOne({ _id: workerId }, { $set: worker })
      .then(result => {
        return worker;
      })
      .catch(err => console.error(err))
  });
}

module.exports = {
  query,
  getById,
  remove,
  add,
  update
};
