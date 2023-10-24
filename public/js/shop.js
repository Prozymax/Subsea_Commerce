const navbar = document.getElementsByClassName("float-categories")[0];
const offset = navbar.offsetTop;

window.addEventListener("scroll", () => {
    if (window.scrollY >= offset) {
        navbar.classList.add("sticky");
    } 
    else {
        navbar.classList.remove("sticky");
    }
});