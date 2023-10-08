$(document).ready(function () {
  // Initialize an empty array to store selected amenities
  const selectedAmenities = {};

  // Function to update the <h4> tag with selected amenities
  function updateAmenitiesList () {
    const amenityNames = Object.values(selectedAmenities);
    const h4Text = amenityNames.join(', ');
    $('div.amenities h4').text(h4Text);
  }

  // Listen for changes on checkboxes with the 'amenity-checkbox' class
  $(document).on('change', '.amenity-checkbox', function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if (this.checked) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }

    // Update the <h4> tag with the list of selected amenities
    updateAmenitiesList();
  });
});
