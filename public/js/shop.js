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



document.addEventListener('DOMContentLoaded', (event) => {
    const fetchData = async () => {
        const prodName = prodNameVar();
        console.log(prodName)
         const queryURL = `/shop/product?productName=${prodName}`;
            try {
        alert(prodNameVar.productName)
                const response = await fetch(queryURL);
                if (!response.ok) {
                    throw new Error('Network is not okay or may have been interrupted . Please check your internet connection')
                }
                const data = await response.json();
                const jsonObject = data.message;
                // console.log(jsonObject)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchData()
    })
const prodNameVar = () => {
    for (i = 0; i < items.length; ++i) {
    items[i].addEventListener('click', (e) => {
        const ClickedItem = e.currentTarget,
        newLabel = ClickedItem.firstElementChild,
        productImage = newLabel.nextElementSibling,
        productName = productImage.nextElementSibling.firstElementChild.innerHTML,
        getQuotebutton = productImage.nextElementSibling.lastElementChild.firstElementChild;
    window.location = `/shop/product?productName=${DOM.ConvertToURLQueryParam(productName)}`
    return productName;
})
}
}