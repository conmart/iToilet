$(document).ready(function () {
  $('select').material_select();
  initMap();

  //grabs everything in the database and displays the content next to the map
  $.ajax({
    method: "GET",
    url: '/api/toilets',
    success: renderToiletList,
  });


//handles adding new toilets
  $('.new-toilet-form').on('submit', function(event) {
      event.preventDefault();

      $.ajax({
          method: "POST",
          url: "api/toilets",
          data: {
              name: $('.add-name').val(),
              address: $('.add-address').val(),
              price: $('.add-price').val(),
              rating: $('.add-rating')[1].value,
              public: $('#switch-id').prop('checked'),
              availability: $("input[name=group1]:checked").val(),
              amount: $('.add-amount').val(),
              pictures: $('.add-picture').val(),
          },
          success: function () {
              $.ajax({
                  method: "GET",
                  url: '/api/toilets',
                  success: renderToiletList,
              });
          }
      });
      });

    //handles the toggling between toilet description and editing toilets
  $('.modal-bodies').on('click', '.edit-button', handleEditToggle);

  $('.modal-bodies').on('click', '.delete-button', handleDelete);

  //handles the save functionality and also the toggling between toilet description/edit
  $(document).on("click", ".save-button", function() {
    let toiletId = $(this).closest('.toilet');
    let toiletIdValue = toiletId.data('toilet-id');
    let modalClose = '#'+toiletId.data('toilet-id');
    console.log(toiletId.find('.edit-privacy').prop('checked'))
    $.ajax({
        method: "PUT",
        url: "/api/toilets/" + toiletIdValue,
        data: {
            id: toiletId.data('toilet-id'),
            name: toiletId.find('.edit-name').val(),
            address: toiletId.find('.edit-address').val(),
            // rating: toiletId.find('.edit-rating')[1].value,
            price: toiletId.find('.edit-price').val(),
            public: toiletId.find('.edit-privacy').prop('checked'),
            amount: toiletId.find('.edit-amount').val(),
        },
        success: function() {
            $.ajax({
                method: "GET",
                url: '/api/toilets',
                success: renderToiletList,
            });
        },
    });
    toiletId.find(".before-edit").toggle()
    toiletId.find(".edit-form").toggle();
    $(modalClose).modal('close');
  })





  // end of document ready
})

//handles toilet description/edit toggling
function handleEditToggle() {
  let $thisToilet = $(this).closest('.toilet');
  $thisToilet.find(".before-edit").toggle();
  $thisToilet.find(".edit-form").toggle();
}

function handleDelete() {
  let grabToilet = $(this).closest('.toilet')
  let toiletId = grabToilet.data('toilet-id');
  $.ajax({
      method: "DELETE",
      url: "/api/toilets/" + toiletId,
      success: function() {
          $.ajax({
              method: "GET",
              url: '/api/toilets',
              success: renderToiletList,
          });
      }
  });
  let modalClose = '#'+toiletId;
  $(modalClose).modal('close');

}

//google map api
function initMap() {
  let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(37.78, -122.44),
      });
}

//goes through each toilet in the database and inputs them into renderToilet
function renderToiletList (list) {
  $('.list-toilets').empty();
  list.forEach(function (toilet) {
    renderToilet(toilet);
  })
  $('.modal').modal();
}

//creates the structure of the modals description/save for the individual toilet
function renderToilet (toilet) {
  let modalTrigger = `
    <li><a class="waves-effect waves-light modal-trigger modal-edit" href="#${toilet._id}">${toilet.name} Toilet</a></li>
  `;
  $('.list-toilets').append(modalTrigger);

  let images = [];

  toilet.pictures.forEach(function (picture) {
    let imageHTML = `<img src="${picture}">`
    images.push(imageHTML);
  });

  let allImagesHTML = images.join("");

  let public = "Public";
  let price = "Free";

  if (toilet.public === false) {
    public = "Private";
    price = toilet.price;
  }

  let modalBody = `
              <div id="${toilet._id}" class="modal toilet" data-toilet-id="${toilet._id}">
                <div class="modal-content before-edit">
                  <div class="row">
                    <div class="toilet-info col s5">
                      <h4>${toilet.name} Toilet</h4>
                      <ul>
                        <li>Rating: ${toilet.rating}</li>
                        <li>Address: ${toilet.address}</li>
                        <li>${public}</li>
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
              
                <div class="modal-footer">
                  <a class="waves-effect waves-light btn edit-button">Edit</a>
                  <a class="waves-effect waves-light btn delete-button">Delete</a>
                </div>
                </div>
                
                <!--Beginning of edit form-->
                
                <form class="col s12 new-toilet-form edit-form">
              <div class="row">
                <div class="input-field col s6">
                  <input type="text" class="edit-name" value="${toilet.name}">
                  <label class="active" for="edit-name">Name</label>
                </div>
                <div class="input-field col s6">
                  <input type="text" class="edit-address" value="${toilet.address}">
                  <label class="active" for="edit-address">Address</label>
                </div>
              </div>
              <div class="row">
                <div class="col s6">
                  <label edit-form>Rate the toilet</label>
                  <select class="edit-rating edit-form">
                    <option value="1">&#9733;</option>
                    <option value="2">&#9733;&#9733;</option>
                    <option value="3">&#9733;&#9733;&#9733;</option>
                    <option value="4">&#9733;&#9733;&#9733;&#9733;</option>
                    <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
                  </select>
                 
                </div>
                <div class="input-field col s6">
                  <input class="edit-price" type="number" value="${toilet.price}"}>
                  <label class="active" for="edit-price">Price</label>
                </div>
              </div>
              
              <div class="row">
                  <div class="col s6">
                    <div class="switch">
                      <label>
                        Private
                        <input class="switch-id edit-privacy" type="checkbox" value="Private">
                        <span class="lever"></span>
                        Public
                      </label>
                    </div>
                  </div>
                <div class="col s6 edit-radio-form">
                      <label class="radio-buttons" for="edit-avail-1-${toilet._id}">Availability of Toilets</label>
                      </br>
                      <input id="edit-avail-1-${toilet._id}" class="with-gap edit-avail-1" name="group1" type="radio" value="low" />
                      <label class="radio-buttons" for="edit-avail-1-${toilet._id}">Low</label>
                      <input id="edit-avail-2-${toilet._id}" class="with-gap edit-avail-2" name="group1" type="radio" value="medium"/>
                      <label class="radio-buttons" for="edit-avail-2-${toilet._id}">Medium</label>
                      <input id="edit-avail-3-${toilet._id}" class="with-gap edit-avail-3" name="group1" type="radio" value="high"/>
                      <label class="radio-buttons" for="edit-avail-3-${toilet._id}">High</label>
                </div>
                </div>
                
                <div class="row">
                <div class="input-field col s6">
                  <input class="edit-amount" type="number" value="${toilet.amount}">
                  <label class="active" for="edit-amount">Number of Toilets</label>
                </div>
                <div class="modal-footer">
                  <a class="waves-effect waves-light btn save-button">Save</a>
                </div>
              </div>
              </form>
                </div>
`


    $('.modal-bodies').append(modalBody);
    $('.modal').modal();
}
