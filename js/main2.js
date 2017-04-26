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
		railchicago, railboston, buschicago,
		busboston, seattlesnap, chicagosnap, bostonsnap, seattlect, chicagoct, bostonct){
		cts = {};
		walking = {};
		bicycling = {};
		railing = {};
		busing = {};

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

		// Adding buffers to
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

		// changeTransportation();
		// changeMarket();

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
	// changeMarket();
};

function changeTransportation(walkseattle, walkchicago){
	var e = document.getElementById("modechoice");
	var transportationmode = e.options[e.selectedIndex].value;

	if (transportationmode == "Walk"){
		setWalkBuffer(walkseattle, 1);
		setWalkBuffer(walkchicago, 2);

		if (WalkSeattle != "null"){
			map1.addLayer(WalkSeattle);
		} else if (WalkSeattle == 'undefined'){
			setWalkBuffer(walkseattle, 1);
		};

		if (WalkChicago != "null"){
			map2.addLayer(WalkChicago);
		} else if (WalkSeattle == "undefined"){
			setWalkBuffer(walkchicago, 2);
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

};

function setWalkBuffer(data, n){
	if (n == 3){
		WalkBoston = L.geoJson(data, {
				style: walkbufferStyle
			});
			WalkBoston.addTo(map3);
			console.log(WalkBoston);
	} else if (n == 2){
		WalkChicago = L.geoJson(data, {
				style: walkbufferStyle
			});
			WalkChicago.addTo(map2);
			console.log(WalkChicago);
	} else if (n == 1){
		WalkSeattle = L.geoJson(data, {
				style: walkbufferStyle
			});
			WalkSeattle.addTo(map1);
			console.log(WalkSeattle);
	};
};

function setBikeBuffer(data, n){
	if (n == 3){
		BikeBoston = L.geoJson(data, {
				style: bikebufferStyle
			});
			BikeBoston.addTo(map3);
			console.log(BikeBoston);
	} else if  (n == 2){
		BikeChicago = L.geoJson(data, {
				style: bikebufferStyle
			});
			BikeChicago.addTo(map2);
			console.log(BikeChicago);
	} else if (n == 1){
		BikeSeattle = L.geoJson(data, {
				style: bikebufferStyle
			});
			BikeSeattle.addTo(map1);
			console.log(BikeSeattle);
	}
};

function setRailBuffer(data, n){
	if (n == 3){
		RailBoston = L.geoJson(data, {
				style: railbufferStyle
			});
			RailBoston.addTo(map3);
			console.log(RailBoston);
	} else if  (n == 2){
		RailChicago = L.geoJson(data, {
				style: railbufferStyle
			});
			RailChicago.addTo(map2);
			console.log(RailChicago);
	} else if (n == 1){
		RailSeattle = L.geoJson(data, {
				style: railbufferStyle
			});
			RailSeattle.addTo(map1);
			console.log(RailSeattle);
	}
};

function setBusBuffer(data, n){
	if (n == 3){
		BusBoston = L.geoJson(data, {
				style: busbufferStyle
			});
			BusBoston.addTo(map3);
			console.log(BusBoston);
	} else if  (n == 2){
		BusChicago = L.geoJson(data, {
				style: busbufferStyle
			});
			BusChicago.addTo(map2);
			console.log(BusChicago);
	} else if (n == 1){
		BusSeattle = L.geoJson(data, {
				style: busbufferStyle
			});
			BusSeattle.addTo(map1);
			console.log(BusSeattle);
	}
};
$(document).ready(initialize);
