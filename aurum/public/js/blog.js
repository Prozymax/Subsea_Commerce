const closebtn = document.getElementById("closebtn");
const popup = document.getElementById("popup");
const grids = document.querySelectorAll('.grids');
const hTwos = document.getElementsByClassName('headings');
const articles = document.getElementsByClassName('articles')
const Images = document.getElementsByClassName('imgs')
const popTwos = document.getElementsByClassName('pop_h2');
const popArticle = document.getElementsByClassName('pop_article')
const popImage = document.getElementsByClassName('pop_image');

// Add a click event listener to close the popup
closebtn.addEventListener("click", function() {
  popup.style.display = "none";
  localStorage.clear()
});

// Add event listeners to grids to handle hover
grids.forEach(function(grid, index) {
  grid.addEventListener("click", function() {
    popup.style.display = "flex";
    popImage[0].src = Images[index].src;
      popTwos[0].textContent = hTwos[index].textContent;
      popArticle[0].textContent = articles[index].textContent
  });

  // Add a mouseover event listener to change the color of h3 elements when hovering over grids
  grid.addEventListener("mouseover", function() {
    const rdBtn = grid.querySelectorAll("rd-btn");
    rdBtn.forEach(function(h3) {
      h3.style.color = "white";
    });
  });

  // Add a mouseout event listener to revert the color of h3 elements when no longer hovering over grids
  grid.addEventListener("mouseout", function() {
    const rdBtn = grid.querySelectorAll("h3");
    rdBtn.forEach(function(h3) {
      h3.style.color = "rgb(245, 191, 12)"; // Set it back to its original color
    });
  });
});


document.addEventListener('DOMContentLoaded', async () => {
  const savedData = localStorage.getItem('BlogNumber');
  const iterationNumber = Number(savedData)
 if(savedData) {
   alert(typeof(iterationNumber))
      popup.style.display = 'flex';
      popImage[0].src = Images[iterationNumber].src;
      popTwos[0].textContent = hTwos[iterationNumber].textContent;
      popArticle[0].textContent = articles[iterationNumber].textContent
      setTimeout(() => {
        localStorage.clear()
      }, 5000)
 }
 else console.log('no')
})