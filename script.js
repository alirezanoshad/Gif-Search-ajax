"use strict";

// generated API Key
let apiKey = "jH6uoqBtYSapxznEeShB2bt7GjfJexrw";

//// html refrences
let submitBtn = document.getElementById("submit-btn");
let loader = document.querySelector(".loader");
let resultList = document.querySelector(".resultList");
// get search value

// display -12- gifs in the result
let gifCount = 12;

// main function (sending request to api and displaying gifs)
function generateGif() {
  // display loader until gifs load
  loader.style.display = "block";
  resultList.style.display = "none";
  let searchInput = document.querySelector("#searchBox").value;

  // API URL ==> including apikey toacces, input to fing relevant gifs, gifcount
  let finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchInput}&limit=${gifCount}&offset=0&rating=g&lang=en`;
  // clear previous gif list
  resultList.innerHTML = "";

  // create a new XHR object
  let xhr = new XMLHttpRequest();

  // sending a GET request with open method
  xhr.open("GET", finalURL, true);

  // set up a listener for the response
  xhr.onreadystatechange = function () {
    // if request finished && server returned a successful response
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Parse the response JSON
      let info = JSON.parse(xhr.responseText);
      console.log(info.data);

      // All GIFs
      let gifsData = info.data;
      gifsData.forEach((gif) => {
        // Generate cards for every GIF(12 gifs ==> 12 cards)
        let gifContainer = document.createElement("div");
        gifContainer.classList.add("gifContainer");
        let gifImg = document.createElement("img");
        console.log(gif);
        gifImg.setAttribute("src", gif.images.downsized_medium.url);

        gifImg.onload = () => {
          // reduce the gifCount if img correctly downloaded
          gifCount--;
          // if all GIFs have loaded, hide the loader and display the UI(container)
          if (gifCount === 0) {
            loader.style.display = "none";
            resultList.style.display = "grid";
          }
        };
        gifContainer.append(gifImg);

        // copy link button
        let copyBtn = document.createElement("button");
        copyBtn.innerText = "Copy Link";
        copyBtn.onclick = () => {
          // Append the obtained ID to default URL
          let copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;
          // Copy text inside the text field
          navigator.clipboard.writeText(copyLink);
          Swal.fire({
            title: "Copied!",
            icon: "success",
            draggable: true,
          });
        };
        gifContainer.append(copyBtn);
        resultList.append(gifContainer);
      });

      // if request finished but had no server response
    } else if (xhr.readyState === 4) {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Failed to Get GIFs..
        Please try again
        Error:: ${xhr.status}
        `,
        footer:
          '<a href="https://media4.giphy.com/media/Q6WPVzFU8LcBWWgQE1/giphy.mp4">Why do I have this issue?</a>',
      });
    }
  };
  // send the request
  xhr.send();
}

// calling generateGif function on screen load or when user clicks on submit
submitBtn.addEventListener("click", generateGif);
document.addEventListener("DOMContentLoaded", () => {
  searchBox.value = "shrek";
  generateGif();
});
