var map1;
var map2;
var map3;

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

// var WalkSeattle;
// var WalkChicago;
// var WalkBoston;
// var BikeSeattle;
// var BikeChicago;
// var BikeBoston;
// var RailSeattle;
// var RailChicago;
// var RailBoston;
// var BusChicago;
// var BusSeattle;
// var BusBoston;
// var GSLayer;
// var SMLayer;
// var HMLayer;

function initialize(){

	d3.queue()
		.defer(d3.json, "data/Seattle_WalkBuffer.geojson")
		.defer(d3.json, "data/Chicago_WalkBuffer.geojson")
		// .defer(d3.json, "data/Boston_WalkBuffer.geojson")
		.defer(d3.json, "data/Seattle_BicycleBuffer.geojson")
		.defer(d3.json, "data/Chicago_BicycleBuffer.geojson")
		// .defer(d3.json, "data/Boston_BicycleBuffer.geojson")
		// .defer(d3.json, "data/Seattle_RailBuffer.geojson")
		.defer(d3.json, "data/Chicago_RailBuffer.geojson")
		.defer(d3.json, "data/Boston_RailBuffer.geojson")
		// .defer(d3.json, "data/Seattle_BusBuffer.geojson")
		.defer(d3.json, "data/Chicago_BusBuffer.geojson")
		.defer(d3.json, "data/Boston_BusBuffer.geojson")
		.defer(d3.json, "data/Seattle_SNAPFoodRetail.geojson")
		.defer(d3.json, "data/Chicago_SNAPFoodRetail.geojson")
		.defer(d3.json, "data/Boston_SNAPFoodRetail.geojson")
		.defer(d3.json, "data/Seattle_CT.geojson")
		.defer(d3.json, "data/Chicago_CT.geojson")
		.defer(d3.json, "data/Boston_CT.geojson")
		.await(callback);

	function callback(error, walkseattle, walkchicago, bikeseattle, bikechicago,
		railchicago, railboston, buschicago, busboston, seattlesnap, chicagosnap, bostonsnap, seattlect, chicagoct, bostonct, attribute){
		// cts = {};
		// walking = {};
		// bicycling = {};
		// railing = {};
		// busing = {};

		console.log(error);
		console.log(walkseattle);
		console.log(walkchicago);
		// console.log(walkboston);
		console.log(bikeseattle);
		console.log(bikechicago);
		// console.log(bikeboston);
		// console.log(railseattle);
		console.log(railchicago);
		console.log(railboston);
		// console.log(busseattle);
		console.log(buschicago);
		console.log(busboston);
		console.log(seattlesnap);
		console.log(chicagosnap);
		console.log(bostonsnap);
		console.log(seattlect);
		console.log(chicagoct);
		console.log(bostonct);


		var Seattle_CT = L.geoJson(seattlect, {
			style: function(feature){
				var attribute = "PC1";
				var attValue = feature.properties[attribute];
					return {
					"color": "#999",
					"weight": 0.5,
					"fillColor": getCTColorSeattle(feature.properties[attribute]),
					"fillopacity": 5
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
					"fillopacity": 5
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
					"fillopacity": 5
				};
			}
		}).addTo(map3);

		// // Adding buffers to
		setWalkBuffer(walkseattle, 1);
		setWalkBuffer(walkchicago, 2);
		// setWalkBuffer(walkboston, 3);
		setBikeBuffer(bikeseattle, 1);
		setBikeBuffer(bikechicago, 2);
		// setBikeBuffer(bikeboston, 3);
		// setRailBuffer(railseattle, 1);
		setRailBuffer(railchicago, 2);
		setRailBuffer(railboston, 3);
		// setBusBuffer(busseattle, 1);
		setBusBuffer(buschicago, 2);
		setBusBuffer(busboston, 3);
		getSNAP(seattlesnap, 1);
		getSNAP(chicagosnap, 2);
		getSNAP(bostonsnap, 3);
	};
	createMap();
	updateLayers();
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
		if (WalkSeattle != "null"){
			map1.addLayer(WalkSeattle);
		} else if (WalkSeattle == 'undefined'){
			setWalkBuffer(walkseattle, 1);
		};

		if (WalkChicago != "null"){
			map2.addLayer(WalkChicago);
		} else if (WalkSeattle == "undefined"){
			setWalkBuffer(walkchicago, 2);
		};

		// if (WalkBoston != "null"){
		// 	map3.addLayer(WalkBoston);
		// } else if (WalkBoston == "undefined"){
		// 	setWalkBuffer(walkboston, 3);
		// };

		map1.removeLayer(BikeSeattle);
		// map1.removeLayer(RailSeattle);
		// map1.removeLayer(BusSeattle);
		map2.removeLayer(BikeChicago);
		map2.removeLayer(RailChicago);
		map2.removeLayer(BusChicago);
		// map3.removeLayer(BikeBoston);
		map3.removeLayer(RailBoston);
		map3.removeLayer(BusBoston);

	} else if (transportationmode == "Bicycle"){
		if (BikeSeattle != "null"){
			map1.addLayer(BikeSeattle);
		} else if (BikeSeattle == 'undefined'){
			setBikeBuffer(bikeseattle, 1);
		};

		if (BikeChicago != "null"){
			map2.addLayer(BikeChicago);
		} else if (BikeSeattle == "undefined"){
			setBikeBuffer(bikechicago, 2);
		};

		// if (BikeBoston != "null"){
		// 	map3.addLayer(BikeBoston);
		// } else if (BikeBoston == "undefined"){
		// 	setBikeBuffer(bikeboston, 3);
		// };

		map1.removeLayer(WalkSeattle);
		// map1.removeLayer(RailSeattle);
		// map1.removeLayer(BusSeattle);
		map2.removeLayer(WalkChicago);
		map2.removeLayer(RailChicago);
		map2.removeLayer(BusChicago);
		// map3.removeLayer(WalkBoston);
		map3.removeLayer(RailBoston);
		map3.removeLayer(BusBoston);

	} else if (transportationmode == "Rail"){
		// if (RailSeattle != "null"){
		// 	map1.addLayer(RailSeattle);
		// } else if (RailSeattle == 'undefined'){
		// 	setRailBuffer(railseattle, 1);
		// };

		if (RailChicago != "null"){
			map2.addLayer(RailChicago);
		} else if (RailSeattle == "undefined"){
			setRailBuffer(railchicago, 2);
		};

		if (RailBoston != "null"){
			map3.addLayer(RailBoston);
		} else if (RailBoston == "undefined"){
			setRailBuffer(railboston, 3);
		};

		map1.removeLayer(WalkSeattle);
		map1.removeLayer(BikeSeattle);
		// map1.removeLayer(BusSeattle);
		map2.removeLayer(WalkChicago);
		map2.removeLayer(BikeChicago);
		map2.removeLayer(BusChicago);
		// map3.removeLayer(WalkBoston);
		// map3.removeLayer(BikeBoston);
		map3.removeLayer(BusBoston);

	} else if (transportationmode == "Bus"){
		// if (BusSeattle != "null"){
		// 	map1.addLayer(BusSeattle);
		// } else if (BusSeattle == 'undefined'){
		// 	setBusBuffer(busseattle, 1);
		// };

		if (BusChicago != "null"){
			map2.addLayer(BusChicago);
		} else if (BusSeattle == "undefined"){
			setBusBuffer(buschicago, 2);
		};

		if (BusBoston != "null"){
			map3.addLayer(BusBoston);
		} else if (BusBoston == "undefined"){
			setBusBuffer(busboston, 3);
		};

		map1.removeLayer(WalkSeattle);
		map1.removeLayer(BikeSeattle);
		// map1.removeLayer(RailSeattle);
		map2.removeLayer(WalkChicago);
		map2.removeLayer(BikeChicago);
		map2.removeLayer(RailChicago);
		// map3.removeLayer(WalkBoston);
		// map3.removeLayer(BikeBoston);
		map3.removeLayer(RailBoston);

	} else if (transportationmode == 'All Mode Choices'){
		map1.addLayer(WalkSeattle);
		map1.addLayer(BikeSeattle);
		// map1.addLayer(RailSeattle);
		// map1.addLayer(BusSeattle);
		map2.addLayer(WalkChicago);
		map2.addLayer(BikeChicago);
		map2.addLayer(RailChicago);
		map2.addLayer(BusChicago);
		// map3.addLayer(WalkBoston);
		// map3.addLayer(BikeBoston);
		map3.addLayer(RailBoston);
		map3.addLayer(BusBoston);
	}

};

// Defining a function that adds and/or removes layers from
function changeMarket(){
	var e = document.getElementById("foodmarket");
	var foodmarket = e.options[e.selectedIndex].value;

 	if (foodmarket == "Grocery Store"){
		if (GSSeattle != "null"){
			map1.addLayer(GSSeattle);
		} else if (GSSeattle == "undefined"){
			getSNAP(seattlesnap, 1);
		};

		if (GSChicago != "null"){
			map2.addLayer(GSChicago);
		} else if (GSChicago == "undefined"){
			getSNAP(chicagosnap, 2);
		};

		if (GSBoston != "null"){
			map3.addLayer(GSBoston);
		} else if (GSBoston == "undefined"){
			getSNAP(bostonsnap, 3);
		};

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
		if (SMSeattle != "null"){
			map1.addLayer(SMSeattle);
		} else if (SMSeattle == "undefined"){
			getSNAP(seattlesnap, 1);
		};

		if (SMChicago != "null"){
			map2.addLayer(SMChicago);
		} else if (SMChicago == "undefined"){
			getSNAP(chicagosnap, 2);
		};

		if (SMBoston != "null"){
			map3.addLayer(SMBoston);
		} else if (SMBoston == "undefined"){
			getSNAP(bostonsnap, 3);
		};

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
		if (HMSeattle != "null"){
			map1.addLayer(HMSeattle);
		} else if (HMSeattle == "undefined"){
			getSNAP(seattlesnap, 1);
		};

		if (HMChicago != "null"){
			map2.addLayer(HMChicago);
		} else if (HMChicago == "undefined"){
			getSNAP(chicagosnap, 2);
		};

		if (HMBoston != "null"){
			map3.addLayer(HMBoston);
		} else if (HMBoston == "undefined"){
			getSNAP(bostonsnap, 3);
		};

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
		if (OMSeattle != "null"){
			map1.addLayer(OMSeattle);
		} else if (OMSeattle == "undefined"){
			getSNAP(seattlesnap, 1);
		};

		if (OMChicago != "null"){
			map2.addLayer(OMChicago);
		} else if (OMChicago == "undefined"){
			getSNAP(chicagosnap, 2);
		};

		if (OMBoston != "null"){
			map3.addLayer(OMBoston);
		} else if (OMBoston == "undefined"){
			getSNAP(bostonsnap, 3);
		};

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
		map2.addLayer(GSChicago);
		map2.addLayer(SMChicago);
		map2.addLayer(HMChicago);
		map3.addLayer(GSBoston);
		map3.addLayer(SMBoston);
		map3.addLayer(HMBoston);
	};
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

function getSNAP(data, n){
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

function setBusBuffer(data, n){
	if (n == 3){
		// map3.removeLayer(BusBoston);
		BusBoston = L.geoJson(data, {
				style: busbufferStyle
			});
			BusBoston.addTo(map3);
			console.log(BusBoston);
	} else if  (n == 2){
		// map2.removeLayer(BusChicago);
		BusChicago = L.geoJson(data, {
				style: busbufferStyle
			});
			BusChicago.addTo(map2);
			console.log(BusChicago);
	} else if (n == 1){
		// map1.removeLayer(BusSeattle);
		BusSeattle = L.geoJson(data, {
				style: busbufferStyle
			});
			BusSeattle.addTo(map1);
			console.log(BusSeattle);
	}
};

$(document).ready(initialize);
