console.log("app.js connected");

$(document).ready(function () {


console.log('jQuery connected');


  $('.modal').modal();
  initMap();






  // end of document ready
})


function initMap() {
  let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(37.78, -122.44),
      });
}
