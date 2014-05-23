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