function initMap() {
  // The location of Uluru
  const hk = { lat: 22.419276567941044, lng: 114.14534888698095 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: hk,
  });

  var latLngArr = [];   // manage maker latLng
  var marker = new Map();
  map.addListener("click", (e) => {
    latLngArr.push(e.latLng); 
    reflesh(e.latLng, latLngArr, map);
  });
}
window.initMap = initMap;
 
function reflesh(latLng, latLngArr, map) {
  placeMarkerAndPanTo(latLng, map);
  showPolygon(map, latLngArr);
  updatePlanel(latLngArr);
}

function placeMarkerAndPanTo(latLng, map) {
  new google.maps.Marker({
    position: latLng,
    map: map,
  });
}

function updatePlanel(latLngArr) {
  document.getElementById("textarea").value = textprocessor(latLngArr);
}

function textprocessor(latLngArr) {
  return latLngArr.join("|").toString().replaceAll(/[()]/g, "");
}

function showPolygon(map, latLngArr) {
  const polygon = new google.maps.Polygon({
    paths: latLngArr,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FFFF00",
    fillOpacity: 0.35,
    clickable: false,
  });
  polygon.setMap(map);
}
