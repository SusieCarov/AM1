var input;
var thingy;

var button = document.querySelector("button");
button.onclick = function () {
  var input = document.querySelector("#search");
  input = input.value;
	if (input) {
		var baseURL = "https://www.googleapis.com/books/v1/volumes?q=";
		var searchTerm = encodeURI(input); // this later needs to get the value from input
		var url = baseURL + searchTerm;

		ajaxRequest(url);
	}
}

function ajaxRequest(url) {
  var request = new XMLHttpRequest(); 
  request.open("GET", url); 
  
  request.onload = function() {
    if (request.status == 200) {
      searchResults = (request.responseText);
      displayBooks(searchResults); // displayBooks is your function
    }
  };
  
  request.send(null); 
}

// Temporary function, to see that the request works
function displayBooks(result){
  var results = JSON.parse(result);
  thingy = results.items[0]; //don't forget to take this out

    
      bookHolder = document.getElementById("searchResults");

  if(bookHolder) {
    bookHolder.innerHTML = "";
  }
  for (i in results.items)
  {
    var book = results.items[i];
    var div = document.createElement("div");
    div.className = "bookInfo";

    var pubDate = document.createElement("div");
    pubDate.innerHTML = book.volumeInfo.publishedDate.substring(0,4);
    pubDate.className = "year";

    var bookTitle = document.createElement("h2");
    bookTitle.innerHTML = book.volumeInfo.title;

    var author = document.createElement("h3");
    author.innerHTML = book.volumeInfo.authors[0];

    var img = document.createElement("IMG");
    if (book.volumeInfo.imageLinks.thumbnail) {
      img.setAttribute("src", book.volumeInfo.imageLinks.thumbnail);
    } else {
      img.setAttribute("src", "placeholder.jpg");
    }

    var para = document.createElement("p");
    para.innerHTML = book.volumeInfo.description.substring(0,300).concat("...");

    bookHolder.appendChild(div);
    div.appendChild(pubDate);
    div.appendChild(bookTitle);
    div.appendChild(author);
    div.appendChild(img);
    div.appendChild(para);
  }

}
