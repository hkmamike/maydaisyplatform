
const algoliasearch = require('algoliasearch');
const dotenv = require('dotenv');
const firebase = require('firebase');

// load values from the .env file in this directory into process.env
dotenv.load();

// configure firebase
firebase.initializeApp({
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});
const database = firebase.database();

// configure algolia
const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);
const index = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME);


// Get all recordss from Firebase
database.ref('/arrangementsList').once('value', arrangements => {
    // Build an array of all records to push to Algolia
    const records = [];
    arrangements.forEach(arrangement => {
      // get the key and data from the snapshot
      const childKey = arrangement.key;
      const childData = arrangement.val();
      // We set the Algolia objectID as the Firebase .key
      childData.objectID = childKey;
      // Add object for indexing
      records.push(childData);
    });
  
    // Add or update new objects
    index
      .saveObjects(records)
      .then(() => {
        console.log('Records imported into Algolia');
      })
      .catch(error => {
        console.error('Error when importing record into Algolia', error);
        process.exit(1);
      });

});

index.setSettings({
  'attributesForFaceting': ['color', 'flower', 'price', 'deliveryAreas', 'category']
})