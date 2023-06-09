let lists = document.getElementsByClassName("list");
let rightBox = document.getElementById("right");
let leftBox = document.getElementById("left");
let message = document.getElementById("message");
let resetButton = document.getElementById("resetButton");
let initialState = leftBox.innerHTML; // Store the initial state of the left container

// Function to attach drag and drop event listeners
function attachDragListeners(element) {
  element.addEventListener("dragstart", function (e) {
    let selected = e.target;

    // Set custom data type and value for smoother dragging
    e.dataTransfer.setData("text/plain", "");

    rightBox.addEventListener("dragover", function (e) {
      e.preventDefault();
    });
    rightBox.addEventListener("drop", function (e) {
      e.target.appendChild(selected);
      selected.classList.add("dragged-item"); // Add class to the dragged item
      selected = null;
      showMessage("Item dropped successfully!");
    });

    leftBox.addEventListener("dragover", function (e) {
      e.preventDefault();
    });
    leftBox.addEventListener("drop", function (e) {
      e.target.appendChild(selected);
      selected.classList.remove("dragged-item"); // Remove class from the dragged item
      selected = null;
      showMessage("Item dropped successfully!");
    });
  });
}

// Attach drag and drop listeners to initial items
for (let list of lists) {
  attachDragListeners(list);
}

resetButton.addEventListener("click", function () {
  rightBox.innerHTML = ""; // Clear the second container
  message.innerText = ""; // Clear the success message

  // Remove drag and drop listeners from the first container items
  for (let list of lists) {
    list.removeEventListener("dragstart", null);
  }

  leftBox.innerHTML = initialState; // Reset the first container to its initial state

  // Reattach drag and drop listeners to the initial items
  for (let list of lists) {
    attachDragListeners(list);
  }
});

// Function to show the success message and hide it after a timeout
function showMessage(text) {
  message.innerText = text;

  // Hide the message after 2 seconds (2000 milliseconds)
  setTimeout(function () {
    message.innerText = "";
  }, 2000);
}
