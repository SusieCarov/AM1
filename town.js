var venueHolder = 0;
var apiKey = "4563ba26ae40bfc14b6f866baaaa038e6c927df7";
var baseURL = "http://api.locu.com/v1_0/venue/search/?api_key=" 
            + apiKey;
var urlWithLocation = baseURL + "&locality=wellesley&region=ma";
var locationButton = document.querySelector("button");
var entriesItems = document.querySelectorAll("div.entriesItems");
console.log(entriesItems);

locationButton.onclick = function () {
  var input = document.querySelector("#search");
  input = input.value;
	if (input) {
    var location = input.split(", ");
    var city = encodeURI(location[0]);
    var state = encodeURI(location[1]);
    var url = baseURL + "&locality=" + city;
    url += "&region=" + state;
    urlWithLocation = url;
    url += "&callback=displayVenue";
    jsonpRequest(url);
	}
}

//recreationButton, beautyButton, laundryButton, Fashion, restaurant, bookstore
entriesItems[0].onclick = function () {
  categoryRequest("recreation");
}

entriesItems[1].onclick = function () {
  categoryRequest("beauty");
}

entriesItems[2].onclick = function () {
  categoryRequest("laundry");
}

entriesItems[3].onclick = function () {
  categoryRequest("fashion");
}

entriesItems[4].onclick = function () {
  categoryRequest("bookstore");
}

function categoryRequest(category) {
    var url = urlWithLocation;
    url += "&category=" + category + "&callback=displayVenue";
    jsonpRequest(url);   
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
