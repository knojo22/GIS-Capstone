
var walkbufferStyle = {
	"fillColor": "#807dba",
	"weight": 0.5,
	"opacity": 1,
	"color": "#000000",
	"fillopacity": 10
};

var bikebufferStyle = {
	"fillColor": "#41b6c4",
	"weight": 0.5,
	"opacity": 1,
	"color": "#000000",
	"fillopacity": 10
};

var railbufferStyle = {
	"fillColor": "#41ab5d",
	"weight": 0.5,
	"opacity": 1,
	"color": "#000000",
	"fillopacity": 10
};

var busbufferStyle = {
	"fillColor": "#e7298a",
	"weight": 0.5,
	"opacity": 1,
	"color": "#000000",
	"fillopacity": 10
};

function initialize(){

	d3.queue()
		.defer(d3.json, "data/Seattle_WalkBuffer.geojson")
		.defer(d3.json, "data/Chicago_WalkBuffer.geojson")
		.defer(d3.json, "data/Boston_WalkBuffer.geojson")
		.defer(d3.json, "data/Seattle_BicycleBuffer.geojson")
		.defer(d3.json, "data/Chicago_BicycleBuffer.geojson")
		.defer(d3.json, "data/Boston_BicycleBuffer.geojson")
		.defer(d3.json, "data/Seattle_RailBuffer.geojson")
		.defer(d3.json, "data/Chicago_RailBuffer.geojson")
		.defer(d3.json, "data/Boston_RailBuffer.geojson")
		.defer(d3.json, "data/Seattle_BusBuffer.geojson")
		.defer(d3.json, "data/Chicago_BusBuffer.geojson")
		.defer(d3.json, "data/Boston_BusBuffer.geojson")
		.defer(d3.json, "data/Seattle_SNAPFoodRetail.geojson")
		.defer(d3.json, "data/Chicago_SNAPFoodRetail.geojson")
		.defer(d3.json, "data/Boston_SNAPFoodRetail.geojson")
		.defer(d3.json, "data/Seattle_CT.geojson")
		.defer(d3.json, "data/Chicago_CT.geojson")
		.defer(d3.json, "data/Boston_CT.geojson")
		.await(callback);

	function callback(error, walkseattle, walkchicago, walkboston, bikeseattle, bikechicago, bikeboston, railseattle,
		railchicago, railboston, busseattle, buschicago, busboston, seattlesnap, chicagosnap, bostonsnap, seattlect, chicagoct, bostonct, attribute){

		console.log(error);

		var Seattle_CT = L.geoJson(seattlect, {
			style: function(feature){
				var attribute = "PC1";
				var attValue = feature.properties[attribute];
					return {
					"color": "#999",
					"weight": 0.5,
					"fillColor": getCTColorSeattle(feature.properties[attribute]),
					"fillOpacity": 0.7
				};
			}
		}).addTo(map1);

		var Chicago_CT = L.geoJson(chicagoct, {
			style: function(feature){
				var attribute = "PC1";
				var attValue = feature.properties[attribute];
					return {
					"color": "#999",
					"weight": 0.5,
					"fillColor": getCTColorChicago(feature.properties[attribute]),
					"fillOpacity": 0.7
				};
			}
		}).addTo(map2);

		var Boston_CT = L.geoJson(bostonct, {
			style: function(feature){
				var attribute = "PC1";
				var attValue = feature.properties[attribute];
					return {
					"color": "#999",
					"weight": 0.5,
					"fillColor": getCTColorBoston(feature.properties[attribute]),
					"fillOpacity": 0.7
				};
			}
		}).addTo(map3);

		/* Loading geojsons into d3.queue to be loaded asynchronously in which the
		data will be used for other functions */
		setWalkBuffer(walkseattle, 1);
		setWalkBuffer(walkchicago, 2);
		setWalkBuffer(walkboston, 3);
		setBikeBuffer(bikeseattle, 1);
		setBikeBuffer(bikechicago, 2);
		setBikeBuffer(bikeboston, 3);
		setRailBuffer(railseattle, 1);
		setRailBuffer(railchicago, 2);
		setRailBuffer(railboston, 3);
		setBusBuffer(busseattle, 1);
		setBusBuffer(buschicago, 2);
		setBusBuffer(busboston, 3);
		getSNAP(seattlesnap, 1);
		getSNAP(chicagosnap, 2);
		getSNAP(bostonsnap, 3);
		updateLayers();
		createPanel();
		createLegend(map1, 1);
		createLegend(map2, 2);
		createLegend(map3, 3);

	};
		createMap();
};

function createMap(){
		map1= L.map('mapid', {
			center: [47.6232,-122.3321],
			zoom: 11,
			layers: baseSeattle
		});

		var baseSeattle = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
			          attribution: 'CARTO'
			        }).addTo(map1);

		map2= L.map('mapid2', {
			center: [41.8351,-87.6798],
			zoom: 10,
			layers: baseChicago
		});

		var baseChicago = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
			          attribution: 'CARTO'
			        }).addTo(map2);

		map3= L.map('mapid3', {
			center: [42.3301,-71.0589],
			zoom: 11,
			layers: baseBoston
		});

		var baseBoston = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
			          attribution: 'CARTO'
			        }).addTo(map3);
	};

function updateLayers(){
	changeTransportation();
	changeMarket();
};

function changeTransportation(){
	var e = document.getElementById("modechoice");
	var transportationmode = e.options[e.selectedIndex].value;

	if (transportationmode == "Walk"){

		map1.addLayer(WalkSeattle);
		map2.addLayer(WalkChicago);
		map3.addLayer(WalkBoston);

		map1.removeLayer(BikeSeattle);
		map1.removeLayer(RailSeattle);
		map1.removeLayer(BusSeattle);
		map2.removeLayer(BikeChicago);
		map2.removeLayer(RailChicago);
		map2.removeLayer(BusChicago);
		map3.removeLayer(BikeBoston);
		map3.removeLayer(RailBoston);
		map3.removeLayer(BusBoston);

	} else if (transportationmode == "Bicycle"){

		map1.addLayer(WalkSeattle);
		map1.addLayer(BikeSeattle);
		map2.addLayer(WalkChicago);
		map2.addLayer(BikeChicago);
		map3.addLayer(WalkBoston);
		map3.addLayer(BikeBoston);

		map1.removeLayer(RailSeattle);
		map1.removeLayer(BusSeattle);
		map2.removeLayer(RailChicago);
		map2.removeLayer(BusChicago);
		map3.removeLayer(RailBoston);
		map3.removeLayer(BusBoston);

	} else if (transportationmode == "Rail"){

		map1.addLayer(WalkSeattle);
		map1.addLayer(RailSeattle);
		map2.addLayer(WalkChicago);
		map2.addLayer(RailChicago);
		map3.addLayer(WalkBoston);
		map3.addLayer(RailBoston);

		map1.removeLayer(BikeSeattle);
		map1.removeLayer(BusSeattle);
		map2.removeLayer(BikeChicago);
		map2.removeLayer(BusChicago);
		map3.removeLayer(BikeBoston);
		map3.removeLayer(BusBoston);

	} else if (transportationmode == "Bus"){

		map1.addLayer(WalkSeattle);
		map1.addLayer(BusSeattle);
		map2.addLayer(WalkChicago);
		map2.addLayer(BusChicago);
		map3.addLayer(WalkBoston);
		map3.addLayer(BusBoston);

		map1.removeLayer(BikeSeattle);
		map1.removeLayer(RailSeattle);
		map2.removeLayer(BikeChicago);
		map2.removeLayer(RailChicago);
		map3.removeLayer(BikeBoston);
		map3.removeLayer(RailBoston);

	} else if (transportationmode == 'Reset'){

		map1.removeLayer(WalkSeattle);
		map1.removeLayer(BikeSeattle);
		map1.removeLayer(RailSeattle);
		map1.removeLayer(BusSeattle);
		map2.removeLayer(WalkChicago);
		map2.removeLayer(BikeChicago);
		map2.removeLayer(RailChicago);
		map2.removeLayer(BusChicago);
		map3.removeLayer(WalkBoston);
		map3.removeLayer(BikeBoston);
		map3.removeLayer(RailBoston);
		map3.removeLayer(BusBoston);
	}

};

// Defining a function that adds and/or removes layers from
function changeMarket(){
	var e = document.getElementById("foodmarket");
	var foodmarket = e.options[e.selectedIndex].value;

 	if (foodmarket == "Grocery Store"){
		map1.addLayer(GSSeattle);
		map2.addLayer(GSChicago);
		map3.addLayer(GSBoston);

		map1.removeLayer(SMSeattle);
		map1.removeLayer(HMSeattle);
		map1.removeLayer(OMSeattle);
		map2.removeLayer(SMChicago);
		map2.removeLayer(HMChicago);
		map2.removeLayer(OMChicago);
		map3.removeLayer(SMBoston);
		map3.removeLayer(HMBoston);
		map3.removeLayer(OMBoston);

	} else if (foodmarket == "Supermarket"){

		// Adding Supermarket layer for all the maps
		map1.addLayer(SMSeattle);
		map2.addLayer(SMChicago);
		map3.addLayer(SMBoston);

		// Removing the rest of the retail food market layers from the map
		map1.removeLayer(GSSeattle);
		map1.removeLayer(HMSeattle);
		map1.removeLayer(OMSeattle);
		map2.removeLayer(GSChicago);
		map2.removeLayer(HMChicago);
		map2.removeLayer(OMChicago);
		map3.removeLayer(GSBoston);
		map3.removeLayer(HMBoston);
		map3.removeLayer(OMBoston);

	} else if (foodmarket == "Hypermarket"){

		// Adding Hypermarket layers for all of the maps
		map1.addLayer(HMSeattle);
		map2.addLayer(HMChicago);
		map3.addLayer(HMBoston);

		// Removing the rest of the retail food market layers from the map
		map1.removeLayer(GSSeattle);
		map1.removeLayer(SMSeattle);
		map1.removeLayer(OMSeattle);
		map2.removeLayer(GSChicago);
		map2.removeLayer(SMChicago);
		map2.removeLayer(OMChicago);
		map3.removeLayer(GSBoston);
		map3.removeLayer(SMBoston);
		map3.removeLayer(OMBoston);

	} else if (foodmarket == 'Other Markets'){

		// Adding Other Markets layers for all of the maps
		map1.addLayer(OMSeattle);
		map2.addLayer(OMChicago);
		map3.addLayer(OMBoston);

			// Removing the rest of the retail food market layers from the map
		map1.removeLayer(GSSeattle);
		map1.removeLayer(SMSeattle);
		map1.removeLayer(HMSeattle);
		map2.removeLayer(GSChicago);
		map2.removeLayer(SMChicago);
		map2.removeLayer(HMChicago);
		map3.removeLayer(GSBoston);
		map3.removeLayer(SMBoston);
		map3.removeLayer(HMBoston);

	} else if (foodmarket == "All Food Retail Markets"){

		map1.addLayer(GSSeattle);
		map1.addLayer(SMSeattle);
		map1.addLayer(HMSeattle);
		map1.addLayer(OMSeattle);
		map2.addLayer(GSChicago);
		map2.addLayer(SMChicago);
		map2.addLayer(HMChicago);
		map2.addLayer(OMChicago);
		map3.addLayer(GSBoston);
		map3.addLayer(SMBoston);
		map3.addLayer(HMBoston);
		map3.addLayer(OMBoston);

	} else if (foodmarket == "Reset"){

		map1.removeLayer(GSSeattle);
		map1.removeLayer(SMSeattle);
		map1.removeLayer(HMSeattle);
		map1.removeLayer(OMSeattle);
		map2.removeLayer(GSChicago);
		map2.removeLayer(SMChicago);
		map2.removeLayer(HMChicago);
		map2.removeLayer(OMChicago);
		map3.removeLayer(GSBoston);
		map3.removeLayer(SMBoston);
		map3.removeLayer(HMBoston);
		map3.removeLayer(OMBoston);
	};
};
// Creating a funcion for the colors based upon natural breaks and city
function getCTColorSeattle(d){
	return d > 3.08 ? "#d7301f":
				 d > 1.30 ? "#fc8d59":
				 d > -0.49  ? "#fdd49e":
				 							"#fff7ec";
};

function getCTColorChicago(d){
	return d > 4.02 ? "#d7301f":
				 d > 1.91 ? "#fc8d59":
				 d > -0.07 ? "#fdd49e":
				 						"#fff7ec";


};

function getCTColorBoston(d){
	return d > 3.25 ? "#d7301f":
				 d > 1.50  ? "#fc8d59":
				 d > -0.37 ? "#fdd49e":
				 						"#fff7ec";

};

// Creating a function to generate the retail food market locations that accept SNAP
function getSNAP(data, n){
	/* Creating the grocery store (GS), supermarket (SM), hypermarket (HM) and other market (OM) layers
	for each urban community and applying the points to the respective maps */
	if (n == 3){
		var attributes = processData(data);

		GSBoston = L.geoJson(data, {
			filter: function(feature, layer){
				return feature.properties.MarketType == "Grocery Store";
			},
			pointToLayer: function(feature, latlng){
				return pointToLayer(feature, latlng, attributes);
			}
		});
		GSBoston.addTo(map3);

		SMBoston = L.geoJson(data, {
			filter: function(feature, layer){
				return feature.properties.MarketType == "Supermarket";
			},
			pointToLayer: function(feature, latlng){
				return pointToLayer(feature, latlng, attributes);
			}
		});
		SMBoston.addTo(map3);

		HMBoston = L.geoJson(data, {
			filter: function(feature, layer){
				return feature.properties.MarketType == "Hypermarket";
			},
			pointToLayer: function(feature, latlng){
				return pointToLayer(feature, latlng, attributes);
			}
		});
		HMBoston.addTo(map3);

		OMBoston = L.geoJson(data, {
			filter: function(feature, layer){
				return feature.properties.MarketType == "Other Market";
			},
			pointToLayer: function(feature, latlng){
				return pointToLayer(feature, latlng, attributes);
			}
		});
		OMBoston.addTo(map3);

	} else if (n == 2){
		var attributes = processData(data);

		GSChicago = L.geoJson(data, {
			filter: function(feature, layer){
				return feature.properties.MarketType == "Grocery Store";
			},
			pointToLayer: function(feature, latlng){
				return pointToLayer(feature, latlng, attributes);
			}
		});
		GSChicago.addTo(map2);

		SMChicago = L.geoJson(data, {
			filter: function(feature, layer){
				return feature.properties.MarketType == "Supermarket";
			},
			pointToLayer: function(feature, latlng){
				return pointToLayer(feature, latlng, attributes);
			}
		});
		SMChicago.addTo(map2);

		HMChicago = L.geoJson(data, {
			filter: function(feature, layer){
				return feature.properties.MarketType == "Hypermarket";
			},
			pointToLayer: function(feature, latlng){
				return pointToLayer(feature, latlng, attributes);
			}
		});
		HMChicago.addTo(map2);

		OMChicago = L.geoJson(data, {
			filter: function(feature, layer){
				return feature.properties.MarketType == "Other Market";
			},
			pointToLayer: function(feature, latlng){
				return pointToLayer(feature, latlng, attributes);
			}
		});
		OMChicago.addTo(map2);

	} else if (n == 1){
		var attributes = processData(data);

		GSSeattle = L.geoJson(data, {
			filter: function(feature, layer){
				return feature.properties.MarketType == "Grocery Store";
			},
			pointToLayer: function(feature, latlng){
				return pointToLayer(feature, latlng, attributes);
			}
		});
		GSSeattle.addTo(map1);

		SMSeattle = L.geoJson(data, {
			filter: function(feature, layer){
				return feature.properties.MarketType == "Supermarket";
			},
			pointToLayer: function(feature, latlng){
				return pointToLayer(feature, latlng, attributes);
			}
		});
		SMSeattle.addTo(map1);

		HMSeattle = L.geoJson(data, {
			filter: function(feature, layer){
				return feature.properties.MarketType == "Hypermarket";
			},
			pointToLayer: function(feature, latlng){
				return pointToLayer(feature, latlng, attributes);
			}
		});
		HMSeattle.addTo(map1);

		OMSeattle = L.geoJson(data, {
			filter: function(feature, layer){
				return feature.properties.MarketType == "Other Market";
			},
			pointToLayer: function(feature, latlng){
				return pointToLayer(feature, latlng, attributes);
			}
		});
		OMSeattle.addTo(map1);
	};

	function processData(data){
		var attributes = [];
		var properties = data.features[0].properties;
		for (var attribute in properties){
			if (attribute.indexOf("MarketType")>-1){
				attributes.push(attribute);
			};
		};
		return attributes;
	};

	function pointToLayer(feature, latlng, attributes){
			var attribute = attributes[0];
			current = attribute;

			var attrValue = feature.properties[attribute];
				if (attrValue == "Grocery Store"){
					var layer = L.circleMarker(latlng, {
					  radius: 3,
						color: "#000000",
					  fillColor: "#7fcdbb",
					  weight: 1,
					  opacity: 1,
					  fillOpacity: 1
					});
					return layer;
				} else if (attrValue == "Supermarket"){
					var layer = L.circleMarker(latlng, {
					  radius: 6,
						color: "#000000",
					  fillColor: "#1f78b4",
					  weight: 1,
					  opacity: 1,
					  fillOpacity: 1
					});
					return layer;
				} else if (attrValue == "Hypermarket"){
					var layer = L.circleMarker(latlng, {
					  radius: 8,
						color: "#000000",
					  fillColor: "#b2df8a",
					  weight: 1,
					  opacity: 1,
					  fillOpacity: 1
					});
					return layer;
				} else if (attrValue == "Other Market"){
					var layer = L.circleMarker(latlng, {
					  radius: 3,
						color: "#000000",
					  fillColor: "#bdbdbd",
					  weight: 0.5,
					  opacity: 1,
					  fillOpacity: 1
					});
					return layer;
				};
		};
};

/* Creating a function to generate the walking buffers for each of the urban communities
with respect to retail food market locations */
function setWalkBuffer(data, n){
	if (n == 3){
		// map3.removeLayer(WalkBoston);
		WalkBoston = L.geoJson(data, {
				style: walkbufferStyle
			});
			WalkBoston.addTo(map3);
	} else if (n == 2){
		// map2.removeLayer(WalkChicago);
		WalkChicago = L.geoJson(data, {
				style: walkbufferStyle
			});
			WalkChicago.addTo(map2);
	} else if (n == 1){
		// map1.removeLayer(WalkSeattle);
		WalkSeattle = L.geoJson(data, {
				style: walkbufferStyle
			});
			WalkSeattle.addTo(map1);
	};
};

/* Creating a function to generate the bicycling buffers for each of the urban communities
with respect to retail food market locations */
function setBikeBuffer(data, n){
	if (n == 3){
		// map3.removeLayer(BikeBoston);
		BikeBoston = L.geoJson(data, {
				style: bikebufferStyle
			});
			BikeBoston.addTo(map3);
	} else if  (n == 2){
		// map2.removeLayer(BikeChicago);
		BikeChicago = L.geoJson(data, {
				style: bikebufferStyle
			});
			BikeChicago.addTo(map2);
	} else if (n == 1){
		// map1.removeLayer(BikeSeattle);
		BikeSeattle = L.geoJson(data, {
				style: bikebufferStyle
			});
			BikeSeattle.addTo(map1);
	}
};

/* Creating a function to generate the rail service areas for each of the urban communities
with respect to walking distances from the rail stations */
function setRailBuffer(data, n){
	if (n == 3){
		// map3.removeLayer(RailBoston);
		RailBoston = L.geoJson(data, {
				style: railbufferStyle
			});
			RailBoston.addTo(map3);
	} else if  (n == 2){
		// map2.removeLayer(RailChicago);
		RailChicago = L.geoJson(data, {
				style: railbufferStyle
			});
			RailChicago.addTo(map2);
	} else if (n == 1){
		// map1.removeLayer(RailSeattle);
		RailSeattle = L.geoJson(data, {
				style: railbufferStyle
			});
			RailSeattle.addTo(map1);
	}
};

/* Creating a function to generate the bus service areas for each of the urban communities
with respect to walking distances from the bus stops */
function setBusBuffer(data, n){
	if (n == 3){
		// map3.removeLayer(BusBoston);
		BusBoston = L.geoJson(data, {
				style: busbufferStyle
			});
			BusBoston.addTo(map3);
	} else if  (n == 2){
		// map2.removeLayer(BusChicago);
		BusChicago = L.geoJson(data, {
				style: busbufferStyle
			});
			BusChicago.addTo(map2);
	} else if (n == 1){
		// map1.removeLayer(BusSeattle);
		BusSeattle = L.geoJson(data, {
				style: busbufferStyle
			});
			BusSeattle.addTo(map1);
	}
};

/* Creating a legend for each map to visualize the color scale for the PCA scores that
were generated from the census tract demographic factors defined by USDA Food Environment Atlas */
function createLegend(map, n){
	var LegendControl = L.Control.extend({
		options: {
			position: 'bottomright'
		},

		onAdd: function(map){
			// Creating a container for the legend control
			var container = L.DomUtil.create('div', 'legend-control-container');
				pcaboston = [-1.73,-0.37, 1.50, 3.25],
				pcachicago = [-1.50,-0.07,1.91,4.02],
				pcaseattle = [-1.90,-0.49, 1.30, 3.08],
				labels = [];

				container.innerHTML += '<b> PCA Scoring Range</b><br>'

			if (n == 3){
				for (var i = 0; i < pcaboston.length; i++){
					container.innerHTML += '<i style="background:' + getCTColorBoston(pcaboston[i]+1) + '"></i> ' + pcaboston[i] + (pcaboston[i+1]? " " + '&ndash;' + " " + pcaboston[i+1]+'<br>' : '+');
				}
				console.log(getCTColorBoston(pcaboston[0]));
				return container;
			} else if (n == 2){
				for (var i = 0; i < pcachicago.length; i++){
					container.innerHTML += '<i style="background:' + getCTColorChicago(pcachicago[i]+1) + '"></i> ' + pcachicago[i] + (pcachicago[i+1]? " " + '&ndash;' + " " + pcachicago[i+1]+'<br>' : '+');
				}
				return container;
			} else if (n == 1){
				for (var i = 0; i < pcaseattle.length; i++){
					container.innerHTML += '<i style="background:' + getCTColorSeattle(pcaseattle[i]+1) + '"></i> ' + pcaseattle[i] + (pcaseattle[i+1]? " " + '&ndash;' + " " + pcaseattle[i+1]+'<br>' : '+');
				}
				return container;
			}
		}
	});

	if (n == 3){
		map3.addControl(new LegendControl())
	} else if (n == 2){
		map2.addControl(new LegendControl())
	} else if (n == 1){
		map1.addControl(new LegendControl())
	};
};

function createPanel(){
	var content = "<p>The purpose of the interactive map is to compare food access areas by different mode choices (Walk, Bicycle, Rail and Bus) and different food markets (Grocery Stores, Supermarkets, Hypermarkets and Other Markets) for different cities across the United States.</p><p>The Principal Compoent Analysis (PCA) Scoring Range is comprised of five main factors that the USDA Food Environment Atlas uses to evaluate demographic characteristics for food accessibility (Population, Low-Income, Age (Children, Seniors) and No Household Vehicle Availability). The scores reflect variation between the census tracts in the state, which is reflected in the different ranges per urban area. The higher the score is for the census tract, the greater the concern is for food accessibility in the area. </p>";
	$('#panel').append(content);
};

$(document).ready(initialize);
