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