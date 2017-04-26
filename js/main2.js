var map1;
var map2;
var map3;

var walkbufferStyle = {
	"fillColor": "#d95f0e",
	"weight": 2,
	"opacity": 1,
	"color": "#bdbdbd",
	"fillopacity": 10
};

var bikebufferStyle = {
	"fillColor": "#ff7800",
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
};

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
<<<<<<< HEAD
		railchicago, railboston, buschicago, busboston, seattlesnap, chicagosnap, bostonsnap, seattlect, chicagoct, bostonct, attribute){
		// cts = {};
		// walking = {};
		// bicycling = {};
		// railing = {};
		// busing = {};
=======
		railchicago, railboston, buschicago,
		busboston, seattlesnap, chicagosnap, bostonsnap, seattlect, chicagoct, bostonct){
		cts = {};
		walking = {};
		bicycling = {};
		railing = {};
		busing = {};
>>>>>>> origin/master

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

<<<<<<< HEAD
		// // Adding buffers to
=======
		// Adding buffers to
>>>>>>> origin/master
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
<<<<<<< HEAD
=======

		// changeTransportation();
		// changeMarket();

>>>>>>> origin/master
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
<<<<<<< HEAD
=======

>>>>>>> origin/master
	};

function updateLayers(){
	changeTransportation();
<<<<<<< HEAD
	changeMarket();
};

function changeTransportation(){
=======
	// changeMarket();
};

function changeTransportation(walkseattle, walkchicago){
>>>>>>> origin/master
	var e = document.getElementById("modechoice");
	var transportationmode = e.options[e.selectedIndex].value;

	if (transportationmode == "Walk"){
<<<<<<< HEAD
=======
		setWalkBuffer(walkseattle, 1);
		setWalkBuffer(walkchicago, 2);

>>>>>>> origin/master
		if (WalkSeattle != "null"){
			map1.addLayer(WalkSeattle);
		} else if (WalkSeattle == 'undefined'){
			setWalkBuffer(walkseattle, 1);
		};

		if (WalkChicago != "null"){
			map2.addLayer(WalkChicago);
		} else if (WalkSeattle == "undefined"){
			setWalkBuffer(walkchicago, 2);
<<<<<<< HEAD
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

	} else if (transportationmode == 'All Modes'){
		//
		// if (WalkSeattle != "null"){
		// 	map1.addLayer(WalkSeattle);
		// } else if (WalkSeattle == 'undefined'){
		// 	setWalkBuffer(walkseattle, 1);
		// };
		//
		// if (WalkChicago != "null"){
		// 	map2.addLayer(WalkChicago);
		// } else if (WalkSeattle == "undefined"){
		// 	setWalkBuffer(walkchicago, 2);
		// };
		//
		// // if (WalkBoston != "null"){
		// // 	map3.addLayer(WalkBoston);
		// // } else if (WalkBoston == "undefined"){
		// // 	setWalkBuffer(walkboston, 3);
		// // };
		// map1.removeLayer(WalkSeattle);
		// map1.removeLayer(BikeSeattle);
		// // map1.removeLayer(RailSeattle);
		// // map1.removeLayer(BusSeattle);
		// map2.removeLayer(WalkChicago);
		// map2.removeLayer(BikeChicago);
		// map2.removeLayer(RailChicago);
		// map2.removeLayer(BusChicago);
		// // map3.removeLayer(WalkBoston);
		// // map3.removeLayer(BikeBoston);
		// map3.removeLayer(RailBoston);
		// map3.removeLayer(BusBoston);
	}

};

//
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
		// map1.removeLayer(OMSeattle);
		map2.removeLayer(SMChicago);
		map2.removeLayer(HMChicago);
		// map2.removeLayer(OMChicago);
		map3.removeLayer(SMBoston);
		map3.removeLayer(HMBoston);
		// map3.removeLayer(OMBoston);


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
		// map1.removeLayer(OMSeattle);
		map2.removeLayer(GSChicago);
		map2.removeLayer(HMChicago);
		// map2.removeLayer(OMChicago);
		map3.removeLayer(GSBoston);
		map3.removeLayer(HMBoston);
		// map3.removeLayer(OMBoston);

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
		// map1.removeLayer(OMSeattle);
		map2.removeLayer(GSChicago);
		map2.removeLayer(SMChicago);
		// map2.removeLayer(OMChicago);
		map3.removeLayer(GSBoston);
		map3.removeLayer(SMBoston);
		// map3.removeLayer(OMBoston);

	} else if (foodmarket == 'Other Markets'){

	};
};
=======
		}

	} else if (transportationmode == "Bicycle"){

	} else if (transportationmode == "Rail"){

	} else if (transportationmode == "Bus"){

	}

};
//
// function changeMarket(){
//
// };
>>>>>>> origin/master
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
<<<<<<< HEAD
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
					  fillColor: "#a6cee3",
					  weight: 1,
					  opacity: 1,
					  fillOpacity: 0.4
					});
					return layer;
				} else if (attrValue == "Supermarket"){
					var layer = L.circleMarker(latlng, {
					  radius: 6,
					  fillColor: "#1f78b4",
					  weight: 1,
					  opacity: 1,
					  fillOpacity: 0.4
					});
					return layer;
				} else if (attrValue == "Hypermarket"){
					var layer = L.circleMarker(latlng, {
					  radius: 8,
					  fillColor: "#b2df8a",
					  weight: 1,
					  opacity: 1,
					  fillOpacity: 0.4
					});
					return layer;
				  } else {
					var layer = L.circleMarker(latlng, {
					  radius: 2,
					  fillColor: "#b2df8a",
					  weight: 1,
					  opacity: 1,
					  fillOpacity: 0.4
					});
					return layer;
				};
		};
=======

>>>>>>> origin/master
};

function setWalkBuffer(data, n){
	if (n == 3){
<<<<<<< HEAD
		// map3.removeLayer(WalkBoston);
=======
>>>>>>> origin/master
		WalkBoston = L.geoJson(data, {
				style: walkbufferStyle
			});
			WalkBoston.addTo(map3);
<<<<<<< HEAD
	} else if (n == 2){
		// map2.removeLayer(WalkChicago);
=======
			console.log(WalkBoston);
	} else if (n == 2){
>>>>>>> origin/master
		WalkChicago = L.geoJson(data, {
				style: walkbufferStyle
			});
			WalkChicago.addTo(map2);
<<<<<<< HEAD
	} else if (n == 1){
		// map1.removeLayer(WalkSeattle);
=======
			console.log(WalkChicago);
	} else if (n == 1){
>>>>>>> origin/master
		WalkSeattle = L.geoJson(data, {
				style: walkbufferStyle
			});
			WalkSeattle.addTo(map1);
<<<<<<< HEAD
=======
			console.log(WalkSeattle);
>>>>>>> origin/master
	};
};

function setBikeBuffer(data, n){
	if (n == 3){
<<<<<<< HEAD
		// map3.removeLayer(BikeBoston);
=======
>>>>>>> origin/master
		BikeBoston = L.geoJson(data, {
				style: bikebufferStyle
			});
			BikeBoston.addTo(map3);
<<<<<<< HEAD
	} else if  (n == 2){
		// map2.removeLayer(BikeChicago);
=======
			console.log(BikeBoston);
	} else if  (n == 2){
>>>>>>> origin/master
		BikeChicago = L.geoJson(data, {
				style: bikebufferStyle
			});
			BikeChicago.addTo(map2);
<<<<<<< HEAD
	} else if (n == 1){
		// map1.removeLayer(BikeSeattle);
=======
			console.log(BikeChicago);
	} else if (n == 1){
>>>>>>> origin/master
		BikeSeattle = L.geoJson(data, {
				style: bikebufferStyle
			});
			BikeSeattle.addTo(map1);
<<<<<<< HEAD
=======
			console.log(BikeSeattle);
>>>>>>> origin/master
	}
};

function setRailBuffer(data, n){
	if (n == 3){
<<<<<<< HEAD
		// map3.removeLayer(RailBoston);
=======
>>>>>>> origin/master
		RailBoston = L.geoJson(data, {
				style: railbufferStyle
			});
			RailBoston.addTo(map3);
<<<<<<< HEAD
	} else if  (n == 2){
		// map2.removeLayer(RailChicago);
=======
			console.log(RailBoston);
	} else if  (n == 2){
>>>>>>> origin/master
		RailChicago = L.geoJson(data, {
				style: railbufferStyle
			});
			RailChicago.addTo(map2);
<<<<<<< HEAD
	} else if (n == 1){
		// map1.removeLayer(RailSeattle);
=======
			console.log(RailChicago);
	} else if (n == 1){
>>>>>>> origin/master
		RailSeattle = L.geoJson(data, {
				style: railbufferStyle
			});
			RailSeattle.addTo(map1);
<<<<<<< HEAD
=======
			console.log(RailSeattle);
>>>>>>> origin/master
	}
};

function setBusBuffer(data, n){
	if (n == 3){
<<<<<<< HEAD
		// map3.removeLayer(BusBoston);
=======
>>>>>>> origin/master
		BusBoston = L.geoJson(data, {
				style: busbufferStyle
			});
			BusBoston.addTo(map3);
			console.log(BusBoston);
	} else if  (n == 2){
<<<<<<< HEAD
		// map2.removeLayer(BusChicago);
=======
>>>>>>> origin/master
		BusChicago = L.geoJson(data, {
				style: busbufferStyle
			});
			BusChicago.addTo(map2);
			console.log(BusChicago);
	} else if (n == 1){
<<<<<<< HEAD
		// map1.removeLayer(BusSeattle);
=======
>>>>>>> origin/master
		BusSeattle = L.geoJson(data, {
				style: busbufferStyle
			});
			BusSeattle.addTo(map1);
			console.log(BusSeattle);
	}
};
$(document).ready(initialize);