var formData = {};

var termsCheck = false;

var firstName = "";
var lastName = "";
var email = "";
var phoneNumber = "";

var moveType = "";

var businessName = "";
var jobTitle = "";
var businessFieldsAppended = false;

var pickupBusinessType = "";
var pickupBusinessTypeSelected = false;

var pickupBusinessLocation = "";

var pickupLocationArea = 0;
var numberOfEmployees = 0;
var squareFeetcheck = false;

var heavyItemsCheck = false;
var cubicalsCheck = false;
var cubicals = "";
var heavyItems = "";

var pickupHomeType = "";
var pickupHomeTypeSelected = false;

var homeFields = false;
var apartmentFields = false;
var condoFields = false;
var storageFields = false;

var pickupHomeLocation = "";
var unitNumber = "";

var homStory = "";
var homBedrooms = "";

var aptFloorNumber = 0;
var aptComplex = "";
var aptBedrooms = "";

var conFloorNumber = 0;
var conComplex = "";
var condoBedrooms = "";

var strgName = "";
var strgSize = 0;
var strgFloor = 0;

var heavyItemsHomeCheck = false;
var reassemblyFurnitureCheck = false;
var heavyItemsHome = "";
var reassemblyFurniture = "";

var pickupDate = "";

var dropOffHomeType = "";
var dropOffHomeTypeSelected = false;

var dropOffBusinessType = "";
var dropOffBusinessTypeSelected = false;

var dropOffHomeLocation = "";

var dropOffBusinessLocation = "";

var additionalStops = "";

var selectedValues = [];

//function for showing step
function showStep(stepSelector) {
    $(stepSelector).show();
}

//function to hidel all sections
function hideAll() {
    $(".sec").hide();
}

//function for checkbox validation
function checkBoxValidation(checkbox) {
    if (!checkbox.checked) {
        return false;
    }
    return true;
}

//function to validate email
function validateEmail(email) {
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}

//function to validate phone number
function validatePhonenumber(phone)
{
  var number = /^\d{11}$/;
  return number.test(phone);
}

//function for info form validation
function validateInfoForm(firstName, lastName, email, phoneNumber) {
    var isValid = true;
    if (firstName === "") {
        isValid = false;
    } else if (lastName === "") {
        isValid = false;
    } else if (email === "") {
        isValid = false;
    } else if (!validateEmail(email)) {
        isValid = false;
        $("#emailAddressError").text("Invalid Email Address format.");
    } else if (!validatePhonenumber(phoneNumber)) {
        isValid = false;
        $("#phoneNumberError").text("Number Should be 11 digits without Special-Characters");
    }
    return isValid;
}

//function for service business form validation
function validateServiceBusinessForm(businessName, jobTitle) {
    var isValid = true;
    if (businessName === "") {
        isValid = false;
    } else if (jobTitle === "") {
        isValid = false;
    }
    return isValid;
}

function closeDropdown() {
    document.getElementById('homeStory').size = 1;
    document.getElementById('homeStory').blur();

    document.getElementById('numBedroomsHome').size = 1;
    document.getElementById('numBedroomsHome').blur();

    document.getElementById('numBedroomsCondo').size = 1;
    document.getElementById('numBedroomsCondo').blur();

    document.getElementById('numBedroomsApartment').size = 1;
    document.getElementById('numBedroomsApartment').blur();

    document.getElementById('heavyItemsHome').size = 1;
    document.getElementById('heavyItemsHome').blur();

}



function initialize_homeAddress_field() {
    var input = document.getElementById('homeAddress');

    const theResults = new google.maps.places.Autocomplete(input);
    theResults.setComponentRestrictions({
          country: ["us"],
    });

    google.maps.event.addListener(theResults, 'place_changed', () => {
      jQuery('#homeAddress').trigger('place_changed');
    });
  }

  function initialize_homeDestinationLocation_field() {
    var input = document.getElementById('homeDestinationLocation');

    const theResults = new google.maps.places.Autocomplete(input);
    theResults.setComponentRestrictions({
          country: ["us"],
    });

    google.maps.event.addListener(theResults, 'place_changed', () => {
      jQuery('#homeDestinationLocation').trigger('place_changed');
    });
  }
  function initialize_businessLocation_field() {
    var input = document.getElementById('businessLocation');

    const theResults = new google.maps.places.Autocomplete(input);
    theResults.setComponentRestrictions({
          country: ["us"],
    });

    google.maps.event.addListener(theResults, 'place_changed', () => {
      jQuery('#businessLocation').trigger('place_changed');
    });
  }
  function initialize_businessDestinationLocation_field() {
    var input = document.getElementById('businessDestinationLocation');

    const theResults = new google.maps.places.Autocomplete(input);
    theResults.setComponentRestrictions({
          country: ["us"],
    });

    google.maps.event.addListener(theResults, 'place_changed', () => {
      jQuery('#businessDestinationLocation').trigger('place_changed');
    });
  }

/* Sections */
function onLoadCalculator() {
    hideAll();
    showStep("#intro");
    initialize_homeAddress_field();
    initialize_homeDestinationLocation_field();
    initialize_businessLocation_field();
    initialize_businessDestinationLocation_field();
}

function introNext() {
    var terms = document.getElementById('terms');

    if (!checkBoxValidation(terms)) {
        termsCheck = terms.checked;
        $("#termsError").text("This is a required field");
        return false;
    }

    termsCheck = terms.checked;
    formData.PrivacyTerms = termsCheck;

    hideAll();
    $("#termsError").text("");
    showStep("#contactInfo");
}

function openIntro() {
    $("#terms").val(termsCheck);
    hideAll();
    showStep("#intro");
}

function contactInfoNext() {
    firstName = $("#firstName").val().trim();
    lastName = $("#lastName").val().trim();
    email = $("#emailAddress").val().trim();
    phoneNumber = $("#phoneNumber").val().trim();

    $(".error-message").text("");

    if (validateInfoForm(firstName, lastName, email, phoneNumber) === true) {
        formData.UserDetails = {};

        formData.UserDetails.FirstName = firstName;
        formData.UserDetails.LastName = lastName;
        formData.UserDetails.Email = email;
        formData.UserDetails.PhoneNumber = phoneNumber;

        hideAll();
        showStep("#moveType");
    }
    else {
        $("#contactInfoError").text("Please fill required fields");
        return false;
    }
}

function openContactInfo() {
    hideAll();
    showStep("#contactInfo");
}

function moveTypeNext() {
    if (moveType === "Home") {
        $("#BusinessName").val("");
        $("#JobTitle").val("");
        businessName = jobTitle = "";

        formData.MoveType = {};
        formData.MoveType.Type = moveType;

        hideAll();
        showStep("#moveTypeHome");
    } else if (moveType === "Business") {
        businessName = $("#BusinessName").val().trim();
        jobTitle = $("#JobTitle").val().trim();
        if (validateServiceBusinessForm(businessName, jobTitle) === true) {
            formData.MoveType = {};
            formData.MoveType.Type = moveType;
            formData.MoveType.BusinessName = businessName;
            formData.MoveType.JobTitle = jobTitle;

            hideAll();
            $("#errorMoveTypeBusiness").text("");
            showStep("#needUsBusiness");
        } else {
            $("#errorMoveTypeBusiness").text("Please fill business details");
        }
    } else {
        $("#moveTypeError").text("Please select move type");
        return false;
    }
}

function handleMoveTypeOptions(value) {
    if (value == 1) {
        moveType = "Home";
        $("#errorMoveTypeBusiness").remove();
        $("#moveTypeError").text("");
        if (businessFieldsAppended) {
            $("#moveTypeService .inp-field").remove();
            businessFieldsAppended = false;
        }
    } else if (value == 2) {
        moveType = "Business";
        $("#moveTypeError").text("");
        if (!businessFieldsAppended) {
            $("#moveTypeService").append(`<div class="inp-field">
                <input type="text" class="srvc-input" id="BusinessName" placeholder="Business Name"><br>
                <span>*</span>
            </div>

            <div class="inp-field">
                <input type="text" class="srvc-input" id="JobTitle" placeholder="Job Title"><br>
                <span>*</span>
            </div>
            
            <span class="error-message" id="errorMoveTypeBusiness"></span>
            `);

            $(".srvc-input").width(280);
            businessFieldsAppended = true;
        }
    } else {
        return false;
    }
}

function openMoveType(value) {
    if (value == 1) {

        hideAll();
        showStep("#moveType");
    } else if (value == 2) {
        hideAll();
        showStep("#moveType");
    }
}

function pickupBusinessTypeOption(value) {
    $("#errorBusinessType").text("");
    if (value === "Office") {
        pickupBusinessType = value;
        pickupBusinessTypeSelected = true;
    } else if (value === "Retail") {
        pickupBusinessType = value;
        pickupBusinessTypeSelected = true;
    } else if (value === "Warehouse") {
        pickupBusinessType = value;
        pickupBusinessTypeSelected = true;
    } else if (value === "Storage") {
        pickupBusinessType = value;
        pickupBusinessTypeSelected = true;
    } else {
        pickupBusinessTypeSelected = false;
    }
}

function needUsBusinessNext() {
    var isValid = true;
    if (pickupBusinessTypeSelected == false) {
        isValid = false;
        $("#errorBusinessType").text("Select a business type");
    }
    if ($("#businessLocation").val().trim() === "") {
        isValid = false;
        $("#errorNeedUsBusiness").text("We require a minmum of your postal code to provide an estimate");
    } else {
        $("#errorNeedUsBusiness").text("");
        pickupBusinessLocation = $("#businessLocation").val();
    }

    if (isValid == true) {
        formData.BuildingType = pickupBusinessType;
        formData.PickupLocation = pickupBusinessLocation;

        hideAll();
        showStep("#businessSpace");
    } else {
        return false;
    }
}

function openNeedUsBusiness() {
    hideAll();
    showStep("#needUsBusiness");
}

function squareFeetCheck() {
    var sqCheck = document.getElementById("checkSquareFeet");

    if (checkBoxValidation(sqCheck)) {
        $("#businessSpaceAreaError").text("");
        $("#squarefeet").prop('disabled', true);
        $("#squarefeet").val('');
        squareFeetcheck = sqCheck.checked;
    } else {
        $("#squarefeet").prop('disabled', false);
        squareFeetcheck = sqCheck.checked;
    }
}

function businessSpaceNext() {
    $(".error-message").text("");

    pickupLocationArea = $("#squarefeet").val();
    numberOfEmployees = $("#employeesMoved").val();

    if (squareFeetcheck != true) {
        if (pickupLocationArea == 0) {
            $("#businessSpaceAreaError").text("Provide area(SQ FT) or click below");
            return false;
        } else if (numberOfEmployees == 0) {
            $("#businessSpaceError").text("Please fill required fields");
            return false;
        }
    } else if (squareFeetcheck == true) {
        if (numberOfEmployees == 0) {
            $("#businessSpaceError").text("Please fill required fields");    
            return false;
        }
    } else {
        $("#businessSpaceError").text("Please fill required fields");
        return false;
    }

    formData.PickupLocationArea = pickupLocationArea;
    formData.NumberOfEmployees = numberOfEmployees;

    hideAll();
    showStep("#businessCubicals");
}

function openBusinessSpace() {
    hideAll();
    showStep("#businessSpace");
}

function handleCubicals(value, button) {
    if (value === "Yes" || value === "No") {
        cubicals = value;
        cubicalsCheck = true;
    }
    const buttons = document.querySelectorAll('.srvc-btn-cubicals');
    buttons.forEach((btn) => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
}

function handleHeavyItems(value, button) {
    if (value === "Yes" || value === "No") {
        heavyItems = value;
        heavyItemsCheck = true;
    }
    const buttons = document.querySelectorAll('.srvc-btn-heavy-items');
    buttons.forEach((btn) => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
}

function businessCubicalNext() {
    $("#businessCubicalItemsError").text("");
    if (heavyItemsCheck == false || cubicalsCheck == false) {
        $("#businessCubicalItemsError").text("Select Yes/No for above options");
        return false;
    } else {
        formData.HeavyItems = heavyItems;
        formData.Cubicals = cubicals;

        hideAll();
        showStep("#howCanWeHelp");
    }
}

//If home is selected from screen 4
function homeTypeOptions(value) {
    if (value === "Home") {
        pickupHomeType = value;
        pickupHomeTypeSelected = true;
        if (homeFields != true) {
            homeFields = true;
            $("#moveTypeHomeService .move-type-home").remove();
            $("#moveTypeHomeService").append(`<div class="move-type-home home" id="home">
            
            <h2>Select Home Type</h2>
            <select id="homeStory" class="dropdown minimal" onfocus='this.size=4;' onblur='this.size=0;' onchange='this.size=1; this.blur();'>
                <option value="Single Story Home">Single Story Home</option>
                <option value="Two Story Home">Two Story Home</option>
                <option value="Triple Story Home">Triple Story Home</option>
            </select>
            <p style="font-size: 14px;">for Example: 5</p>

            <h2>how many bedrooms do you have?</h2>
            <select id="numBedroomsHome" class="dropdown" onfocus='this.size=6;' onblur='this.size=0;' onchange='this.size=1; this.blur();'>
                <option value="One Bedroom">One Bedroom</option>
                <option value="Two Bedroom">Two Bedroom</option>
                <option value="Three Bedroom">Three Bedroom</option>
                <option value="Four Bedroom">Four Bedroom</option>
                <option value="Five Bedroom">Five Bedroom</option>

            </select>
        </div>`);
        }
        homeFields = false;
    } else if (value === "Apartment") {
        pickupHomeType = value;
        pickupHomeTypeSelected = true;
        if (apartmentFields != true) {
            apartmentFields = true;
            $("#moveTypeHomeService .move-type-home").remove();
            $("#moveTypeHomeService").append(`<div class="move-type-home apartment-condo" id="apartment-condo">
            <h2>WHAT Floor Number are you on?</h2>
            <div class="inp-field">
                <input type="number" id="apartmentFloorNumber"  placeholder="Floor Number">
                <span>*</span>
                <p class="error" id="apartmentFloorNumberError"></p>
            </div>
            
            <p style="font-size: 14px;">for Example: 5</p>

            <h2>WHAT the name of your complex?</h2>

            <div class="inp-field">
                <input type="text" id="apartmentComplex" placeholder="Complex">
                <span>*</span>
                <p class="error" id="apartmentComplexError"></p>
            </div>
            
            <h2>How many bedrooms do you have?</h2>
            <select id="numBedroomsApartment" class="dropdown" onfocus='this.size=6;' onblur='this.size=0;' onchange='this.size=1; this.blur();'>
                <option value="One Bedroom">One Bedroom</option>
                <option value="Two Bedroom">Two Bedroom</option>
                <option value="Three Bedroom">Three Bedroom</option>
                <option value="Four Bedroom">Four Bedroom</option>
                <option value="Five Bedroom">Five Bedroom</option>

            </select>
        </div>`);
        }
        apartmentFields = false;
    } else if (value === "Condo") {
        pickupHomeType = value;
        pickupHomeTypeSelected = true;
        if (condoFields != true) {
            condoFields = true;
            $("#moveTypeHomeService .move-type-home").remove();
            $("#moveTypeHomeService").append(`<div class="move-type-home apartment-condo" id="apartment-condo">
            <h2>WHAT Floor Number are you on?</h2>
            <div class="inp-field">
                <input type="number" id="condoFloorNumber" placeholder="Floor Number">
                <span>*</span>
                <p class = "error" id="condoFloorNumberError"></p>
                
            </div>
            
            <p style="font-size: 14px;">for Example: 5</p>

            <h2>WHAT the name of your complex?</h2>

            <div class="inp-field">
                <input type="text" id="condoComplex" placeholder="Complex">
                
                <span>*</span>
                <p class = "error" id="condoComplexError"></p>
            </div>
            
            <h2>how many bedrooms do you have?</h2>
            <select id="numBedroomsCondo" class="dropdown" onfocus='this.size=6;' onblur='this.size=0;' onchange='this.size=1; this.blur();'>
                <option value="One Bedroom">One Bedroom</option>
                <option value="Two Bedroom">Two Bedroom</option>
                <option value="Three Bedroom">Three Bedroom</option>
                <option value="Four Bedroom">Four Bedroom</option>
                <option value="Five Bedroom">Five Bedroom</option>
            </select>
            
            

        </div>`);
        }
        condoFields = false;
    } else if (value === "Storage") {
        pickupHomeType = value;
        pickupHomeTypeSelected = true;
        if (storageFields != true) {
            storageFields = true;
            $("#moveTypeHomeService .move-type-home").remove();
            $("#moveTypeHomeService").append(`<div class="move-type-home storage" id="storage">
            <h2>WHAT'S the Storage Name</h2>

            <div class="inp-field">
                <input type="text" id="storageName" placeholder="Name">
                <span>*</span>
                <p class="error" id="storageNameError"></p>
            </div>
            
            <p style="font-size: 14px;">for Example: 5</p>

            <h2>WHAT'S the Storage Size</h2>

            <div class="inp-field">
                <input type="number" id="storageSize" placeholder="Size (SQ FT)">
                <span>*</span>
                <p class="error" id="storageSizeError"></p>
            </div>

            <h2>WHAT'S the Storage Floor</h2>

            <div class="inp-field">
                <input type="number" id="storageFloor" placeholder="Floor Number">
                <span>*</span>
            </div>
        </div>`);
        }
        storageFields = false;
    } else {
        pickupHomeTypeSelected = false;
    }
}

function moveTypeHomeNext() {
    var ApartementHomeError2 = document.getElementById("homeAddressError2")
    var ApartementHomeError = document.getElementById("homeAddressError")
    var ApartementHomeError3 = document.getElementById("errorAppartement")
    pickupHomeLocation = $("#homeAddress").val().trim();
    unitNumber = $("#unitNumberLetter").val().trim();

    var anyError = false;
    if (pickupHomeLocation === "") {
        ApartementHomeError.textContent = "We require a minimum of your postal code to provide an estimate."
        anyError = true;
    } else {
        ApartementHomeError.textContent = ""
    }
     
    if (unitNumber === "") {
        ApartementHomeError2.textContent = "Please Enter Number";
        anyError = true;
    } else {
        ApartementHomeError2.textContent = "";
    }
    
    if (!pickupHomeTypeSelected) {
        ApartementHomeError3.textContent = "Please fill a field"
        anyError = true;
    } else {
        ApartementHomeError3.textContent = ""
    }

    if(anyError) {
        return false;
    }
    
    
    if (pickupHomeTypeSelected) {
        formData.PickupLocation = pickupHomeLocation;
        formData.UnitNumber = unitNumber; 
        ApartementHomeError2.textContent = "";
        ApartementHomeError.textContent="";
        ApartementHomeError3.textContent ="";
        switch (pickupHomeType) {
            case "Home":
                homStory = $("#homeStory").val();
                homBedrooms = $("#numBedroomsHome").val();

                if (homStory === "" || homBedrooms === "") {
                 
                    return false;
                }

                formData.BuildingType = pickupHomeType;
                formData.HomeStory = $("#homeStory").val();
                formData.Bedrooms = homBedrooms;

                aptFloorNumber = 0;
                aptComplex = "";
                aptBedrooms = "";
                conFloorNumber = 0;
                conComplex = "";
                condoBedrooms = "";
                strgName = "";
                strgSize = 0;
                strgFloor = 0;

                break;
            case "Apartment":
                aptFloorNumber = $("#apartmentFloorNumber").val();
                aptComplex = $("#apartmentComplex").val().trim();
                aptBedrooms = $("#numBedroomsAppartment").val();
                var apartmentFloorNumberError = document.getElementById("apartmentFloorNumberError")
                var apartmentComplexError = document.getElementById("apartmentComplexError")

                var caseError = false;
                if (aptFloorNumber == 0 ) {
                    apartmentFloorNumberError.textContent = "Please Enter Floor Number "
                    caseError = true
                }else{
                    apartmentFloorNumberError.textContent = " "
                }
                if ( aptComplex === "" ) {
                    apartmentComplexError.textContent = "Please Enter Complex Name"
                    caseError = true        
                } else{
                    apartmentComplexError.textContent = " "
                }
                if (aptFloorNumber == 0 ) {
                    caseError = true
                }
                if(caseError){
                    return true
                }
              
                formData.BuildingType = pickupHomeType;
                formData.ApartmentFloor = aptFloorNumber;
                formData.ApartmentComplex = aptComplex;
                formData.ApartmentBedrooms = aptBedrooms;

                homStory = "";
                homBedrooms = "";
                conFloorNumber = 0;
                conComplex = "";
                condoBedrooms = "";
                strgName = "";
                strgSize = 0;
                strgFloor = 0;

                break;
            case "Condo":
                conFloorNumber = $("#condoFloorNumber").val();
                conComplex = $("#condoComplex").val().trim();
                condoBedrooms = $("#numBedroomsCondo").val();
                var condoFloorNumberError = document.getElementById("condoFloorNumberError")
                var condoComplexError= document.getElementById("condoComplexError")
                
                var condoError = false
                if (conFloorNumber == 0 ) {
                    condoFloorNumberError.textContent = "Please Fill Floor Number"
                    condoError = true

                }else{
                    condoFloorNumberError.textContent = ""
                }
                if ( conComplex === "" ) {
                    condoComplexError.textContent = "Please Fill Name of Complex"
                    condoError = true

                }else{
                    condoComplexError.textContent = ""
                }
                if ( condoBedrooms === "") {
                   
                    return false;

                }
                if(condoError){
                    return true
                }

                formData.BuildingType = pickupHomeType;
                formData.CondoFloor = conFloorNumber;
                formData.CondoComplex = conComplex;
                formData.CondoBedrooms = condoBedrooms;

                homStory = "";
                homBedrooms = "";
                aptFloorNumber = 0;
                aptComplex = "";
                aptBedrooms = "";
                strgName = "";
                strgSize = 0;
                strgFloor = 0;

                break;
            case "Storage":
                strgName = $("#storageName").val().trim();
                strgSize = $("#storageSize").val();
                strgFloor = $("#storageFloor").val();

                var storageNameError = document.getElementById("storageNameError")
                var storageSizeError = document.getElementById("storageSizeError")
                
                var storageError = false
                if (strgName === "" ) {
                    storageNameError.textContent = "Please Enter Name"
                    storageError = true
                }else{
                    storageNameError.textContent = ""
                }
                if ( strgSize == 0 ) {
                    storageSizeError.textContent = "Please Enter Storage Size"
                    storageError = true
                }else{
                    storageSizeError.textContent = ""
                }
                if (strgName === "" ) {
                    return false;
                }
                if(storageError){
                    return true
                }

                formData.BuildingType = pickupHomeType;
                formData.StorageName = strgName;
                formData.StorageSize = strgSize;
                formData.StorageFloor = strgFloor;

                homStory = "";
                homBedrooms = "";
                aptFloorNumber = 0;
                aptComplex = "";
                aptBedrooms = "";
                conFloorNumber = 0;
                conComplex = "";
                condoBedrooms = "";

                break;
            default:
                return false;
        }
        if( caseError) {
            return false;
        }
    } else {
        condoFloorNumberError.textContent = ""
        condoComplexError.textContent = ""
        storageNameError.textContent = ""
        storageSizeError.textContent = ""
       
        
        return false;
    }
   


    hideAll();
    showStep("#homeHeavyItems");
}

function openMoveTypeHome() {
    hideAll();
    showStep("#moveTypeHome");
}

function handleHeavyItemsOptions(value,button){
    const buttons = document.querySelectorAll('.srvc-btn-home-items');
    buttons.forEach((btn) => {
        btn.classList.remove('active');
    });

    button.classList.add('active');

    var fieldcheck = false;

    if(value === "Yes"){
        if(fieldcheck!=true){
            $("#heavyItemsOptions").append(`<div class="inp-field" id="heavyItemOptionFields">
            <input
              type="text"
              id="heavyItemsHome"
              placeholder="Enter Heavy Items"
            />
            <span><i class="fa-solid fa-location-dot"></i></span>
            </div>`);

            heavyItemsHomeCheck = true;
            formData.HomeHeavyItems = heavyItemsHomeCheck;
        }
    }
    else if(value === "No"){
        heavyItemsHomeCheck = true;
        fieldcheck = false;
        $("#heavyItemOptionFields").remove();
    }
}

function handleReassemblyOptions(value,button){
    const buttons = document.querySelectorAll('.srvc-btn-home-reassembly');
    buttons.forEach((btn) => {
        btn.classList.remove('active');
    });

    button.classList.add('active');

    var fieldcheck = false;

    if(value === "Yes"){
        if(fieldcheck!=true){
            $("#reassemblyOptions").append(`<div class="inp-field" id="reassemblyOptionsFields">
            <input
              type="text"
              id="reassembly"
              placeholder="Enter items"
            />
            <span><i class="fa-solid fa-location-dot"></i></span>
          </div>`);

          reassemblyFurnitureCheck = true;
          formData.Reassembling = reassemblyFurnitureCheck;
        }
    }
    else if(value === "No"){
        reassemblyFurnitureCheck = true;
        fieldcheck = false;
        $("#reassemblyOptionsFields").remove();
    }
}

function homeHeavyItemsNext() {
    var HeavyItemsError = document.getElementById("Heavy-ItemsError")
    if(heavyItemsHomeCheck == false ||  reassemblyFurnitureCheck == false){
        HeavyItemsError.textContent="please Select one "
        return false;
    }else{
        HeavyItemsError.textContent = ""
    }
        if(heavyItemsHomeCheck == true){
            if($("#heavyItemsHome").val() === ""){
            
                return false;
            }else{
                heavyItemsHome = $("#heavyItemsHome").val();
                formData.HeavyItems = heavyItemsHome;

                hideAll();
                showStep("#howCanWeHelp");
            }
        }

        if(reassemblyFurnitureCheck == true){
            if($("#reassembly").val() === ""){
                return false;
            }else{
                reassemblyFurniture = $("#reassembly").val();
                formData.ReassemblingFurniture = reassemblyFurniture;

                hideAll();
                showStep("#howCanWeHelp");
            }
        }
    }


function howCanWeHelpPrev() {
    if (moveType === "Business") {
        hideAll();
        showStep("#businessCubicals");
    } else {
        hideAll();
        showStep("#homeHeavyItems");
    }
}

function updateSelectedValues() {
    selectedValues = [];

    var radioInputs = document.querySelectorAll('input[type="radio"][name="movingServiceType"]:checked');
    radioInputs.forEach(function (radio) {
        selectedValues.push(radio.id);
    });

    var checkboxInputs = document.querySelectorAll('input[type="checkbox"][name="movingServiceType"]:checked');
    checkboxInputs.forEach(function (checkbox) {
        selectedValues.push(checkbox.id);
    });

    radioInputs.forEach(function (radio) {
        radio.removeEventListener('change', updateSelectedValues);
    });
    checkboxInputs.forEach(function (checkbox) {
        checkbox.removeEventListener('change', updateSelectedValues);
    });

    radioInputs = document.querySelectorAll('input[type="radio"][name="movingServiceType"]');
    checkboxInputs = document.querySelectorAll('input[type="checkbox"][name="movingServiceType"]');

    radioInputs.forEach(function (radio) {
        radio.addEventListener('change', updateSelectedValues);
    });

    checkboxInputs.forEach(function (checkbox) {
        checkbox.addEventListener('change', updateSelectedValues);
    });
}

function howCanWeHelpNext() {
    updateSelectedValues();

    formData.Services = selectedValues;

    hideAll();
    showStep("#needUsCalender");
}

function openHowCanWeHelp() {
    hideAll();
    showStep("#howCanWeHelp");
}

function validateDate() {
    const currentDate = new Date().toISOString().split('T')[0];
    document.getElementById('pickupCalender').min = currentDate;

    document.getElementById('pickupCalender').addEventListener('change', function () {
        pickupDate = this.value;
    });
}

function dateNext() {
    var dateErrorElement = document.getElementById("DateError");
    if (pickupDate === "") {
        dateErrorElement.textContent = "Please select a date.";
        return false;
    } else if (moveType === "Business") {
        formData.PickupDate = pickupDate;
        hideAll();
        showStep("#businessDestination");
        dateErrorElement.textContent = "";
    } else {
        formData.PickupDate = pickupDate;
        hideAll();
        showStep("#homeDestination");
    }
}

function openCalender() {
    hideAll();
    showStep("#needUsCalender");
}

function dropOffHomeTypeOption(value) {
    if (value == "Home" || value == "Apartment" || value == "Condo" || value == "Storage") {
        dropOffHomeType = value;
        dropOffHomeTypeSelected = true;
    } else {
        dropOffHomeTypeSelected = false;
    }
}

function dropOffBusinessTypeOption(value) {
    if (value == "Office" || value == "Retail" || value == "Warehouse" || value == "Storage") {
        dropOffBusinessType = value;
        dropOffBusinessTypeSelected = true;
    } else {
        dropOffBusinessTypeSelected = false;
    }
}

function homeDestinationNext() {
  
    
    if (dropOffHomeTypeSelected == true) {

        dropOffHomeLocation = $("#homeDestinationLocation").val().trim();
        if (dropOffHomeLocation === "") {
           
            
            return false;
        } else {
            formData.Destination = dropOffHomeLocation;
            formData.DestinationType = dropOffHomeType;
          
          

            hideAll();
            showStep("#additionalStops");
        }

       
        
    } else {
        return false;
    }
   
}

function businessDestinationNext() {
    var businessdestinationError = document.getElementById("business-destinationError")

    var BussinessDestinationInput = document.getElementById("businessDestinationLocation").value
   
if( BussinessDestinationInput === ""){
    businessdestinationError.textContent = " We require a minimum of your postal code to provide an estimate."  
} else{
    businessdestinationError.textContent = "";  
}


var businessTypeError = document.getElementById("businessTypeError")
if(dropOffBusinessTypeSelected == false){
    businessTypeError.textContent = "Select a business type"
}else{
    businessTypeError.textContent = ""
}
    if (dropOffBusinessTypeSelected == true) {
        dropOffBusinessLocation = $("#businessDestinationLocation").val().trim();

        if (dropOffBusinessLocation === "") {
            
           
            return false;
        } else {
            formData.Destination = dropOffBusinessLocation;
            formData.DestinationType = dropOffBusinessType;
           
           
            hideAll();
            showStep("#additionalStops");
        }
    } else {
        return false;
    }
}

function destination() {
    if (moveType === "Business") {
        hideAll();
        showStep("#businessDestination");
    } else {
        hideAll();
        showStep("#homeDestination");
    }
}

function handleAdditionalStopsOptions(value, button) {
    const buttons = document.querySelectorAll('.srvc-btn-additional-stops');
    buttons.forEach((btn) => {
        btn.classList.remove('active');
    });

    button.classList.add('active');

    additionalStops = value;
}

function additionalStopsNext() {
    var PickupError = document.getElementById("PickupError")
    if (additionalStops != "") {
        PickupError.textContent = ""
        formData.AdditionalStops = additionalStops;

        hideAll();
        showStep("#reviewScreen");

        const htmlContent = populateFormData(formData);
        document.getElementById("formDataDisplay").innerHTML = htmlContent;
    } else {
        PickupError.textContent = "Select Yes/No for above options"
        return false;
    }
}

function populateFormData(data, parentKey = "") {
    const firstSecDiv = document.getElementById("formDataDisplay");
    let generalHtml = "";
    let subHtml = "";

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const nestedKey = parentKey ? `${parentKey}.${key}` : key;

            if (typeof data[key] === "object") {
                subHtml += `<h2>${nestedKey}:</h2>`;
                subHtml += "<ul>";
                subHtml += populateFormData(data[key], nestedKey);
                subHtml += "</ul>";
            } else {
                generalHtml += `<li><strong>${nestedKey}:</strong> ${data[key]}</li>`;
            }
        }
    }

    const combinedHtml = `
      <div class="general-details">
        <ul>${generalHtml}</ul>
      </div>
      <div class="sub-objects">
        ${subHtml}
      </div>
    `;

    return combinedHtml;
}

function openAdditionalSteps() {
    hideAll();
    showStep("#additionalStops");
}

function reviewScreenNext() {
    hideAll();
    showStep("#packingSupplies");
}

function openReviewScreen() {
    hideAll();
    showStep("#reviewScreen");
}

var packingSuppliesCheck = false;
var packingSupplies = "";
var packingSuupliesList = [];

function showPackingSupplies(value) {
    if (value === "Yes") {
        if (packingSuppliesCheck != true) {
            packingSuppliesCheck = true;
            packingSupplies = value;
            $("#packingSuppliesOptions").append(`<div class="business-types" id="packingOptions">
                <div class="col">
                    <div class="types-name">
                        <p>
                        <i class="fa-solid fa-book-open"></i
                        ><strong class="packing-supplies-name">Packing Paper (5 lbs) </strong>
                        </p>
                        <div class="fm-number">
                        <span class="minus">-</span>
                        <input class="my-inp" type="text" value="0" />
                        <span class="plus">+</span>
                        </div>
                    </div>
                    <div class="types-name">
                        <p>
                        <i class="fa-solid fa-bed"></i
                        ><strong class="packing-supplies-name">Queen Mattress Bag </strong>
                        </p>
                        <div class="fm-number">
                        <span class="minus">-</span>
                        <input class="my-inp" type="text" value="0" />
                        <span class="plus">+</span>
                        </div>
                    </div>
                    <div class="types-name">
                        <p>
                        <i class="fa-solid fa-tape"></i
                        ><strong class="packing-supplies-name">Packing Tape </strong>
                        </p>
                        <div class="fm-number">
                            <span class="minus">-</span>
                            <input class="my-inp" type="text" value="0" />
                            <span class="plus">+</span>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="types-name types-name-col-2">
                        <p>
                        <i class="fa-solid fa-book-open"></i
                        ><strong class="packing-supplies-name">Packing Paper (10 lbs) </strong>
                        </p>
                        <div class="fm-number">
                        <span class="minus">-</span>
                        <input class="my-inp" type="text" value="0" />
                        <span class="plus">+</span>
                        </div>
                    </div>
                    <div class="types-name">
                        <p>
                        <i class="fa-solid fa-bed"></i
                        ><strong class="packing-supplies-name">Full Mattress Bag </strong>
                        </p>
                        <div class="fm-number">
                        <span class="minus">-</span>
                        <input class="my-inp" type="text" value="0" />
                        <span class="plus">+</span>
                        </div>
                    </div>
                    <div class="types-name">
                        <p>
                        <i class="fa-solid fa-box"></i
                        ><strong class="packing-supplies-name">Day of Move Box</strong>
                        </p>

                        <div class="fm-number">
                        <span class="minus">-</span>
                        <input class="my-inp" type="text" value="0" />
                        <span class="plus">+</span>
                        </div>
                    </div>
                </div>    
                <div class="you-are-buying">
                <h4>
                    <strong>
                        YOU ARE BUYING:
                    </strong>
                    <strong>
                        <i class="fa-solid fa-question"></i>
                    </strong>
                </h4>
                <div class="packing-list"><ul id="selectedPackingSupplies"></ul></div>
            </div>
            </div>
            
            `);

            $('.minus').click(function () {
                var $input = $(this).parent().find('.my-inp');
                var count = parseInt($input.val()) - 1;
                count = count < 1 ? 0 : count;
                $input.val(count);
                $input.change();
                updatePackingSuppliesList();
                return false;
            });

            $('.plus').click(function () {
                var $input = $(this).parent().find('.my-inp');
                $input.val(parseInt($input.val()) + 1);
                $input.change();
                updatePackingSuppliesList();
                return false;
            });
        }
    } else if (value === "No") {
        packingSuppliesCheck = false;
        packingSupplies = value;
        $("#packingOptions").remove();
        packingSuupliesList = [];
        $("#selectedPackingSupplies").empty();
    } else {
        return false;
    }
}

function updatePackingSuppliesList() {
    const packingOptions = document.querySelector('#packingOptions');
    if (packingOptions) {
        const inputElements = packingOptions.querySelectorAll('.my-inp');
        packingSuupliesList = [];

        inputElements.forEach(inputElement => {
            const supplyName = inputElement.closest('.types-name').querySelector('strong').textContent;
            const supplyQuantity = parseInt(inputElement.value);

            const supply = {
                name: supplyName,
                quantity: supplyQuantity
            };

            packingSuupliesList.push(supply);
        });

        $("#selectedPackingSupplies").empty();
        packingSuupliesList.forEach(supplies => {
            if (supplies.quantity > 0) {
                $("#selectedPackingSupplies").append(`<li>${supplies.name}: ${supplies.quantity}</li>`);
            }
        });
    }
}


function packingSuppliesNext() {
    var supplyQuantityCheck = false;
    var UpSaleError = document.getElementById("UpSaleError")
    if (packingSuppliesCheck==false) { 
       UpSaleError.textContent="Select Yes/No for above options"
        
    }else{
       UpSaleError.textContent = ""
       
    }

    if (packingSuppliesCheck) {
        const packingOptions = document.querySelector('#packingOptions');
        if (packingOptions) {
            const inputElements = packingOptions.querySelectorAll('.my-inp');
            packingSuupliesList = [];

            inputElements.forEach(inputElement => {
                const supplyName = inputElement.closest('.types-name').querySelector('strong').textContent;
                const supplyQuantity = parseInt(inputElement.value);

                const supply = {
                    name: supplyName,
                    quantity: supplyQuantity
                };

                packingSuupliesList.push(supply);
            });
        }

        packingSuupliesList.forEach(supplies => {
            if (supplies.quantity > 0) {
                supplyQuantityCheck = true;
            }
        });

       
        if (supplyQuantityCheck == true) {
            hideAll();
            showStep("#endScreen");
        } else {
            return false;
        }
    } else if (packingSupplies === "No") {
        hideAll();
        showStep("#endScreen");
    } else {
        packingSuupliesList = [];
        return false;
    }

    
}

