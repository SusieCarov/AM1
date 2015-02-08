/*
    FILE NAME: booksearch.js
    DATE MODIFIED: 2.8.15
    PURPOSE: Provides search functionality to the booksearch.html
        Takes in user search input and searches the google book api for 10 results.
        It than takes these results and inserts them into the html page.
*/

var button = document.querySelector("button");

//Performs search using the input when the search button is clicked.
button.onclick = function () {
  var input = document.querySelector("#search");
  input = input.value;
	if (input) {
		var baseURL = "https://www.googleapis.com/books/v1/volumes?q=";
		var searchTerm = encodeURI(input);  //takes in user input
		var url = baseURL + searchTerm; //combines the basic url with user search terms

		ajaxRequest(url); //makes request to google for results
	}
}

function ajaxRequest(url) {
  var request = new XMLHttpRequest(); 
  request.open("GET", url); 
  
  request.onload = function() {
    if (request.status == 200) {
      searchResults = (request.responseText);
      displayBooks(searchResults); 
    }
  };
  
  request.send(null); 
}


function displayBooks(result){
  var results = JSON.parse(result);
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
    pubDate.innerHTML = book.volumeInfo.publishedDate.substring(0,4) || "Unknown";
    pubDate.className = "year";

    var bookTitle = document.createElement("h2");
    if (book.volumeInfo.title.length > 35)
        bookTitle.innerHTML = book.volumeInfo.title.substring(0,35).concat("...");
    else bookTitle.innerHTML = book.volumeInfo.title || "Unknown";
      
    var author = document.createElement("h3");
    author.innerHTML = book.volumeInfo.authors[0] || "Unknown";

    var img = document.createElement("IMG");
    if (book.volumeInfo.imageLinks.thumbnail) {
      img.setAttribute("src", book.volumeInfo.imageLinks.thumbnail);
    } else {
      img.setAttribute("src", "placeholder.jpg");
    }

    var para = document.createElement("p");
    if (book.volumeInfo.description.length > 200)
        para.innerHTML = book.volumeInfo.description.substring(0,200).concat("...");
    else para.innerHTML = book.volumeInfo.description;

    bookHolder.appendChild(div);
    div.appendChild(pubDate);
    div.appendChild(bookTitle);
    div.appendChild(author);
    div.appendChild(img);
    div.appendChild(para);
  }

}
