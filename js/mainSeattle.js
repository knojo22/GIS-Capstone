function initialize(){
	createMap();
};

// Creating a function to instantiate the map with Leaflet
function createMap(){
  var map = L.map('mapid', {
    center: [41.8781,-87.6298],
    zoom: 10
  });

	L.tileLayer('https:api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia25vam8yMiIsImEiOiJjaXl2cW5xa3owMDF0MndwbjliM3cxZjFoIn0.sMpJ7AM4zm5NSPAAXmIVBQ', {
		  maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);

	// L.control.layers(basemap, overlayMaps).addTo(map);

	// var layers =
		getCensusTracts(map);
	  getSNAPData(map);
		getRailLines(map);


		// Calling the getData function to operate

		// getRailLines(map);
};

//Loading the retail food markets that accept SNAP in Chicago
function getSNAPData(map){
    $.ajax("data/Chicago_SNAPFoodRetail.geojson", {
			dataType: "json",
			success: function(response){
				createPropSymbols(response, map);
			}
  });
};

function createPropSymbols(data, map){
    //create marker options
    var geojsonMarkerOptions = {
        radius: 3,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    }).addTo(map);
};

//Loading the L train lines
function getRailLines(map){
	$.ajax("data/Chicago_RailLines.geojson",
		{dataType: "json",
		success: function(response){
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

function getCensusTracts(map){
	$.ajax("data/Chicago_CT.geojson",
		{dataType: "json",
		success: function(response){
				L.geoJson(response).addTo(map);
		}
	});
};
$(document).ready(initialize);
