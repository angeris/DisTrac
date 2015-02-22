// Seed the Cities collection with parsed data.
if (Meteor.isServer) {

  // Only seed the collection if it hasn't been already.
  if (Cities.find().count() === 0) {
    var PARSE_URL = 'http://107.170.223.136:8000/cities';

    // HTTP GET Request to return cities data.
    HTTP.call('GET', PARSE_URL, function (error, result) {
      if (error) {
        console.log("some error" + error);
      }

      // Iterate over all the cities and store them into Cities collection.
      var cities = EJSON.parse(result['content']).items;
      for (var i = 0; i < cities.length; i++) {
        // Store the report in the mongodb database.
        Cities.insert({
          geonameid: cities[i].geonameid,
          name: cities[i].name,
          asciiname: cities[i].asciiname,
          alternatenames: cities[i].alternatenames,
          location: cities[i].location,
          featureclass: cities[i].featureclass,
          featurecode: cities[i].featurecode,
          countrycode: cities[i].countrycode,
          cc2: cities[i].cc2,
          population: cities[i].population,
          elevation: cities[i].elevation,
          dem: cities[i].dem,
          timezone: cities[i].timezone,
          modificationdate: cities[i].modificationdate
        });
      }
    });
  }
}
