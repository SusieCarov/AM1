
// FILE NAME: town.js
// DATE MODIFIED: 2.8.15
//     PURPOSE: This js file accesses the locu api, and populates the query results
// of our location input button, and our category buttons.
//


//global variables
var venueHolder;

var apiKey = "4563ba26ae40bfc14b6f866baaaa038e6c927df7";
var baseURL = "http://api.locu.com/v1_0/venue/search/?api_key=" + apiKey;
var urlWithLocation = baseURL + "&locality=wellesley&region=ma";

//find location button and the divs with class "entriesItems" - these will
//be used to place a query with onclick functions
var locationButton = document.querySelector("button");
var entriesItems = document.querySelectorAll("div.entriesItems");

//Performs search using the input when the search button is clicked.
locationButton.onclick = function () {
  var input = document.querySelector("#search");
  input = input.value;
	if (input) {
    var location = input.split(", ");//split city and state by a comma and space
    var city = encodeURI(location[0]);
    var state = encodeURI(location[1]);
    var url = baseURL + "&locality=" + city + "&region=" + state;
    urlWithLocation = url;
    url += "&callback=displayVenue";//callback to displayVenue function
    jsonpRequest(url);
	}
}

//depending on what category they want, we insert a category query into our
//url: gym, spa, laundry and restaurant categories
entriesItems[0].onclick = function () {
  categoryRequest("gym");
}

entriesItems[1].onclick = function () {
  categoryRequest("spa");
}

entriesItems[2].onclick = function () {
  categoryRequest("laundry");
}

entriesItems[3].onclick = function () {
  categoryRequest("restaurant");
}

function categoryRequest(category) {
    var url = urlWithLocation.split("&l");//have to insert category before locality,
    //so we splice the urlWithLocation at the location query in the url
    url = url[0] + "&category=" + encodeURI(category) 
          + "&l" + url[1] + "&callback=displayVenue"; //insert category, and reattach parts of query, add callback
    jsonpRequest(url);
}
  
//not an ajax, but jsonp request for Locu
function jsonpRequest(requestURL) {
  var newScriptElement = document.createElement("script");
  newScriptElement.setAttribute("src", requestURL);
  newScriptElement.setAttribute("id", "jsonp");
  var oldScriptElement = document.getElementById("jsonp");
  var head = document.getElementsByTagName("head")[0];
  if (oldScriptElement == null) {
    head.appendChild(newScriptElement);
  }
  else {
    head.replaceChild(newScriptElement, oldScriptElement);
  }
}

//populate divs according to api results
var ourResult;
function displayVenue(results){
  ourResult = results;

  //if something is already populating venueHolder, ditch everything and start over
  if(venueHolder) {
    venueHolder.innerHTML = "";
  }
  venueHolder = document.getElementById("searchResults");
  for (i in results.objects)
  {
    //venue object taken from api
    var venue = results.objects[i];
    var div = document.createElement('div');
    div.className = "venueInfo";

    //venue's phone number
    var phoneNum = document.createElement("div");
    phoneNum.innerHTML = venue.phone;
    phoneNum.className = "phoneNumber";

    //venue's name
    var venueName = document.createElement("h2");
    venueName.innerHTML = venue.name;

    //venue's address
    var address = document.createElement("h3");
    address.innerHTML = venue.street_address;

    //venue's website
    var website = document.createElement("h3");

    website.innerHTML = venue.website_url;
    website.href = venue.website_url;

    //append divs of a venue's info to large venue div holder
    venueHolder.appendChild(div);
    div.appendChild(venueName);
    div.appendChild(phoneNum);
    div.appendChild(address);
    div.appendChild(website);
  }

}
