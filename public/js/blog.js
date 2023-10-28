const closebtn = document.getElementById("closebtn");
const popup = document.getElementById("popup");
const grids = document.querySelectorAll('.grids');

// Add a click event listener to close the popup
closebtn.addEventListener("click", function() {
  popup.style.display = "none";
});

// Add event listeners to grids to handle hover
grids.forEach(function(grid) {
  grid.addEventListener("click", function() {
    popup.style.display = "flex";
  });

  // Add a mouseover event listener to change the color of h3 elements when hovering over grids
  grid.addEventListener("mouseover", function() {
    const h3Elements = grid.querySelectorAll("h3");
    h3Elements.forEach(function(h3) {
      h3.style.color = "white";
    });
  });

  // Add a mouseout event listener to revert the color of h3 elements when no longer hovering over grids
  grid.addEventListener("mouseout", function() {
    const h3Elements = grid.querySelectorAll("h3");
    h3Elements.forEach(function(h3) {
      h3.style.color = "rgb(245, 191, 12)"; // Set it back to its original color
    });
  });
});
