//Data: assume we have a list of top 5 movies - a list of JAVASCRIPT Objects
let topMovies = [{id: 0, title: "The Shawshank Redemption", year: 1994, image_url: "MEDIA/movie0.jpg"},
				 {id: 1, title: "The Godfather ", year: 1972, image_url: "MEDIA/movie1.jpg"},
				 {id: 2, title: "The Dark Knight", year: 2008, image_url: "MEDIA/movie2.jpg"},
			     {id: 3, title: "12 Angry Men", year: 1957, image_url: "MEDIA/movie3.jpg"},
			     {id: 4, title: " Schindler\'s List", year: 1993, image_url: "MEDIA/movie4.jpg"},
				];



//------------------------------------------------------------------------------------------------------
//Service Fee: $85 if the customer’s phone is "not warranty", else $0.00
//------------------------------------------------------------------------------------------------------
$('#warranty').change(function() {
	if (this.checked) {
		$('#serviceFee').val('0.00');
	} else {
		$('#serviceFee').val('85.00');
	}
});



//------------------------------------------------------------------------------------------------------
//Bond: the cost for a courtesy phone (and charger) only if the customer is a “consumer” type.
//      If customer is "business", no bond is required.
//------------------------------------------------------------------------------------------------------
//Assume there is a list of courtesy items as below:
let courtesyList = [{item: 'iPhone', bond: 275},
					{item: 'otherPhone', bond: 100},
					{item: 'charger', bond: 30}
				   ];
				   
//We will use "appState" object to track the form change when users interact with the app			   
let appState = {customerType: 'customer',
				courtesyPhone: {item: 'none', bond: 0},//Allow to borrow ONLY 1 phone
				courtesyCharger: {item: 'none', bond: 0}//Allow to borrow ONLY 1 charger
			   };	



// Click "Add" button Event /////////////////////////////////////////////////////////////////////////////////////////////////////
$('#addBtn').click(function(e) {
	// Prevent all the default function of the "add" button
	e.preventDefault();

	// Get the selected item info
	let selectedItemText = $('#itemList').find(":selected").text();
	let selectedItemValue = $('#itemList').find(':selected').val();
	let selectedItemBond = courtesyList.find(foundItem => foundItem.item.toLowerCase() == selectedItemValue.toLowerCase()).bond;

	// Build HTML row (code of this item) to the table on UI
	let newRow = `
				<tr class="newSelectedItem">
					<td>${selectedItemText}</td>
					<td>${selectedItemBond}</td>
				</tr>
	`;

	// Append this new row(item) to the table id="borrowItems" if its not existing yet
	if(appState.courtesyPhone.item == "none" && selectedItemValue.toLowerCase().includes("phone")) {
		// Add a new row
		$('#borrowItems').append(newRow);

		// Update the appState
		appState.courtesyPhone.item = selectedItemValue;
		appState.courtesyPhone.bond = selectedItemBond;

		// Update the bond element
		if($('#customerType').is(':checked')) {
			$('#bond').val(appState.courtesyPhone.bond + appState.courtesyCharger.bond);
		} else {
			$('#bond').val(0);
		}

	} else if (appState.courtesyCharger.item == "none" && selectedItemValue.toLowerCase().includes("charger")) {
		$('#borrowItems').append(newRow);
		// Update the appState
		appState.courtesyCharger.item = selectedItemValue;
		appState.courtesyCharger.bond = selectedItemBond;

		// Update the bond element
		if($('#customerType').is(':checked')) {
			$('#bond').val(appState.courtesyPhone.bond + appState.courtesyCharger.bond);
		} else {
			$('#bond').val(0);
		}

	} else {
		alert("The item was already added");
	}
});


// Click "Remove" button Event /////////////////////////////////////////////////////////////////////////////////////////////////
$('#removeBtn').click(function(e) {
	// Prevent all default actions attached to this button
	e.preventDefault();

	// Remove all added rows that have the classname = "newSelectedItem"
	$('.newSelectedItem').remove();

	// Update the appState
	appState.courtesyPhone = {item: 'none', bond: 0};
	appState.courtesyCharger = {item: 'none', bond: 0};

	// Update bond
	$('#bond').val(0);
});



// Handle "click customer type" radio button event ///////////////////////////////////////////////////////////////////////////////
$('#customerType').click(function() {
	appState.customerType = 'customer';
	$('#bond').val(appState.courtesyPhone.bond + appState.courtesyCharger.bond);
});

$('#businessType').click(function() {
	appState.customerType = 'business';
	$('#bond').val(0);
});



// Validate the form
function validateForm() {
	let x = document.forms["myForm"]["fname"].value;
	if (x == "") {
	  alert("Name must be filled out");
	  return false;
	}
  }










//************************************************************************************************************* 
//************************************************************************************************************* 
//            ADVANCED JS
// Hide all content area
$('.content-demo-area div').hide();

// Loop through all buttons and add "click" event to each of them
// and also the logic: hide all content sections and show only the according area
// Highlight background of the clicked button.
$('.btn-demo-area button').on('click', function(){
	// Set all button backgrounds to white
	$('.btn-demo-area button').css('background-color', 'white');

	// Set the clicked button background to "warning" color
	$(this).css('background-color', 'orange');

	// Hide all the content areas
	$('.content-demo-area div').hide();

	// show only the content area matching to the clicked button
	$('.content-demo-area div').eq($(this).index()).show(1000);
});



// Interactive Map
$('svg path').each(function(index, item) {
    var id = $(item).attr('id');
        
    $('svg #' + id).on('click', function(e) {
        var id = $(e.currentTarget).attr('id');
        $('svg path').removeClass('active');
        $(e.currentTarget).addClass('active');
        window.alert(id + ' Clicked');
    });
});


// File Upload 
const image_input = document.querySelector("#image-input");

image_input.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
});






// Address Autocomplete
var placeSearch, autocomplete;

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
      {types: ['geocode']});
  autocomplete.setComponentRestrictions( {'country': 'au'});
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  var place = autocomplete.getPlace();

  var address = '';
  
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    switch (addressType){
      case 'subpremise':
        address = place.address_components[i]['short_name'] + '/' + address;
      break;
      case 'street_number':
        address = address + place.address_components[i]['short_name'] + ' ';
      break;
      case 'route':
        address += place.address_components[i]['long_name'];
      break;
      case 'locality':
        document.getElementById('suburb').value = place.address_components[i]['long_name'];
      break;
      case 'administrative_area_level_1':
        document.getElementById('region').value = place.address_components[i]['short_name'];
      break;
      case 'country':
        document.getElementById('country').value = place.address_components[i]['long_name'];
      break;
      case 'postal_code':
        document.getElementById('postal_code').value = place.address_components[i]['short_name'];
      break;
    }
  }
  
  document.getElementById('address').value = address;
  
  jQuery('#locationField').slideUp();
  jQuery('#form').slideDown();
  
}

function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}
  




// Drag & Drop
//Use JQuery to handle event: hover 
$('h2').hover(function(){
	$(this).css('background-color', '');
  } , function(){
	$(this).css('background-color', '');
  });	
  
  //-------------------------------------		
  $(".box" ).draggable({
	scope: 'demoBox',
	revertDuration: 100,
	start: function( event, ui ) {
	  //Reset
	  $( ".box" ).draggable( "option", "revert", true );
	  $('.result').html('-');
	}
  });
  
  $(".drag-area" ).droppable({
	 scope: 'demoBox',
	 drop: function( event, ui ) {
	   let area = $(this).find(".drop-area").html();
	   let box = $(ui.draggable).html();     
	   $( ".box" ).draggable( "option", "revert", false );
	   
	   //Display action in text
	   $('.result').html("[Action] <b>" + box + "</b>" +
						 " dropped on " + 
						 "<b>" + area + "</b>");
	   
	   //Re-align item
	   $(ui.draggable).detach().css({top: 0,left: 0}).appendTo(this);
	 }
  })
  






// ***************************************************************************************************************





























//------------------------------------------------------------------------------------------------------
//Load JSON File stored on web server at http://danieldangs.com/itwd6408/json/faqs.json
