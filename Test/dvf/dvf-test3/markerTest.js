$(document).ready(function() {
	var map;

	var resize = function () {
		var $map = $('#map');

		$map.height($(window).height() - $('div.navbar').outerHeight());

		if (map) {
			map.invalidateSize();
		}
	};

	$(window).on('resize', function () {
		resize();
	});

	resize();

	map = L.map('map').setView([-4.0, 13.0], 6);

	var baseLayer = new L.StamenTileLayer('toner');

	baseLayer.addTo(map);

	var layerControl = L.control.layers({
		'Stamen Toner': baseLayer
	}).addTo(map);

	var marker;
	var layer;

	var createLayerGroup = function (name) {
		var layerGroup = new L.LayerGroup();

		map.addLayer(layerGroup);
		layerControl.addOverlay(layerGroup, name);

		return layerGroup;
	};

	var addMarkers = function (layerGroupName, lat, lng, deltaLng, count, markerFunction, text) {

		var layerGroup = createLayerGroup(layerGroupName);

		var callout = new L.Callout(new L.LatLng(lat, lng), {
			direction: L.CalloutLine.DIRECTION.NW,
			lineStyle: L.CalloutLine.LINESTYLE.STRAIGHT,
			numberOfSides: 3,
			arrow: true,
			color: '#C0C0C0',
			fillColor: '#C0C0C0',
			position: new L.Point(-60, 0),
			size: new L.Point(40, 0),
			icon: new L.DivIcon({
				iconSize: new L.Point(80, 50),
				html: '<div>' + layerGroupName + '</div>',
				className: 'callout-text'
			})
		});

		layerGroup.addLayer(callout);

		for (var i = 0; i < count; ++i) {
			layerGroup.addLayer(markerFunction(new L.LatLng(lat, lng + i * deltaLng), i));
		}
	};

addMarkers('Radial Meter Markers', -8.0, 0.0, 2.0, 5, function (latlng, index) {
		var minHue = 120;
		var maxHue = 0;
		var meterMarkerOptions = {
			data: {
				'Speed': Math.random() * 200
			},
			chartOptions: {
				'Speed': {
					displayName: 'Speed',
					displayText: function (value) {
						return value.toFixed(1);
					},
					color: 'hsl(240,100%,55%)',
					fillColor: 'hsl(240,80%,55%)',
					maxValue: 200,
					minValue: 0
				}
			},
			displayOptions: {
				'Speed': {
					color: new L.HSLHueFunction(new L.Point(0,minHue), new L.Point(200,maxHue), {outputSaturation: '100%', outputLuminosity: '25%'}),
					fillColor: new L.HSLHueFunction(new L.Point(0,minHue), new L.Point(200,maxHue), {outputSaturation: '100%', outputLuminosity: '50%'})
				}
			},
			fillOpacity: 0.8,
			opacity: 1,
			weight: 0.5,
			radius: 30,
			barThickness: 15,
			maxDegrees: 360,
			rotation: 0,
			numSegments: 10
		};

		return new L.RadialMeterMarker(latlng, meterMarkerOptions);
	});
	
});