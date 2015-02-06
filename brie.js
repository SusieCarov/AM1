var input;
var thingy;
var venueHolder;
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
    url += "&callback=displayVenue"
    jsonpRequest(url);

	}
  console.log("hello");
}
    
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

// Temporary function, to see that the request works
var ourResult;
function displayVenue(results){
  ourResult = results;

  if(venueHolder) {
    venueHolder.innerHTML = "";
  }
  venueHolder = document.getElementById("searchResults");
  for (i in results.objects)
  {
    console.log("inside for loop");
    var venue = results.objects[i];
    var div = document.createElement("div");
    div.className = "Venue Info";

    var phoneNum = document.createElement("div");
    phoneNum.innerHTML = venue.phone;
    phoneNum.className = "phone number";
    console.log(phoneNum.innerHTML);

    var name = document.createElement("h2");
    name.innerHTML = venue.name;
    console.log(name.innerHTML);

    var address = document.createElement("h3");
    address.innerHTML = venue.street_address;
    console.log(address.innerHTML);

    var website = document.createElement("h3");
    website.innerHTML = venue.website_url;
    console.log(website.innerHTML);

    venueHolder.appendChild(div);
    div.appendChild(phoneNum);
    div.appendChild(name);
    div.appendChild(address);
    div.appendChild(website);
  }

}
