console.log("app.js connected");

$(document).ready(function () {
  $('.modal').modal();
  initMap();

  $.ajax({
    method: "GET",
    url: '/api/toilets',
    success: renderToiletList,
  });












  // end of document ready
})


function initMap() {
  let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(37.78, -122.44),
      });
}

function renderToiletList (list) {
  list.forEach(function (toilet) {
    renderToilet(toilet);
  })

}

function renderToilet (toilet) {
  let modalTrigger = `
    <li><a class="waves-effect waves-light modal-trigger" href="#testModal">${toilet.name} Toilet</a></li>
  `;
  $('.list-toilets').append(modalTrigger);

  let images = [];

  toilet.pictures.forEach(function (picture) {
    let imageHTML = `<img src="${picture}">`
    images.push(imageHTML);
  });

  let allImagesHTML = images.join("");
  console.log(allImagesHTML);


  let modalBody = `
              <div id="testModal" class="modal toilet">
                <div class="modal-content">
                  <div class="row">
                    <div class="toilet-info col s5">
                      <h4>Pier 7 Toilet</h4>
                      <ul>
                        <li>Rating: 5</li>
                        <li>Address: Pier 7</li>
                        <li>Public</li>
                        <li>Price: Free</li>
                        <li>Availability: Medium</li>
                        <li>Amount of Toilets: 1</li>
                      </ul>
                    </div>
                    <div class="toilet-pics col s4">
                      ${allImagesHTML}
                    </div>
                </div>
                  <ol>
                    <li>Review 1</li>
                    <li>Review 2</li>
                  </ol>
                </div>
                <div class="modal-footer">

                </div>
              </div>`
    $('.modal-bodies').append(modalBody);
    $('.modal').modal();

}
