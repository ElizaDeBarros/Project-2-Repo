// Create a map object
var myMap = L.map("map", {
  center: [0, 0],
  zoom: 2
});

// Add a tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


// Grab the data with d3
d3.csv("data/Resources/CleanedData.csv").then(function(data) {

  var countryArray = [];
    // Iterate through the data
    for (var i = 0; i < data.length; i++) {
        countryArray.push(
                data[i].Country,
        );
      };

      // var countAttacks = {};
  
      // for (var i = 0; i < data.length; i++) {
      //   var thisCountry = data[i].Country
      //     if(thisCountry in countAttacks) {
      //       countAttacks[i] +=1;
      //     }
      //     else {
      //       countAttacks[i] =1;
      //     }
      // };
      console.log(countAttacks);

  var countries = countryArray.filter((item, i, ar) => ar.indexOf(item) === i);
  var access_token = API_KEY;
  
     countries.forEach(country => {
      var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + country +".json?access_token=" + access_token;
      console.log(url);
 
      // Grab the data with d3
      d3.json(url).then(function(response) {

        // Create a new marker cluster group
        
          // Loop through data
            for (var i = 0; i < response.length; i++) {

              // Set the data location property to a variable
              var location = response.center;

                // Check for location property
                L.marker([location[1], location[0]])
                .bindPopup("<h1>" + country + "</h1> <hr> <h3>Total shark attacks</h3>")
                .addTo(myMap);
                // Add a new marker  bind a pop-up
                marker.addLayer(L.marker()
                .bindPopup(query));    
           }
      });
    });
});