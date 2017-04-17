/* JavaScript by Jon Fok, 2017 */

var current = ""

//Initializing the function called when the script loads
function initialize(){
	createMap();
};

// Creating a function to instantiate the map with Leaflet
function createMap(){
  var map = L.map('mapid', {
    center: [41.8781,-86.6298],
    zoom: 9
  });

	// Adding the CARTO base tilelayer
	L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
		attribution: 'CARTO'
		}).addTo(map);

		// Calling the getData function to operate
    getSNAPData(map);
		// getRailLines(map);
};

// Defining the getData function to retrive the data Seattle_PublicTransportation geojson
// data and placing the data on the map
//
// function getColor(d){
// 	return d > 5.1985 ? "#a63603":
// 	return d > 1.6477 ? "#e6550d":
// 	return d > 0.0977 ? "#fd8d3c":
// 	return d > -1.0660 ? "#fdbe85":
// 	 										"#feedde";
// }




// Loading geoJSON layers for the the maps
function getSNAPData(map){
	// Importing the GeoJSON data
  $.ajax("data/Chicago_SNAPFoodRetail.geojson", {
    dataType: "json",
    success: function(response){
			// Creating the marker options
			var MarkerOptions = {
				radius: 3,
				fillColor: "#2b8cbe",
				color: "#000",
				weight: 1,
				opacity: 1,
				fillOpacity: 0.8
				};

			L.geoJson(response, {
        pointToLayer: function (feature, latlng){
          return L.circleMarker(latlng, MarkerOptions);
        }
				// filter: function (feature, layer){
				// 	return feature.properties.TYPE = "Grocery Store";
				// }
      }).addTo(map);
			// var attributes = processData(response);
			// createPropSymbols(response, map, attributes);
			// createSequenceControls(map, attributes);
			// createLegend(map, attributes);
    }
  });
};

// function getColor(d){
// 	return d = "BL" ? "#3182bd" :
// 				 d = "RD" ? "de2d26" :
// 				 d = "PR" ?  "756bb1" :
// 				 d = "BR" ?  "d95f0e" :
// 				 d = "GR" ?  "31a354" :
// 				 d = "OR" ?  "fdbb84" :
// 				 d = "PK" ?  "fa9fb5" :
// 				 d = "YL" ?  "ffeda0" :
// 											"636363";
// };
//
// function getRailLines(map){
// 	$.ajax("data/Chicago_RailLines.geojson", {
// 		dataType: "json",
// 		success: function(response){
// 			// var LineStyle = {
// 			// 	"color": "#ff7800",
// 			// 	"weight": 5,
// 			// 	"opacity": 0.65
// 			// };
// 			console.log(response.features);
//
// 			L.geoJson(response,{
// 				style: function(feature) {
// 					return {
// 						"color": getColor(feature.properties.LEGEND),
// 						"opacity": 1
// 					}
// 				}
// 			}).addTo(map);
// 			console.log(response.properties);
// 		}
// 	});
// };

//Loading buslines, bike lanes
//Loading buffers
//Loading demographics layers




$(document).ready(initialize);
