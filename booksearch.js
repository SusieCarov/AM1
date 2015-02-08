var button = document.querySelector("button");
button.onclick = function () {
  var input = document.querySelector("#search");
  input = input.value;
	if (input) {
		var baseURL = "https://www.googleapis.com/books/v1/volumes?q=";
		var searchTerm = encodeURI(input); 
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
