var WalkSeattle;
var WalkChicago;
var WalkBoston;
var BikeSeattle;
var BikeChicago;
var BikeBoston;
var RailSeattle;
var RailChicago;
var RailBoston;
var BusChicago;
var BusSeattle;
var BusBoston;
var GSLayer;
var SMLayer;
var HMLayer;

function initialize(){
	createMap();
	updateLayers();
};

var map1;
var map2;
var map3;

var bikebufferStyle = {
	"fillColor": "#ff7800",
	"weight": 2,
	"opacity": 1,
	"color": "#bdbdbd",
	"fillopacity": 10
};

var walkbufferStyle = {
	"fillColor": "#d95f0e",
	"weight": 2,
	"opacity": 1,
	"color": "#bdbdbd",
	"fillopacity": 10
};

var railbufferStyle = {
	"fillColor": "#31a354",
	"weight": 2,
	"opacity": 1,
	"color": "#bdbdbd",
	"fillopacity": 10
};

var busbufferStyle = {
	"fillColor": "#756bb1",
	"weight": 2,
	"opacity": 1,
	"color": "#bdbdbd",
	"fillopacity": 10
}

var cityarray = ["Seattle", "Chicago", "Boston"];

// Creating a function to instantiate the map with Leaflet
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

	getCTs(map1, 1);
	getCTs(map2, 2);
	getCTs(map3, 3);
};

// Loading the transportation and food market layers into each of the maps
function updateLayers(){
	// getSNAP(map1, 1);
	// getSNAP(map2, 2);
	// getSNAP(map3, 3);
	// getwalkBuffer(map1, 1);
	// getWalkBuffer(map2, 2);
	// getWalkBuffer(map3, 3);
	// getBikeBuffer(map1, 1);
	// getBikeBuffer(map2, 2);
	// getBikeBuffer(map3, 3);
	// getRailBuffer(map1, 1);
	// getRailBuffer(map2, 2);
	// getRailBuffer(map3, 3);
	// getBusBuffer(map1, 1);
	// getBusBuffer(map2, 2);
	// getBusBuffer(map3, 3);

	// Loading the Transportation Layers
	changeTransportation();
	// Loading the Retail Market Layers
	changeMarket();
};



/* Creating a function that would add/remove layers from different mode choice ajax requests*/
function changeTransportation(){
	var e = document.getElementById("modechoice");
	var transportationmode = e.options[e.selectedIndex].value;

	// console.log(transportationmode);
	if (transportationmode == "Walk"){
		getWalkBuffer(map1, 1); //  initialize WalkSeattle
		getWalkBuffer(map2, 2);
		getWalkBuffer(map3, 3);

		map1.removeLayer(BikeSeattle);
		map2.removeLayer(BikeChicago);
		map3.removeLayer(BikeBoston);
		map1.removeLayer(RailSeattle);
		map2.removeLayer(RailChicago);
		map3.removeLayer(RailBoston);
		map1.removeLayer(BusSeattle);
		map2.removeLayer(BusChicago);
		map3.removeLayer(BusBoston);

		map1.addLayer(WalkSeattle);
		map2.addLayer(WalkChicago);
		map3.addLayer(WalkBoston);

		// var WalkSeattle = getWalkBuffer(map1, 1);
		// var WalkBoston = getWalkBuffer(map3, 3);
	//	walkBufferSeattle  = getWalkBufferSeattle(map1);
	//  toggleLayer(map1, walkSeattle, toggleWalk);
	//  toggleLayer(map2, walkChicago, toggleWalk);
		// var walkBufferBoston = getWalkBufferBoston(map3);
	} else if (transportationmode =="Bicycle"){
		// map1.removeLayer(WalkSeattle);
		// map2.removeLayer(WalkChicago);
		getBike(map1, 1);
		getBike(map2, 2);
		getBike(map3, 3);

		map1.removeLayer(WalkSeattle);
		map2.removeLayer(WalkChicago);
		map3.removeLayer(WalkBoston);
		map1.removeLayer(RailSeattle);
		map2.removeLayer(RailChicago);
		map3.removeLayer(RailBoston);
		map1.removeLayer(BusSeattle);
		map2.removeLayer(BusChicago);
		map3.removeLayer(BusBoston);

		map1.addLayer(BikeSeattle);
		map2.addLayer(BikeChicago);
		map3.addLayer(BikeBoston);

		// var BikeChicago = getBike(map2, 2);
		// var BikeBoston = getBike(map3, 3)
		} else if (transportationmode == "Rail"){
		// getRail(map1, 1);
		getRail(map2, 2);
		getRail(map3, 3);

		map1.removeLayer(WalkSeattle);
		map2.removeLayer(WalkChicago);
		map3.removeLayer(WalkBoston);
		map1.removeLayer(BusSeattle);
		map2.removeLayer(BusChicago);
		map3.removeLayer(BusBoston);
		map1.removeLayer(BikeSeattle);
		map2.removeLayer(BikeChicago);
		map3.removeLayer(BikeBoston);

		map1.addLayer(RailSeattle);
		map2.addLayer(RailChicago);
		map3.addLayer(RailBoston);
	} else if (transportationmode == "Bus"){
		// var BusSeattle = getBus(map1, 1);
		getBus(map2, 2);
		getBus(map3, 3);

		map1.removeLayer(WalkSeattle);
		map2.removeLayer(WalkChicago);
		map3.removeLayer(WalkBoston);
		map1.removeLayer(BikeSeattle);
		map2.removeLayer(BikeChicago);
		map3.removeLayer(BikeBoston);
		map1.removeLayer(RailSeattle);
		map2.removeLayer(RailChicago);
		map3.removeLayer(RailBoston);

		map1.addLayer(BusSeattle);
		map2.addLayer(BusChicago);
		map3.addLayer(BusBoston);
	};
};

/* Creating a function that would change the layers that would be added/removed
depending on the selected value from the dropdown menu for food markets */
function changeMarket(){
	var e = document.getElementById("foodmarket");
	var foodmarket = e.options[e.selectedIndex].value;

	if (foodmarket == "Grocery Store"){
		getSNAP(map1, 1);
		getSNAP(map2, 2);
		getSNAP(map3, 3);
		map1.removeLayer(SMLayer);
		map2.removeLayer(SMLayer);
		map3.removeLayer(SMLayer);
		map1.removeLayer(HMLayer);
		map2.removeLayer(HMLayer);
		map3.removeLayer(HMLayer);
		map1.removeLayer(OMLayer);
		map2.removeLayer(OMLayer);
		map3.removeLayer(OMLayer);

		map1.addLayer(GSLayer);
		map2.addLayer(GSLayer);
		map3.addLayer(GSLayer);

		// add layers
		// remove layers
		/* if (other retail markets layers exist)
		{removes other food market layers}
			else {
			add grocery store layer
		} */
	} else if (foodmarket == "Supermarket"){
		alert("Whee");
		getSNAP(map1, 1);
		getSNAP(map2, 2);
		getSNAP(map3, 3);
		map1.removeLayer(GSLayer);
		map2.removeLayer(GSLayer);
		map3.removeLayer(GSLayer);
		map1.removeLayer(HMLayer);
		map2.removeLayer(HMLayer);
		map3.removeLayer(HMLayer);
		map1.removeLayer(OMLayer);
		map2.removeLayer(OMLayer);
		map3.removeLayer(OMLayer);

		map1.addLayer(SMLayer);
		map2.addLayer(SMLayer);
		map3.addLayer(SMLayer);
		/* if (other retail markets layers exist)
		{removes other food market layers}
			else {
			add supermarket layer
		} */
	} else if (foodmarket == "Hypermarket"){
		alert("wha?");
		map1.addLayer(HMLayer);
		map2.addLayer(HMLayer);
		map3.addLayer(HMLayer);
		/* if (other retail markets layers exist)
		{removes other food market layers}
			else {
			add hypermarket layer
		} */
	} else if (foodmarket == 'Other Markets'){
		/* if (other retail markets layers exist)
		{removes other food market layers}
			else {
			add hypermarket layer
		} */
	} else if (foodmarket == 'All Food Retail Markets'){
		// getSNAP(map1, 1);
		// getSNAP(map2, 2);
		// getSNAP(map3, 3);
		/* Load all retail market layers */
	};
};

/* Creating a toggle function that will add/remove the layers based upon the
the selection in the drop down menu for transportation mode choices */
// function toggleLayer(map, layer, toggle) {
// 	if(!toggle) {
// 		console.log("remove layer");
//     map.removeLayer(layer);
// 		toggle = true;
//   } else {
// 			console.log("add layer");
//   		map.addLayer(layer);
// 			toggle = false;
//   }
//
// console.log("new value: " + toggleWalk);
//
// }


/* Creating a function that would create the census tract polygons in accordance
to the attribute */
function getCTs(map, n){
	if (n == 3) {
		$.ajax("data/Boston_CT.geojson", {
			dataType: "json",
			success: function(response){
				createCensusTracts(response, map, n);
				}
			});
	} else if (n == 2) {
		$.ajax("data/Chicago_CT.geojson", {
			dataType: "json",
			success: function(response){
				createCensusTracts(response, map, n);
				}
			});
	} else if (n == 1) {
		$.ajax("data/Seattle_CT.geojson", {
			dataType: "json",
			success: function(response){
				createCensusTracts(response, map, n);
				}
			});
	};

	// Creating a function that creates polygon layers from the geoJSONs
	function createCensusTracts(data, map, n){
		var attribute = "PC1"
		// Creating the leaflet layer for the census tracts based upon the city
			if (n == 3) {
					L.geoJson(data, {
						style: function(feature){
							var attValue = feature.properties[attribute];
							return {
							"color": "#999",
							"weight": 0.5,
							"fillColor": getCTColorBoston(feature.properties[attribute]),
							"fillopacity": 5,
							};
						}
					}
				).addTo(map);
			} else if (n == 2){
					L.geoJson(data, {
						style: function(feature){
							var attValue = feature.properties[attribute];
							return {
							"color": "#999",
							"weight": 0.5,
							"fillColor": getCTColorChicago(feature.properties[attribute]),
							"fillopacity": 5,
							};
						}
					}
				).addTo(map);
			} else if (n == 1){
					L.geoJson(data, {
						style: function(feature){
							var attValue = feature.properties[attribute];
							return {
							"color": "#999",
							"weight": 0.5,
							"fillColor": getCTColorSeattle(feature.properties[attribute]),
							"fillopacity": 5,
							};
						}
					}
				).addTo(map);
			};

		// Creating a funcion for the colors based upon natural breaks and city
		function getCTColorSeattle(d){
			return d > 2.565 ? "#993404":
						 d > 1.077 && d <= 2.565 ? "#d95f0e":
						 d > -0.411 && d <= 1.077 ? "#fe9929":
						 d <= -0.411 ? "#fed98e":
						 				 "#969696";
		};

		function getCTColorChicago(d){
			return d >= 3.65 ? "#993404":
						 d >= 0.71 && d < 3.65 ? "#d95f0e":
						 d >= -0.91 && d < 0.71 ? "#fe9929":
						 d < -0.91 ? "#fed98e":
								 				 "#969696";
		};

		function getCTColorBoston(d){
			return d >= 2.69 ? "#993404":
						 d >= 0.56 && d < 2.69 ? "#d95f0e":
						 d >= -1.42 && d < 0.56 ? "#fe9929":
						 d < -1.42 ? "#fed98e":
								 				 "#969696";
		};
	};
};

function getSNAP(map, n){
	if (n == 3) {
		$.ajax("data/Boston_SNAPFoodRetail.geojson", {
			dataType: "json",
			success: function(response){
				var attributes = processData(response);
				createSymbols(response, map, attributes);
				}
			});
	} else if (n == 2) {
			$.ajax("data/Chicago_SNAPFoodRetail.geojson", {
				dataType: "json",
				success: function(response){
					var attributes = processData(response);
					createSymbols(response, map, attributes);
					}
				});
	} else if (n == 1) {
		$.ajax("data/Seattle_SNAPFoodRetail.geojson", {
			dataType: "json",
			success: function(response){
				var attributes = processData(response);
				createSymbols(response, map, attributes);
				}
			});
		};

	/* Processing the geoJSON files for each of the retail food markets
	to run in functions below */
	function processData(data){
		var attributes = [];
		var properties = data.features[0].properties;
		// console.log(data.features[0].properties);
		for (var attribute in properties){
			if (attribute.indexOf("Type")>-1){
				attributes.push(attribute);
			};
		};
	// console.log(attributes);
	return attributes;
	};

	// Creating the point symbols for each of the retail markets
	function createSymbols(data, map, attributes){
		var all = new L.geoJson(data, {
			pointToLayer: function(feature, latlng){
				return pointToLayer(feature, latlng, attributes);
			}
		}).addTo(map);

		var grocery = new L.geoJson(data, {
			filter: function(feature, layer){
				return feature.properties.Type == "Grocery Store";
			},
			pointToLayer: function(feature, latlng){
				return pointToLayer(feature, latlng, attributes);
			}
		});
		return grocery;

		var supermarket = new L.geoJson(data, {
			filter: function(feature, layer){
				return feature.properties.Type == "Supermarket";
			},
			pointToLayer: function(feature, latlng){
				return pointToLayer(feature, latlng, attributes);
			}
		});
		return supermarket;

		var hypermarket = new L.geoJson(data, {
			filter: function(feature, layer){
				return feature.properties.Type == "Hypermarket";
			},
			pointToLayer: function(feature, latlng){
				return pointToLayer(feature, latlng, attributes);
			}
		});
		return hypermarket;

		// var othermarket = L.geoJson(data, {
		// 	filter: function(featuture, layer){
		// 		return feature.properties.Type != "Hypermarket";
		// 	},
		// 	pointToLayer: function(feature, latlng){
		// 			return pointToLayer(feature, latlng, attributes);
		// 		}
		// 	});

	};

/* Creating a function that generates the point layer based upon
food market type */
	function pointToLayer(feature, latlng, attributes){
			var attribute = attributes[0];
			current = attribute;

			var attrValue = feature.properties[attribute];
				if (attrValue == "Grocery Store"){
					var GSLayer = L.circleMarker(latlng, {
						radius: 3,
						fillColor: "#a6cee3",
						weight: 1,
						opacity: 1,
						fillOpacity: 0.4
					});
					return GSLayer;
				} else if (attrValue == "Supermarket"){
					var SMLayer = L.circleMarker(latlng, {
						radius: 6,
						fillColor: "#1f78b4",
						weight: 1,
						opacity: 1,
						fillOpacity: 0.4
					});
					return SMLayer;
				} else if (attrValue == "Hypermarket"){
					var HMLayer = L.circleMarker(latlng, {
						radius: 8,
						fillColor: "#b2df8a",
						weight: 1,
						opacity: 1,
						fillOpacity: 0.4
					});
					return HMLayer;
				  } else {
					var OMLayer = L.circleMarker(latlng, {
					radius: 2,
					fillColor: "#b2df8a",
					weight: 1,
					opacity: 1,
					fillOpacity: 0.4
				});
				return OMLayer;
				};
		};
};

// Creating a function that loads the walking service area for each map
function getWalkBuffer(map, n){
	// var WalkBoston = "";
	// var WalkChicago = "";
	// var WalkSeattle = "";

	if (n == 3) {
		$.ajax("data/Boston_WalkBuffer.geojson", {
			dataType: "json",
			success: function(response){
				WalkBoston = new L.geoJson(response, {
					style: walkbufferStyle
				}).addTo(map);
			}
		});
		return WalkBoston;
	} else if (n == 2) {
		$.ajax("data/Chicago_WalkBuffer.geojson", {
			dataType: "json",
			success: function(response){
				WalkChicago = new L.geoJson(response, {
					style: walkbufferStyle
				}).addTo(map);
			}
		});
		return WalkChicago;
	} else if (n == 1) {
		$.ajax("data/Seattle_WalkBuffer.geojson", {
			dataType: "json",
			success: function(response){
				WalkSeattle = new L.geoJson(response, {
					style: walkbufferStyle
				}).addTo(map);
			}
		});
		return WalkSeattle;
	};
};

// Creating a function that loads the bicycle routes for each map
function getBike(map, n){
	// var BikeBoston = "";
	// var BikeChicago = "";
	// var BikeSeattle = "";

	if (n == 3) {
		$.ajax("data/Boston_BicycleBuffer.geojson", {
			dataType: "json",
			success: function(response){
				BikeBoston = new L.geoJson(response, {
					style: bikebufferStyle
				}).addTo(map);
			}
		});
		return BikeBoston;
	} else if (n == 2) {
		$.ajax("data/Chicago_BicycleBuffer.geojson", {
			dataType: "json",
			success: function(response){
				BikeChicago = new L.geoJson(response, {
					style: bikebufferStyle
				}).addTo(map);
			}
		});
		return BikeChicago;
	} else if (n == 1) {
		$.ajax("data/Seattle_BicycleBuffer.geojson", {
			dataType: "json",
			success: function(response){
				BikeSeatle = new L.geoJson(response, {
					style: bikebufferStyle
				}).addTo(map);
			}
		});
		return BikeSeattle;
	};
};

/* Creating a funcion that loads the commuter rail lines and service area buffers
 for each of the maps */
function getRail(map, n){
	if (n == 3) {
		$.ajax("data/Boston_RailBuffer.geojson", {
			dataType: "json",
			success: function(response){
				RailBoston = new L.geoJson(response, {
					style: bufferStyle
				}).addTo(map3);
			}
		});
		return RailBoston;

	} else if (n == 2) {
		$.ajax("data/Chicago_RailBuffer.geojson", {
			dataType: "json",
			success: function(response){
				RailChicago = new L.geoJson(response,{
					style: railbufferStyle
				}).addTo(map2);
			}
		});
		return RailChicago;
	} else if (n == 1) {

		$.ajax("data/Seattle_RailBuffer.geojson", {
			dataType: "json",
			success: function(response){
				RailSeattle = new L.geoJson(response, {
					style: railbufferStyle
				}).addTo(map1);
			}
		});
		return RailSeattle;
	};
};

/* Creating a function that loads the bus lines and service area buffers for
each of the maps */
function getBus(map, n){
	if (n == 3) {
		// $.ajax("data/Boston_BusRoutes.geojson", {
		// 	dataType: "json",
		// 	success: function(response){
		// 		L.geoJson(response, {
		// 			style: busStyle
		// 		}).addTo(map3);
		// 	}
		// });

		$.ajax("data/Boston_BusBuffer.geojson", {
			dataType: "json",
			success: function(response){
				BusBoston = new L.geoJson(response, {
					style: busbufferStyle
				}).addTo(map3);
			}
		});
		return BusBoston;
	} else if (n == 2) {
		// $.ajax("data/Chicago_BusRoutes.geojson", {
		// 	dataType: "json",
		// 	success: function(response){
		// 		L.geoJson(response, {
		// 			style: busStyle
		// 		}).addTo(map2);
		// 	}
		// });

		$.ajax("data/Chicago_BusBuffer.geojson", {
			dataType: "json",
			success: function(response){
				BusChicago = new L.geoJson(response,{
					style: busbufferStyle
				}).addTo(map2);
			}
		});
		return BusChicago;
	} else if (n == 1) {
		// $.ajax("data/Seattle_BusRoutes.geojson", {
		// 	dataType: "json",
		// 	success: function(response){
		// 		L.geoJson(response, {
		// 			style: busStyle
		// 		}).addTo(map1);
		// 	}
		// });

		$.ajax("data/Seattle_BusBuffer.geojson", {
			dataType: "json",
			success: function(response){
				BusSeattle = new L.geoJson(response, {
					style: busbufferStyle
				}).addTo(map1);
			}
		});
		return BusSeattle;
	};
};

function createLegend(){

}

$(document).ready(initialize);
