
require('babel-register') ({
	// ignore: false,
	presets: [ 'es2015', "react" ],
});

const router = require('./router').default;
const Sitemap = require('../../node_modules/react-router-sitemap/index.es5.js').default;
const firebase = require('firebase');


firebase.initializeApp({databaseURL: 'https://maydaisy-platform.firebaseio.com',});
const database = firebase.database();

var floristsList = [];
var floristsDetails = {};
var floristsCount;

var paramsConfig = {};

database.ref('/florists').once('value', florists => {
	// Build an array of all records
	
    florists.forEach(florist => {

		var floristArrangements = [];

		var arrangementsVal;
		
		if (florist.hasChild('arrangements')) {
			arrangementsVal = florist.child('arrangements').val();
		}

		// get the key and data from the snapshot
		const floristKey = florist.key;
		
		// Add florist to florist list
		floristsList.push(floristKey);

		if (arrangementsVal) {

			Object.keys(arrangementsVal).forEach(key => {
				
				// get the key and data from the snapshot
				const arrangementKey = key;
	
				floristArrangements.push(arrangementKey);
			});
	
			floristsDetails[floristKey] = floristArrangements;

		}
	});
	
}).then(() => {

	floristsCount = floristsList.length;
	
	const filterConfig = {
		isValid: false,
		rules: [
			/\/auth/,
			/\*/,
		],
	};
	
	paramsConfig['/florist/:floristCode'] = [];
	paramsConfig['/florist/:floristCode'].push({});
	paramsConfig['/florist/:floristCode'][0]['floristCode'] = floristsList;

	paramsConfig['/florist/:floristCode/:arrangementCode'] = [];

	for (i = 0; i < floristsCount; i++) {
		paramsConfig['/florist/:floristCode/:arrangementCode'].push({});
		paramsConfig['/florist/:floristCode/:arrangementCode'][i]['floristCode'] = floristsList[i];

		// console.log('florist code is ', floristsList[i]);
		var florist = floristsList[i];
		// console.log('florist is ', florist, ', and arrangements are: ', floristsDetails[florist]);
		if (floristsDetails[florist]) {
			paramsConfig['/florist/:floristCode/:arrangementCode'][i]['arrangementCode'] = floristsDetails[florist];
		}
	}
	
	(
		new Sitemap(router)
			.filterPaths(filterConfig)
			.applyParams(paramsConfig)
			.build('https://maydaisy.com', { limitCountPaths: 5000 })
			// .save('./sitemap.xml', '/static/')
			.save('./sitemap.xml')
	);	

});