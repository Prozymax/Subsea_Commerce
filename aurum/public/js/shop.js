const navbar = document.getElementsByClassName("float-categories")[0];
const items = document.querySelectorAll('.items');
const productForm = document.querySelectorAll('.product-form');
const offset = navbar.offsetTop;
window.addEventListener("scroll", () => {
    if (window.scrollY >= offset) {
        navbar.classList.add("sticky");
    } 
    else {
        navbar.classList.remove("sticky");
    }
});


document.addEventListener('DOMContentLoaded', () => {
    productForm.forEach((form) => {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const prodname = formData.get('prodname');
            const endpoint = 'shop/product';
            console.log(formData.getAll(form))
            // Make a POST request to the server
            fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prodname: prodname }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle the data received from the server
                alert(JSON.stringify(data));
                localStorage.setItem('ProductData', JSON.stringify(data))
                console.log(data)
                window.location = '/product'
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        });
    });
});

// document.addEventListener('DOMContentLoaded', () => {
//     fetch('shop/hello')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network is reallly bads')
//         }
//         return response.json()
//     })
//     .then(data => {
//         console.log(data)
//         alert(data)
//     })
// })