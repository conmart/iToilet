let skip = 0;
let limit = 5;
let lengthOfToilets;
let ratingLimit = 1;
let scope = 0;




$(document).ready(function () {
  $('select').material_select();
  $('.modal').modal();
    // initMap();
  //grabs everything in the database and displays the content next to the map


  $.ajax({
    method: "GET",
    url: '/api/allToilets',
    success: function (length) {
      console.log(length);
      lengthOfToilets = length;
      console.log('front end lengthOfToilets', lengthOfToilets);
    }
  })


  renderPage();




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
          success: function(data) {
              console.log("success");
              lengthOfToilets++;
              renderToilet(data);
              //     console.log(returnData)
                  var marker = new google.maps.Marker({
                      position: {lat: data.lat, lng: data.long},
                      map: map,
                      title: data.name,
                  });
          }
      });
      });

    //handles the toggling between toilet description and editing toilets
  $('.modal-bodies').on('click', '.edit-button', handleEditToggle);

  $('.modal-bodies').on('click', '.delete-button', handleDelete);

  $('.modal-bodies').on('click', '.review-button', handleReviewToggle);
  $('.modal-bodies').on('click', '.add-review-button', handleAddReview);

  $('.modal-bodies').on('click', '.delete-review', handleDeleteReview);


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
        success: renderPage,
    });
    toiletId.find(".before-edit").toggle()
    toiletId.find(".edit-form").toggle();
    $(modalClose).modal('close');
  })



  $('.filter-toilets').on('submit', function(event) {
    event.preventDefault();
    // console.log('filtering for toilets with min rating of', $('.filter-rating')[1].value);
    ratingLimit = $('.filter-rating')[1].value;
    console.log('toilet scope', $('.filter-toilet-scope')[1].value);
    let scopeResult = $('.filter-toilet-scope')[1].value;
    console.log('scope result is', scopeResult);
    if (scopeResult == 1) {
      scope = 0;
    } else if (scopeResult == 2) {
      scope = true;
    } else if (scopeResult == 3) {
      scope = false;
    }
    console.log('scope is now', scope);
    renderPage();

  })

  // Flips to next page of results
  $('.next-button').on('click', function () {
    // console.log('next click length', lengthOfToilets);
    if (skip === 0) {
      $('.previous-button').toggle();
    }
    skip += limit;
    if (skip + limit >= lengthOfToilets) {
      $('.next-button').toggle();
    }
    renderPage();
  })

  //Flips to previous page of results
  $('.previous-button').on('click', function () {
    // console.log('next click length', lengthOfToilets);
    skip -= limit;
    if (skip === 0) {
      $('.previous-button').toggle();
    }
    if ($('.next-button').is(":hidden")) {
      $('.next-button').toggle();
    }
    renderPage();
  })





  // end of document ready
})
//TESTING THIS
//Handles New Page Render
function renderPage () {
  $.ajax({
    method: "GET",
    url: `/api/toilets/${skip}/${ratingLimit}/${scope}`,
    success: function(data) {
        renderToiletList(data);
        initMap();
        data.forEach(function (returnData) {
            var marker = new google.maps.Marker({
                position: {lat: returnData.lat, lng: returnData.long},
                map: map,
                title: returnData.name,
            });
        })
    }
  })
}



//handles toilet description/edit toggling
function handleEditToggle() {
  let $thisToilet = $(this).closest('.toilet');
  $thisToilet.find(".before-edit").toggle();
  $thisToilet.find(".edit-form").toggle();
}

function handleDelete() {
  lengthOfToilets -= 1;
  let grabToilet = $(this).closest('.toilet')
  console.log(grabToilet);
  let toiletId = grabToilet.data('toilet-id');
  console.log('toilet id to be passed', toiletId);
  $.ajax({
      method: "DELETE",
      url: "/api/toilets/" + toiletId,
      success: renderPage
  });
  let modalClose = '#'+toiletId;
  $(modalClose).modal('close');

}

// Handles showing review form
function handleReviewToggle() {
  let $thisToilet = $(this).closest('.toilet');
  $thisToilet.find(".before-edit").toggle();
  $thisToilet.find(".review-form").toggle();
}

//Handles submiting review form
function handleAddReview() {
  let $thisToilet = $(this).closest('.toilet');
  let toiletId = $thisToilet.data('toilet-id');
  // console.log(toiletId);
  let descriptionSelector = '#review-description-' + toiletId;
  // console.log('review description', $(descriptionSelector).val());
  // console.log('review rating', $thisToilet.find('.review-rating')[0].value);
  let postURL = "api/reviews/" + toiletId;
  // console.log(postURL);
  $.ajax({
    method: "POST",
    url: postURL,
    data: {
      rating: $thisToilet.find('.review-rating')[0].value,
      description: $(descriptionSelector).val()
    },
  })
  .then(function (updatedToilet) {
    // console.log('received toilet', updatedToilet);
    let modalClose = '#'+toiletId;
    $(modalClose).modal('close');

    let toiletModalTrigger = '.trigger-for-' + toiletId;
    // Deletes modal body
    $('[data-toilet-id =' + toiletId + ']').remove();
    // Deletes modal trigger
    $(toiletModalTrigger).remove();

    renderToilet(updatedToilet);
  })
  .catch(function(err) {
    console.log('Ajax review post error', err);
  });
}

function handleDeleteReview () {
  let $thisReview = $(this).closest('.review');
  let reviewId = $thisReview.data('review-id');
  $.ajax({
    method: "DELETE",
    url: "/api/reviews/" + reviewId,
    success: function() {
      // console.log("Delete review success");
      $('[data-review-id =' + reviewId + ']').remove();

    }
  })

}





//google map api
let map;
function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: new google.maps.LatLng(37.78, -122.44),
      });
}
//need to get markers onto map
// function renderGoogleMarkers(data) {
//     // console.log(data);
//     data.forEach(function(returnData) {
//         console.log(returnData)
//         var marker = new google.maps.Marker({
//             position: {lat: returnData.lat, lng: returnData.long},
//             map: map,
//             title:"Hello World!",
//         });
//     })
// }

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
  let toiletId = toilet._id;

  //creates hompage triggers for corresponding toilet modals
  let modalTrigger = `
    <li><a class="waves-effect waves-light modal-trigger modal-edit trigger-for-${toiletId}" href="#${toiletId}">${toilet.name} Toilet</a></li>
  `;
  $('.list-toilets').prepend(modalTrigger);

  let images = [];

  // Reviews default
  let reviewsHTML = "No Reviews Yet :("

  // Looks for reviews and adds them to their corresponding modals
  $.ajax({
    method: "GET",
    url: '/api/reviews/' + toiletId
  })
  .then(function(receivedReviews) {
    // console.log('Reviews that came back', receivedReviews);
    if (receivedReviews.length > 0) {
      let reviewsArray = []
      //Formats reviews as HTML
      receivedReviews.forEach(function (review) {
        let format = `<li class="review" data-review-id="${review._id}">
          <h4>${review.rating} Star Review: "${review.description}" - Posted: ${review.date}</h4>
          <button class="delete-review">Delete Review</button>
          </li>`;
        reviewsArray.push(format);
      })
      reviewsHTML = reviewsArray.join("");
      // console.log('New Reviews HTML', reviewsHTML);
      let $target = $('[data-toilet-id =' + toiletId + ']').find('.reviews-here');
      $target.html(reviewsHTML);
    }
  })
  .catch(function(err) {
    console.log(err);
  })

  // Formats all the pictures tied to a toilet into an HTML-friendly block
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
                  <ol class ="reviews-here">
                    ${reviewsHTML}
                  </ol>

                <div class="modal-footer">
                  <a class="waves-effect waves-light btn edit-button">Edit</a>
                  <a class="waves-effect waves-light btn delete-button">Delete</a>
                  <a class="waves-effect waves-light btn review-button">Write Review</a>
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

              <!--End of edit form, beginning of review form-->

              <form class="col s12 review-form">
                <div class="row">
                  <div class="col s6">
                    <label edit-form>Rate the toilet</label>
                    <select class="review-rating review-form">
                      <option value="1">&#9733;</option>
                      <option value="2">&#9733;&#9733;</option>
                      <option value="3">&#9733;&#9733;&#9733;</option>
                      <option value="4">&#9733;&#9733;&#9733;&#9733;</option>
                      <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
                    </select>

                  </div>
                  <div class="input-field col s6">
                    <input id="review-description-${toiletId}" type="text" class="add-name">
                    <label for="review-description-${toiletId}">Review</label>
                  </div>
                </div>

                <div class="modal-footer">
                  <a class="waves-effect waves-light btn add-review-button">Add Review</a>
                </div>



              </form>
                </div>



`


    $('.modal-bodies').prepend(modalBody);
    $('.modal').modal();
}
