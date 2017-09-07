$(document).ready(function () {
  $('select').material_select();
  initMap();

  $.ajax({
    method: "GET",
    url: '/api/toilets',
    success: renderToiletList,
  });



  $('.new-toilet-form').on('submit', function(event) {
      event.preventDefault();
      // console.log($('.add-name').val());
      // console.log($('.add-address').val());
      // console.log($('.add-name').val());

      //this returns the availability value
      // console.log($("input[name=group1]:checked").val())

      //this returns the value of the rating
      // console.log($('.add-rating')[1].value);

      //this returns false if public, true if private
      // console.log($('#switch-id').prop('checked'));

      // console.log($('.add-picture').val());

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
        }
      });
      });

  $(document).on("click", ".before-edit", function() {
    $(".before-edit").toggle()
    $(".edit-form").toggle();
  });

  $(document).on("click", ".save-button", function() {
    let toiletId = $(this).closest('.toilet');
    let modalClose = '#'+toiletId.data('toilet-id')
    // $('.switch').prop("disabled", false);
    // $('select').material_select();
    $.ajax({
        method: "PUT",
        url: "/api/toilets/" + toiletId,
        data: {
            id: toiletId.data('toilet-id'),
            name: toiletId.find('.edit-name').val(),
            address: toiletId.find('.edit-address').val(),
            // rating: toiletId.find('.edit-rating')[1].value,
            price: toiletId.find('.edit-price').val(),
            public: toiletId.find('.edit-privacy').prop('checked'),
            amount: toiletId.find('.edit-amount').val(),
        },
        // success: renderToiletList
    });
    $(modalClose).modal('close');
      $.ajax({
          method: "GET",
          url: '/api/toilets',
          success: renderToiletList,
      });
  })





  // end of document ready
})



function initMap() {
  let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(37.78, -122.44),
      });
}

function renderToiletList (list) {
  $('.list-toilets').empty();
  list.forEach(function (toilet) {
    renderToilet(toilet);
  })
  $('.modal').modal();
}




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
  // console.log(allImagesHTML);

  let public = "Public";
  let price = "Free";
  if (toilet.public !== true) {
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
              
                <div class="modal-footer">
                  <a class="waves-effect waves-light btn edit-button">Edit</a>
                </div>
                </div>
                
                <!--Beginning of edit form-->
                
                <form class="col s12 new-toilet-form edit-form">
              <div class="row">
                <div class="input-field col s6">
                  <input type="text" class="edit-name">
                  <label for="edit-name">Name</label>
                </div>
                <div class="input-field col s6">
                  <input type="text" class="edit-address">
                  <label for="edit-address">Address</label>
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
                  <input class="edit-price" type="number"}>
                  <label for="edit-price">Price</label>
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
                <div class="col s6">
                      <input id="edit-avail-1-${toilet._id}" class="with-gap edit-avail-1" name="group1" type="radio" value="low" />
                      <label class="radio-buttons" for="edit-avail-1-${toilet._id}">Low</label>
                      <input class="with-gap edit-avail-2-${toilet._id}" name="group1" type="radio" value="medium"/>
                      <label class="radio-buttons" for="edit-avail-2-${toilet._id}">Medium</label>
                      <input class="with-gap edit-avail-3-${toilet._id}" name="group1" type="radio" value="high"/>
                      <label class="radio-buttons" for="edit-avail-3-${toilet._id}">High</label>
                </div>
                </div>
                
                <div class="row">
                <div class="input-field col s6">
                  <input class="edit-amount" type="number">
                  <label for="edit-amount">Number of Toilets</label>
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
