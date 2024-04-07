// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

document.addEventListener("DOMContentLoaded", () => {
  const errorModal = document.querySelector("#modal");
  errorModal.classList.add("hidden");

  const emptyHearts = document.querySelectorAll(".like-glyph");

  // Function to handle server response
  function handleServerResponse(response) {
    if (response === "success") {
      return Promise.resolve(); // Resolve promise if successful
    } else {
      return Promise.reject("Server error"); // Reject promise with error message
    }
  }

  // Event listener for clicking on empty hearts
  emptyHearts.forEach((heart) => {
    heart.addEventListener("click", () => {
      mimicServerCall()
        .then((response) => {
          // Server returned success
          heart.innerText = FULL_HEART;
          heart.classList.add("activated-heart");
        })
        .catch((error) => {
          // Server returned failure
          const modalMessage = document.querySelector("#modal-message");
          modalMessage.textContent = error;
          errorModal.classList.remove("hidden");
          setTimeout(() => {
            errorModal.classList.add("hidden");
          }, 3000);
        });
    });
  });

  // Event listener for clicking on full hearts
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("activated-heart")) {
      // Change full heart back to empty heart
      event.target.innerText = EMPTY_HEART;
      event.target.classList.remove("activated-heart");
    }
  });
});



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
