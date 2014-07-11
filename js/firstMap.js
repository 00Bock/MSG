var map = L.mapbox.map('map')
	.setView([52.481707, 13.356576], 17);
	
/*### Hintergrundkarten definieren ###*/

var coolMap = L.mapbox.tileLayer('examples.map-51f69fea').addTo(map); //Hintergrundkarten in Variable schieben
var sImage = L.mapbox.tileLayer('examples.map-b70jh5xu');
var mapnik = L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {attribution: 'Mapnik'});

//Baselayer in eine Variable schieben
var baseLayers = {
"easy peasy map": coolMap,
"mapnik": mapnik,
"satellite image": sImage
};

//Baselayer-Auswahl hinzufügen ("Basemaps", "Overlays", "Properties")
new L.control.layers(baseLayers, null, {position: 'topleft'}).addTo(map); 
//Maßstab hinzufügen
new L.control.scale().addTo(map);

/* ### Ausprägung der Linien anhand eines Attributs ### */ //funktioniert noch nicht
var msgPoints_style = {
    style: function(FeatureCollection) {
        switch (feature.properties.Bezeichnun) {
				case 'Windkraftanlage': return {color: "#000000"}; break;
				case 'Windmessanlage': return {color: "#DF7401"}; break;
				default: return {color: "#00ff00"};
        }
    }
};

/*### Punkte und Linien einbinden ###*/
var msgPoints = msg_points_wgs84_markerTest; //schreibt js-Inhalt in Variable
// var tLines = travelLines; //Anpassen!

map.featureLayer.setGeoJSON(msgPoints); // add points with style

/* ### Info hinzufügen ### */
// Listen for individual marker clicks
map.markerLayer.on('click',function(e) {
    var feature = e.layer.feature;
    var info = '<h2>' + feature.properties.Bezeichnun + '</h2>' +
			   '<p>' + feature.properties.Beschreibu + '</p>';

    document.getElementById('info').innerHTML = info;
});

// Clear the tooltip when map is clicked
map.on('click',function(e){
    document.getElementById('info').innerHTML = '';
});