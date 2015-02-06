var input;
var thingy;
var foodHolder;
var apiKey = "4563ba26ae40bfc14b6f866baaaa038e6c927df7";
var baseURL = "http://api.locu.com/v1_0/venue/search/?api_key=" 
            + apiKey 
            + "&category=restaurant"; //category is always restaurant

var buttons = document.querySelectorAll("button");
var locationButton = buttons[0];
var priceButton = buttons[1];
var cuisineButton = buttons[2];


locationButton.onclick = function () {
  var input = document.querySelector("#search");
  input = input.value;
  console.log(input);
	if (input) {
    var location = input.split(", ")
    var city = encodeURI(location[0])
    var state = encodeURI(location[1])
    var url = baseURL + "&locality=" + city
    url += "&region=" + state
    url += "&callback=displayRestaurants"
    ajaxRequest(url);

	}
  console.log("hello");
}

function ajaxRequest(url) {
  var request = new XMLHttpRequest(); 
  request.open("GET", url); 
  
  request.onload = function() {
    if (request.status == 200) {
      searchResults = (request.responseText);
      displayVenue(searchResults); // displayVenue is your function
    }
  };
  
  request.send(null); 
}

// Temporary function, to see that the request works
function displayVenue(result){
  var results = JSON.parse(result);
  thingy = results.items[0]; //don't forget to take this out

  if(venueHolder) {
    venueHolder.innerHTML = "";
  }
  venueHolder = document.getElementById("searchResults");
  for (i in results.items)
  {
    var venue = results.items[i];
    var div = document.createElement("div");
    div.className = "Venue Info";

    var phoneNum = document.createElement("div");
    phoneNum.innerHTML = venue.objects[i].phone;
    phoneNum.className = "phone number";
    console.log(phoneNum.innerHTML);

    var name = document.createElement("h2");
    name.innerHTML = venue.objects[i].name;

    var address = document.createElement("h3");
    address.innerHTML = venue.objects[i].street_address;

    var website = document.createElement("h3");
    website.innerHTML = venue.objects[i].website_url;

    venueHolder.appendChild(div);
    div.appendChild(phoneNum);
    div.appendChild(name);
    div.appendChild(address);
    div.appendChild(website);
  }

}
