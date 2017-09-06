console.log("app.js connected");

$(document).ready(function () {
  $('select').material_select();
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
  $('.modal').modal();
}

function renderToilet (toilet) {
  let modalTrigger = `
    <li><a class="waves-effect waves-light modal-trigger" href="#${toilet._id}">${toilet.name} Toilet</a></li>
  `;
  $('.list-toilets').append(modalTrigger);

  let images = [];

  toilet.pictures.forEach(function (picture) {
    let imageHTML = `<img src="${picture}">`
    images.push(imageHTML);
  });

  let allImagesHTML = images.join("");
  console.log(allImagesHTML);

  let public = "Public";
  let price = "Free";
  if (toilet.public !== true) {
    public = "Private";
    price = toilet.price;
  }


  let modalBody = `
              <div id="${toilet._id}" class="modal toilet">
                <div class="modal-content">
                  <div class="row">
                    <div class="toilet-info col s5">
                      <h4>${toilet.name} Toilet</h4>
                      <ul>
                        <li>Rating: ${toilet.rating}</li>
                        <li>Address: ${toilet.address}</li>
                        <li>Public: ${public}</li>
                        <li>Price: ${price}</li>
                        <li>Availability: ${toilet.availabilty}</li>
                        <li>Amount of Toilets: ${toilet.amount}</li>
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
}
