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
<<<<<<< HEAD
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
=======
	createMap();
	updateLayers();


	getWalk(map1, 1);
	getWalk(map2, 2);
	getWalk(map3, 3);
	getBike(map1, 1);
	getBike(map2, 2);


};
>>>>>>> origin/master

	function callback(error, walkseattle, walkchicago, bikeseattle, bikechicago,
		railchicago, railboston, buschicago, busboston, seattlesnap, chicagosnap, bostonsnap, seattlect, chicagoct, bostonct, attribute){
		// cts = {};
		// walking = {};
		// bicycling = {};
		// railing = {};
		// busing = {};

<<<<<<< HEAD
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
=======

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
	// getWalk(map1, 1);
	// getWalk(map2, 2);
	// getWalk(map3, 3);
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
		getWalk(map1, 1); //  initialize WalkSeattle
		getWalk(map2, 2);
		getWalk(map3, 3);

		console.log(WalkSeattle);

		if (WalkSeattle != "null"){
			map1.addLayer(WalkSeattle);
		} else if(WalkSeattle == 'undefined'){
			getWalk(map1, 1);
		};

		if (WalkChicago != "null"){
			map2.addLayer(WalkChicago);
		} else if(WalkChicago == 'undefined'){
			getWalk(map2, 2);
		};

		if (WalkBoston != "null"){
			map3.addLayer(WalkBoston);
		} else if(WalkBoston == 'undefined'){
			getWalk(map3, 3);
		};

		if (BikeSeattle != "null"){
			map1.removeLayer(BikeSeattle)
		};
		map2.removeLayer(BikeChicago);
		map3.removeLayer(BikeBoston);
		map1.removeLayer(RailSeattle);
		map2.removeLayer(RailChicago);
		map3.removeLayer(RailBoston);
		map1.removeLayer(BusSeattle);
		map2.removeLayer(BusChicago);
		map3.removeLayer(BusBoston);


		// var WalkSeattle = getWalk(map1, 1);
		// var WalkBoston = getWalk(map3, 3);
	//	walkBufferSeattle  = getWalkSeattle(map1);
	//  toggleLayer(map1, walkSeattle, toggleWalk);
	//  toggleLayer(map2, walkChicago, toggleWalk);
		// var walkBufferBoston = getWalkBoston(map3);
	} else if (transportationmode =="Bicycle"){
		getBike(map1, 1);
		getBike(map2, 2);
		getBike(map3, 3);

		if (BikeSeattle != "null"){
			map1.addLayer(BikeSeattle);
		} else if(BikeSeattle == 'undefined'){
			getWalk(map1, 1);
		};

		if (BikeChicago != "null"){
			map2.addLayer(BikeChicago);
		} else if(BikeChicago == 'undefined'){
			getWalk(map2, 2);
		};

		if (BikeBoston != "null"){
			map3.addLayer(BikeBoston);
		} else if(BikeBoston == 'undefined'){
			getWalk(map3, 3);
		};


		if (WalkSeattle != "null"){
			map1.removeLayer(WalkSeattle)
		};

		if (WalkChicago != "null"){
			map2.removeLayer(WalkChicago)
		};

		if (WalkBoston != "null"){
			map3.removeLayer(WalkBoston)
		};

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

		// if(walking[0],)
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

		map1.addLayer(grocery);
		map2.addLayer(grocery);
		map3.addLayer(grocery);

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
	console.log(attributes);
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

		var markets = L.layerGroup([grocery, supermarket, hypermarket, all]);
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
function getWalk(map, n){
	// var WalkBoston = "";
	// var WalkChicago = "";
	// var WalkSeattle = "";

	Walk = {};

	if (n == 3) {
		$.ajax("data/Boston_WalkBuffer.geojson", {
			dataType: "json",
			success: function(response){
				WalkBoston = new L.geoJson(response, {
					style: walkbufferStyle
				});
				WalkBoston.addTo(map);
>>>>>>> origin/master
			}
		}).addTo(map3);

		// Loading buffers into the script to be used for other actions
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

<<<<<<< HEAD
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
=======
	} else if (n == 2) {
		$.ajax("data/Chicago_WalkBuffer.geojson", {
			dataType: "json",
			success: function(response){
				WalkChicago = new L.geoJson(response, {
					style: walkbufferStyle
				}); //.addTo(map);

				WalkChicago.addTo(map);
			}
		});

	} else if (n == 1) {
		$.ajax("data/Seattle_WalkBuffer.geojson", {
			dataType: "json",
			success: function(response){

				console.log(response);
				WalkSeattle = new L.geoJson(response, {
					style: walkbufferStyle
				});

				console.log("WalkSeattle layer info");
				console.log(WalkSeattle);
				WalkSeattle.addTo(map);
			}
		});

>>>>>>> origin/master
	};

function updateLayers(){
	changeTransportation();
	changeMarket();
};

<<<<<<< HEAD
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
		// LOOK AT FOR TYPE ERROR?
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
		// LOOK AT FOR TYPE ERROR?
		map1.addLayer(GSSeattle);
		map1.addLayer(SMSeattle);
		map1.addLayer(HMSeattle);
		map2.addLayer(GSChicago);
		map2.addLayer(SMChicago);
		map2.addLayer(HMChicago);
		map3.addLayer(GSBoston);
		map3.addLayer(SMBoston);
		map3.addLayer(HMBoston);
=======
// Creating a function that loads the bicycle routes for each map
function getBike(map, n){

	if (n == 3) {
		$.ajax("data/Boston_BicycleBuffer.geojson", {
			dataType: "json",
			success: function(response){
				BikeBoston = new L.geoJson(response, {
					style: bikebufferStyle
				});
				BikeBoston.addTo(map);
			}
		});
		return BikeBoston;
	} else if (n == 2) {
		$.ajax("data/Chicago_BicycleBuffer.geojson", {
			dataType: "json",
			success: function(response){
				BikeChicago = new L.geoJson(response, {
					style: bikebufferStyle
				});
				BikeChicago.addTo(map);
			}
		});
		return BikeChicago;
	} else if (n == 1) {
		$.ajax("data/Seattle_BicycleBuffer.geojson", {
			dataType: "json",
			success: function(response){
				BikeSeattle = new L.geoJson(response, {
					style: bikebufferStyle
				});
				BikeSeattle.addTo(map);
			}
		});
		return BikeSeattle;
>>>>>>> origin/master
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

<<<<<<< HEAD
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
=======
/* Creating a funcion that loads the commuter rail lines and service area buffers
 for each of the maps */
function getRail(map, n){
	if (n == 3) {
		$.ajax("data/Boston_RailBuffer.geojson", {
			dataType: "json",
			success: function(response){
				RailBoston = new L.geoJson(response, {
					style: railbufferStyle
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
>>>>>>> origin/master
			}
		});
		HMBoston.addTo(map3);

<<<<<<< HEAD
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
=======
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
//code to create legend and append to panel div
}

$(document).ready(initialize);
>>>>>>> origin/master
