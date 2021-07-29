// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
    center: [0, 0],
    zoom: 2
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

// Define a markerSize function that will give each city a different radius based on its population
//function markerSize() {
//return Math.sqrt() / 40;
//}



// Country data
var countries = [
    {
        name: "Brazil",
        location: [-14.2350, -51.9253],



    },
    {
        name: "Germany",
        location: [51.1657, 10.4515],

    },
    {
        name: "Italy",
        location: [41.8719, 12.5675],

    },
    {
        name: "Argentina",
        location: [-38.4161, -63.6167],

    },
    {
        name: "France",
        location: [46.2276, 2.2137],

    },
    {
        name: "England",
        location: [52.355, 1.1743],

    },
    {
        name: "Spain",
        location: [40.4637, -3.7492],
    },
    {
        name: "Netherlands",
        location: [52.1326, 5.2913]
    },
    {
        name: "Uruguay",
        location: [-32.4228, -55.7658],
    },
    {
        name: "Sweden",
        location: [60.1282, 18.6435],

    },
    {
        name: "USA",
        location: [37.09024, -95.7128],

    },
    {
        name: "Australia",
        location: [-25.2743, 133.7751],

    },
    {
        name: "South Africa",
        location: [-30.5594, 22.9375],

    },
    {
        name: "Reunion",
        location: [-21.1151, 55.5363],
        points: 144
    },
    {
        name: "Costa Rica",
        location: [9.7489, -83.7534],

    },
    {
        name: "Maldives",
        location: [3.2027, 73.2206],

    },
    {
        name: "Bahamas",
        location: [25.0342, -77.3962],

    },
    {
        name: "New Caledonia",
        location: [-20.9043, 165.6180],

    },
    {
        name: "Cuba",
        location: [21.5217, -77.7811],

    },
    {
        name: "Mauritius",
        location: [-20.3484, 57.5521],

    },
    {
        name: "New Zealand",
        location: [-40.9005, 174.8859],

    },
    {
        name: "Samoa",
        location: [-13.7590, -172.104],

    },
    {
        name: "Japan",
        location: [36.2048, 138.2529],

    },
    {
        name: "St Helena",
        location: [-24.1434, -10.0306],

    },
    {
        name: "United Arab Emirates",
        location: [23.4240, 53.8478],

    },
    {
        name: "Mexico",
        location: [23.6345, -102.5527],

    },
    {
        name: "Indonesia",
        location: [-0.7892, 113.9213],

    },
    {
        name: "Columbia",
        location: [4.5708, -74.2973],

    },
    {
        name: "Egypt",
        location: [26.8205, 30.8024],
    },
    {
        name: "French Polynesia",
        location: [-17.6797, -149.4068],

    },
    {
        name: "Fiji",
        location: [-16.5781, 179.4144],

    },
    {
        name: "Dominican Republic",
        location: [18.7356, -70.1626],

    },
    {
        name: "Ecuador",
        location: [-1.8312, -78.1834],

    },
    {
        name: "Mozambique",
        location: [-18.6656, 35.5295],

    },
    {
        name: "Thailand",
        location: [15.8700, 100.9925],

    },
    {
        name: "Puerto Rico",
        location: [18.2208, -66.5901],

    },
    {
        name: "Papua New Guinea",
        location: [-6.3149, 143.9555],

    },
    {
        name: "Israel",
        location: [31.0460, 34.8516],
    },
    {
        name: "Palestinian Territories",
        location: [31.9521, 35.2331],

    },
    {
        name: "Jamaica",
        location: [18.1095, -77.2975],

    },
    {
        name: "Russia",
        location: [61.5240, 105.3187],

    },
    {
        name: "Seychelles",
        location: [-4.6795, 55.4919],

    },
    {
        name: "Turks and Caicos Islands",
        location: [21.6940, -71.7979],

    },
    {
        name: "Tonga",
        location: [-21.1789, -175.1982],

    },
    {
        name: "South Korea",
        location: [35.9077, 127.7669],

    },
    {
        name: "Vietnam",
        location: [14.0583, 108.2771],

    },
    {
        name: "Madagascar",
        location: [-18.7669, 46.8691],
    },
    {
        name: "Panama",
        location: [8.5379, -80.7821],

    },
    {
        name: "Scotland",
        location: [56.4907, -4.2026],

    },
    {
        name: "Taiwan",
        location: [23.6978, 120.9605],

    },
    {
        name: "Guam",
        location: [13.4443, 144.7937],
    },
    {
        name: "Philippines",
        location: [12.8797, 121.7740],

    },
    {
        name: "Croatia",
        location: [45.1, 15.2],

    },
    {
        name: "Solomon Islands",
        location: [-9.6457, 160.1561],

    },
    {
        name: "Yemen",
        location: [15.5527, 48.5163],

    },
    {
        name: "St Maarten",
        location: [18.0425, -63.0548],

    },
    {
        name: "Grand Cayman",
        location: [19.3222, -81.2409],

    },
    {
        name: "Vanuatu",
        location: [-15.3767, 166.9591],

    },
    {
        name: "Venezuela",
        location: [6.4237, -66.5897],

    },
    {
        name: "Micronesia",
        location: [7.4256, 150.5508],
    },
    {
        name: "Marshall Islands",
        location: [7.1314, 171.1844],

    },
    {
        name: "Hong Kong",
        location: [22.3964, 114.1094],

    },
    {
        name: "Chile",
        location: [-35.6751, -71.5429],


    },
];
var url = ("csvjson.json");


// Grab the data with d3
d3.json(url).then(function (response) {

    // Create a new marker cluster group
    var markers = L.markerClusterGroup();

    // Loop through data
    for (var i = 0; i < response.length; i++) {

        // Set the data location property to a variable
        var countires = response[i].location;

        // Check for location property
        if (countries) {

            // Add a new marker to the cluster group and bind a pop-up
            markers.addLayer(L.marker([countries.coordinates[1], countries.coordinates[0]])
                .bindPopup(response[i].descriptor));
        }

    }

    // Add our marker cluster layer to the map
    myMap.addLayer(markers);

});



  // Loop through the cities array and create one marker for each city object
  //for (var i = 0; i < cities.length; i++) {
   // L.circleMarker(cities[i].location, {
      //fillOpacity: 0.75,
      //color: "white",
      //fillColor: "purple",
      // Setting our circle's radius equal to the output of our markerSize function
      // This will make our marker's size proportionate to its population
      //radius: markerSize(cities[i].population)
   // }).bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>Population: " + cities[i].population + "</h3>").addTo(myMap);
  //}

