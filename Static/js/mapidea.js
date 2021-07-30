var myMap = L.map("map", {
    center: [0, 0],
    zoom: 2
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

// Define a markerSize function that will give each city a different radius based on its population
function markerSize(population) {
    return Math.sqrt(population) / 40;
}


var csvjson = ("data/Resources/csvjson.json")
d3.json(csvjson).then(function (response) {
    console.log(response);

    // Loop through the cities array and create one marker for each city object
    for (var i = 0; i < Country.length; i++) {
        L.circleMarker(cities[i].location, {
            fillOpacity: 0.75,
            color: "white",
            fillColor: "purple",
            // Setting our circle's radius equal to the output of our markerSize function
            // This will make our marker's size proportionate to its population
            radius: markerSize(Country[i].Species)
        }).bindPopup("<h1>" + Country[i].name + "</h1> <hr> <h3>Population: " + Country[i].population + "</h3>").addTo(myMap);
    }
