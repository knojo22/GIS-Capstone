



function initialize(){
	createMap();
	loadlayer();

};
var map ;
// Creating a function to instantiate the map with Leaflet
function createMap(){
	map= L.map('mapid', {
		center: [41.8781,-87.6298],
		zoom: 10
	});

	L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
		          attribution: 'CARTO'
		        }).addTo(map);

// 	var basemap ={
//
// };
// 	// var overlays ={
//
// };

	// L.control.layers(basemap, overlays).addTo(map);
	//
	// // var layers =




		// Calling the getData function to operate

		// getRailLines(map);
};


function changeTransportation(){

	//alert("change transportaiton");

	var e = document.getElementById("modechoice");
	var transportationmode = e.options[e.selectedIndex].value;

	//alert(transportationmode);

	// console.log(transportationmode);
	if(transportationmode == "Walk"){
		// var walk = getRoadways(map);
		var remove = $("div").remove(".modechoice");
		console.log("working?");
	} else if (transportationmode =="Bicycle"){
		var remove = $("div").remove(".modechoice");
		var bicycle = getBikeRoutes(map);
	} else if (transportationmode == "Rail"){
		var remove = $("div").remove(".modechoice");
		var rail = getRailLines(map);
		var railbuffer = getRailBuffer(map);
	} else {
		var remove = $("div").remove(".modechoice");
		var bus = getBusRoutes(map);
		var busbuffer = getBusBuffer(map);
	}

};

function changeMarket(){
	var e = document.getElementById("foodmarket");
	var foodmarket = e.options[e.selectedIndex].value;

	if (foodmarket == "Grocery Store"){
			var markets = getSNAPData(map);
	}

	//
}
function loadlayer(){

// load transportation layer
changeTransportation();
changeMarket();

//var censustracts = getCensusTracts(map);

//var busbuffer = getBusBuffer(map);
//
};

function getCensusTracts(map){
	$.ajax("data/Chicago_CT.geojson", {
		dataType: "json",
		success: function(response){
			console.log(response);
			createCensusTracts(response, map);
		}
	});
};

function getCTColor(d){
	return d >= 3.65 ? "#ca0020":
				 d >= 0.71 && d < 3.65 ? "#f4a582":
				 d >= -0.91 && d < 0.71 ? "#92c5de":
				 d < -0.91 ? "#0571b0":
				 				 "#969696";
};

//Creating the line symbols based upon the rail lines.
function createCensusTracts(data, map){
	var attribute = "PC1"

	L.geoJson(data, {
		style: function(feature){
			var attValue = feature.properties[attribute];
			return {
			"color": "#999",
			"weight": 1,
			"fillColor": getCTColor(feature.properties[attribute]),
			"fillopacity": 0.8,
			};
		}
	}).addTo(map);
};

//Loading the retail food markets that accept SNAP in Chicago
function getSNAPData(map){
    $.ajax("data/Chicago_SNAPFoodRetail.geojson", {
			dataType: "json",
			success: function(response){
				console.log(response);
				createPropSymbols(response, map);
			}
  });
};

function createPropSymbols(data, map){
    //create marker options
		var attribute = "Type"
		function colors(x){
			return x == "Grocery Store" ? "#3182bd":
						 x == "Supermarket" ? "#de2d26":
						 x == "Hypermarket" ? "#31a354":
						 				 						 "#969696";
		};

    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
						var attrValue = feature.properties[attribute];
            return L.circleMarker(latlng, {
							radius: 3,
							fillColor: colors(feature.properties[attribute]),
							weight: 1,
							opacity: 1,
							fillOpacity: 0.4
						})
        }
    }).addTo(map);
};

//Loading the L train lines
function getRailLines(map){
	$.ajax("data/Chicago_RailLines.geojson",
		{dataType: "json",
		success: function(response){
				console.log(response);
				createLineSymbols(response, map);
		}
	});
};

function getRailLineColor(x){
	return x == "BL" ? "#3182bd":
				 x == "RD" ? "#de2d26":
				 x == "GR" ? "#31a354":
				 x == "BR" ? "#993404":
				 x == "OR" ? "#fd8d3c":
				 x == "PK" ? "f768a1":
				 x == "PR" ? "#7a0177":
				 x == "YL" ? "#ffffb2":
				 						 "#969696";
};

//Creating the line symbols based upon the rail lines.
function createLineSymbols(data, map){
	var attribute = "LEGEND"

	L.geoJson(data, {
		style: function(feature){
			var attValue = feature.properties[attribute];
			return {
			"color": getRailLineColor(feature.properties[attribute]),
			"opacity": 0.8,
			};
		}
	}).addTo(map);
};

//Loading the Bicycle Routes
function getBikeRoutes(map){
	var bikeStyle = {
		"color": "#ff7800",
		"weight": 1,
		"opacity": 1,
	};

	$.ajax("data/Chicago_BicycleRoute.geojson", {
		dataType: "json",
		success: function(response){
				console.log(response);
				L.geoJson(response, {
					style: bikeStyle
				}).addTo(map);
			}
	});
};

//Loading the Roadways
function getRoadways(map){
	$.ajax("data/Chicago_Roadways.geojson",
		{dataType: "json",
		success: function(response){
				console.log(response);
				createLineSymbols2(response, map);
		}
	});
};

function getRoadwayColor(x){
	return x == "1" ? "#3182bd":
				 x == "2" ? "#de2d26":
				 x == "3" ? "#31a354":
				 x == "4" ? "#993404":
				 						 "#969696";
};

//Creating the line symbols based upon the rail lines.
function createLineSymbols2(data, map){
	var attribute = "class"

	L.geoJson(data, {
		style: function(feature){
			var attValue = feature.properties[attribute];
			return {
			"color": getRoadwayColor(feature.properties[attribute]),
			"opacity": 0.8,
			}
		}
	}).addTo(map);
};



function getRailBuffer(map){
	$.ajax("data/Chicago_RailBuffer.geojson",{
		dataType: "json",
		success: function(response){
			L.geoJson(response).addTo(map);
		}
	});
}

function getBusRoutes(map){
	var busStyle = {
		"color": "#969696",
		"weight": 2,
		"opacity": 2,
	};

	$.ajax("data/Chicago_BusRoutes1.geojson", {
		dataType: "json",
		success : function(response){
			console.log(response);
			L.geoJson(response, {
				style: busStyle
			}).addTo(map);
		}
	});
};

function getBusBuffer(map){
	$.ajax("data/Chicago_BusBuffer.geojson", {
		dataType: "json",
		success: function(response){
			console.log(response);
			L.geoJson(response).addTo(map);
		}
	});
};

// function getCensusTracts(map){
// 	$.ajax("data/Chicago_CT.geojson",
// 		{dataType: "json",
// 		success: function(response){
// 				L.geoJson(response).addTo(map);
// 		}
// 	});
// };
$(document).ready(initialize);
