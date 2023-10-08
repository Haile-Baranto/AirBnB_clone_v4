$(document).ready(function () {
  // Task 3: Check API status on page load
  function checkApiStatus () {
    $.ajax('http://0.0.0.0:5001/api/v1/status').done(function (data) {
      $('#api_status').toggleClass('available', data.status === 'OK');
    });
  }

  // Task 2: Handle checkbox changes
  function handleCheckboxChange () {
    const amenityIds = {};

    $('.amenity-checkbox').change(function () {
      const amenityId = $(this).data('id');
      const amenityName = $(this).data('name');

      if (this.checked) {
        amenityIds[amenityId] = amenityName;
      } else {
        delete amenityIds[amenityId];
      }

      const amenityList = Object.values(amenityIds).join(', ');
      $('div.amenities h4').text(amenityList || '\u00A0'); // Use a non-breaking space if the list is empty
    });
  }

  // Function to create and append a place article
  function createPlaceArticle (place) {
    const article = $('<article>');

    const titleBox = $('<div>', { class: 'title_box' });
    titleBox.append($('<h2>').text(place.name));
    titleBox.append($('<div>', { class: 'price_by_night' }).text(`$${place.price_by_night}`));

    const information = $('<div>', { class: 'information' });
    information.append($('<div>', { class: 'max_guest' }).html(`<i class="fa fa-users fa-3x" aria-hidden="true"></i><br />${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}`));
    information.append($('<div>', { class: 'number_rooms' }).html(`<i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}`));
    information.append($('<div>', { class: 'number_bathrooms' }).html(`<i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}`));

    const description = $('<div>', { class: 'description' }).html(place.description);

    article.append(titleBox);
    article.append(information);
    article.append(description);

    return article;
  }

  // Function to load places from the front-end
  function loadPlacesFrontend () {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({})
    }).done(function (data) {
      const placesSection = $('section.places');
      for (const place of data) {
        const article = createPlaceArticle(place);
        placesSection.append(article);
      }
    });
  }

  // Task 4: Add event listener to the "Search" button
  $('button').click(function () {
  // Collect the checked amenity IDs
    const amenityIds = [];
    $('.amenity-checkbox:checked').each(function () {
      amenityIds.push($(this).data('id'));
    });

    // Send a POST request to places_search with the selected amenities
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: amenityIds })
    }).done(function (data) {
    // Clear existing places and load the filtered places
      $('section.places').empty();
      for (const place of data) {
        const article = createPlaceArticle(place);
        $('section.places').append(article);
      }
    });
  });

  // Initialize API status check, checkbox change handlers, and load places from the front-end
  checkApiStatus();
  handleCheckboxChange();
  loadPlacesFrontend();
});
