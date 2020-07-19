const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://BabysitterDB:Rr9791411@yaircluster.m92zs.azure.mongodb.net/Babysitter?retryWrites=true&w=majority';
const dbName = 'Babysitter';

var dbConnection = null;

function connectToDb() {
  if (dbConnection) return Promise.resolve(dbConnection);

  return new Promise((resolve, reject) => {
    MongoClient.connect(
      url,
      { 
        //useNewUrlParser: true,
        useUnifiedTopology: true
      },
      (err, client) => {
        if (err) return reject(err, 'Cannot connect to Mongo');
        console.log('Connected successfully to Mongo server');
        dbConnection = client.db(dbName);
        resolve(dbConnection);
      }
    );
  });
}

module.exports = {
    connectToDb
  };
