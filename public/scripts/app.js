// You should never have global variables like this
// At the VERY least, you should have it after your document.ready(function() {...
// Ideally, you would include these variables in the function that they are used

// NOTE: If you are using these variables in multiple functions all over the place, you should refactor.
// That is recipe for spaghetti code
let skip = 0;
let limit = 5;
let lengthOfToilets;
let ratingLimit = 1;
let scope = 0;
let resultsLength = 0;

$(document).ready(function () {
  $('select').material_select();
  $('#modal1').modal({
    complete: function() { $(this).find('form').reset(); }
  });
  $('.modal').modal();

  renderNewPage();

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
          success: function() {
            $('#create-toilet-form').trigger('reset');

            renderNewPage();
          }
        })
      });

  // Contain all these JQuery functions inside an appropriately named function
  // instead of using a comment to describe what they're doing
  // and having these jquery lines just floating around in your app.js globally
  // e.g. function handleDisplayAndEditToiletsToggle () { ...your on clicks here...}
  // And then invoke handleDisplayAndEditToiletsToggle();
  $('.modal-bodies').on('click', '.edit-button', handleEditToggle);
  $('.modal-bodies').on('click', '.delete-button', handleDelete);
  $('.modal-bodies').on('click', '.review-button', handleReviewToggle);
  $('.modal-bodies').on('click', '.add-review-button', handleAddReview);
  $('.modal-bodies').on('click', '.delete-review', handleDeleteReview);

  // no comments!! group code into a function and name them intuitively
  // e.g. $(document).on("click", ".save-button", saveToiletAndToggle);
  // and define function saveToiletAndToggle() {...your code here...}
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
            availability: $("input[name=group1]:checked").val(),
            // rating: toiletId.find('.edit-rating')[1].value,
            price: toiletId.find('.edit-price').val(),
            public: toiletId.find('.edit-privacy').prop('checked'),
            amount: toiletId.find('.edit-amount').val(),
        },
        success: renderNewPage,
    });
    toiletId.find(".before-edit").toggle()
    toiletId.find(".edit-form").toggle();
    $(modalClose).modal('close');
  })

  // Same thing – do not pass an anonymous function
  // Define a function something like filterToiletsBasedOnScopeAndRating
  // and write $('.filter-toilets').on('submit', filterToiletsBasedOnScopeAndRating);
  $('.filter-toilets').on('submit', function(event) {
    event.preventDefault();
    ratingLimit = $('.filter-rating')[1].value;
    let scopeResult = $('.filter-toilet-scope')[1].value;
    if (scopeResult == 1) {
      scope = 0;
    } else if (scopeResult == 2) {
      scope = true;
    } else if (scopeResult == 3) {
      scope = false;
    }
    skip = 0;

    renderNewPage();

    $('.previous-button').hide();
    $('.next-button').show();

  })

  // Same thing - no comments, intuitively named function
  $('.next-button').on('click', function () {
    skip += limit;
    renderNewPage();
  })

  // Same thing - no comments, intuitively named function
  $('.previous-button').on('click', function () {
    skip -= limit;
    renderNewPage();
  })


  // end of document ready
  // IMPORTANT: NOTHING SHOULD BE OUTSIDE DOCUMENT.READY
  // This might not give you any errors now, but in the future, 
  // if you happen to write jQuery outside your document.ready,
  // your app will not have a DOM to append to / handle clicks on.

  // By putting these functions outside document.ready, you're polluting your global scope
  // (similar to the skip, limit, etc variables at the top of this file).
  // Global variables are never a good idea – they aren't encapsulated in a function, 
  // so they could potentially interfere if another variable with the same name is defined globally.

// returnJSON is not being used anywhere

function countToiletsMatchingSearchCriteria() {
  $.ajax({
    method: "GET",
    // if you change your URL in server.js, this is what your request should look like with query parameters
    url: `/api/toilets?ratingLimit={ratingLimit}&scope=${scope}`,
    success: function (length) {
      lengthOfToilets = length.length;
      // ^ lengthOfToilets should not be global
      // You will have to control+F to find all instances where lengthOfToilets is used.
      // As codebase grows, this leads to spaghetti code – difficult to see when/where this variable is being changed
    }
  })
}

// use semantic naming instead of comments
function renderNewPage () {
  countToiletsMatchingSearchCriteria();
  $.ajax({
    method: "GET",
    url: `/api/toilets?skip=${skip}&ratingLimit=${ratingLimit}&scope=${scope}`,
    success: function(data) {
        resultsLength = data.length;
        if ((resultsLength < limit) || (resultsLength + skip == lengthOfToilets)) {
          $('.next-button').hide();
        } else {
          $('.next-button').show();
        }
        if (skip == 0) {
          $('.previous-button').hide();
        } else {
          $('.previous-button').show();
        }

        renderToiletList(data);
        initGoogleMap();
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
      success: renderNewPage
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
  let descriptionSelector = '#review-description-' + toiletId;
  let postURL = "api/reviews/" + toiletId;
  $.ajax({
    method: "POST",
    url: postURL,
    data: {
      rating: $thisToilet.find('.review-rating')[0].value,
      description: $(descriptionSelector).val()
    },
  })
  .then(function (updatedToilet) {
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
  let toiletId = $(this).closest('.toilet');
  let toiletIdValue = toiletId.data('toilet-id');
  $.ajax({
    method: "DELETE",
    url: "/api/reviews/" + reviewId,
    success: function() {
      $('[data-review-id =' + reviewId + ']').remove();
        renderNewPage();
        let modalClose = '#'+toiletId.data('toilet-id');
        $(modalClose).modal('close');
    }
  })

}

let map;
function initGoogleMap() {
  map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
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

// this function is doing way too much and is doing much more than "rendering a toilet"
// should be broken up into separate functions
function renderToilet (toilet) {
  let toiletId = toilet._id;

  //creates hompage triggers for corresponding toilet modals
  let overallRating = displayRatingStars(toilet.rating);
  let modalTrigger = `
    <li><a class="waves-effect waves-light modal-trigger modal-edit trigger-for-${toiletId}" href="#${toiletId}">${toilet.name} Toilet - ${overallRating}</a></li>
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
    if (receivedReviews.length > 0) {
      let reviewsArray = []
      //Formats reviews as HTML
      receivedReviews.forEach(function (review) {
        let shortenedDate = review.date.substring(0, 10);
        let reviewStars = displayRatingStars(review.rating);
        let format = `<li class="review" data-review-id="${review._id}">
          <h5>${reviewStars} <br> "${review.description}" </h5><p> Posted: ${shortenedDate}</p>
          <button class="delete-review">X</button>
          </li>`;
        reviewsArray.push(format);
      })
      reviewsHTML = reviewsArray.join("");
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

  // IMPORTANT – Proper indentation and strategically using new lines to break up your HTML 
  // will ensure your fellow engineers love reading and building on your code.
  // Tell-tale sign of a developer who is detail-oriented / takes pride in clean code
  let modalBody = `
    <div id="${toilet._id}" class="modal toilet" data-toilet-id="${toilet._id}">
      <div class="modal-content before-edit">
        <div class="row">

          <div class="toilet-info col s7">
            <h4>${toilet.name} Toilet</h4>

            <ul>
              <li>Rating: ${overallRating}</li>
              <li>Address: ${toilet.address}</li>
              <li>${public}</li>
              <li>Price: ${price}</li>
              <li>Availability: ${toilet.availability}</li>
              <li>Amount of Toilets: ${toilet.amount}</li>
            </ul>
          </div>

          <div class="toilet-pics col s3">
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
          <div class="input-field col s6">
            <input class="edit-price" type="number" value="${toilet.price}"}>
            <label class="active" for="edit-price">Price</label>
          </div>

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
        </div>

        <div class="row">
          <div class="col s6 edit-radio-form">
            <label class="radio-buttons" for="edit-avail-1-${toilet._id}">Availability of Toilets</label>
            </br>
            <input id="edit-avail-1-${toilet._id}" class="with-gap edit-avail-1" name="group1" type="radio" value="Low" />
            <label class="radio-buttons" for="edit-avail-1-${toilet._id}">Low</label>
            <input id="edit-avail-2-${toilet._id}" class="with-gap edit-avail-2" name="group1" type="radio" value="Medium"/>
            <label class="radio-buttons" for="edit-avail-2-${toilet._id}">Medium</label>
            <input id="edit-avail-3-${toilet._id}" class="with-gap edit-avail-3" name="group1" type="radio" value="High"/>
            <label class="radio-buttons" for="edit-avail-3-${toilet._id}">High</label>
          </div>

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
  `;

  $('.modal-bodies').prepend(modalBody);
  $('.modal').modal();
}

function displayRatingStars (num) {
  if (num <= 1) {
    return '&#9733;'
  } else {
    return ('&#9733;' + displayRatingStars(num -1));
  }
}

// IMPORTANT!! Define all your variables and functions at the top of your document.ready function,
// and then invoke them in order at the buttom of your document.ready function.
// That way, it is clear what exactly your code is doing. 
// The bottom of your document.ready function should be a string of well-named functions being invoked.
// i.e. renderPage(); fetchToilets(); addClickHandlersForEditToiletToggle();
// ^ your fellow engineers will love you!