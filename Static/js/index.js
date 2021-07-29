mapboxgl.accessToken = 'pk.eyJ1IjoiZWxpemFkZWJhcnJvcyIsImEiOiJja3F5MGRyYjYxM2s4MndwbTZuMWFrZHJzIn0.LYL7TKSoowmlKI8ozNQq6Q';
var myMap = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [0, 0],
zoom: 2
});
 
// Add the control to the map.
myMap.addControl(
new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
mapboxgl: mapboxgl
})
);

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(':memory:');

db.serialize(function() {
  db.run("CREATE TABLE lorem (info TEXT)");

  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
});

db.close();