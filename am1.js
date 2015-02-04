var input;
var button = document.querySelector("button");
button.onclick = function () {
  var input = document.querySelector("#search");
  console.log("Your search phrase is: ", input.value);
  input = input.value;
	
	var baseURL = "https://www.googleapis.com/books/v1/volumes?q=";
	var searchTerm = encodeURI(input); // this later needs to get the value from input
	var url = baseURL + searchTerm;
	
	ajaxRequest(url);
}



function ajaxRequest(url) {
  var request = new XMLHttpRequest(); 
  request.open("GET", url); 
  
  request.onload = function() {
    if (request.status == 200) {
      displayBooks(request.responseText); // displayBooks is your function
    }
  };
  
  request.send(null); 
}

// Temporary function, to see that the request works
function displayBooks(result){
  alert("got results: " + result.length);
  var results = JSON.parse(result);
  console.log(results);
}

// invoke the function


