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

  // Initialize API status check and checkbox change handlers
  checkApiStatus();
  handleCheckboxChange();
});
