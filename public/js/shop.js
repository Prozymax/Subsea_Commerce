const navbar = document.getElementsByClassName("float-categories")[0];
const items = document.querySelectorAll('.items');
const offset = navbar.offsetTop;
const DOM = {
    ConvertToURLQueryParam: (param) => {
        let queryParam = encodeURIComponent(param)
        return queryParam;
    }
}

window.addEventListener("scroll", () => {
    if (window.scrollY >= offset) {
        navbar.classList.add("sticky");
    } 
    else {
        navbar.classList.remove("sticky");
    }
});

for (i = 0; i < items.length; ++i) {
    items[i].addEventListener('click', (e) => {
        const ClickedItem = e.currentTarget,
        newLabel = ClickedItem.firstElementChild,
        productImage = newLabel.nextElementSibling,
        productName = productImage.nextElementSibling.firstElementChild.innerHTML,
        getQuotebutton = productImage.nextElementSibling.lastElementChild.firstElementChild;
        // prodNameQuery = DOM.ConvertToURLQueryParam(productName);
        console.log(productImage);console.log(productName);console.log(getQuotebutton)
    window.location = `/shop/product?productName=${DOM.ConvertToURLQueryParam(productName)}`
    })
}

document.addEventListener('DOMContentLoaded', (event) => {
   event.preventDefault()
    fetch('/shop/product')
    .then((response => {
        if (response.ok) {
            return response.json()
        }
        else {
            throw new Error('Network is not okay, may have been interrupted; Check your data connection..')
        }
    }))
    .then((data) => {
        const message = data.message;
        console.log(message)
    })
})