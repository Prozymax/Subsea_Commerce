const navbar = document.getElementsByClassName("float-categories")[0];
const items = document.querySelectorAll('.items');
const offset = navbar.offsetTop;
const navCategory = document.getElementsByClassName('navCategory');;
const phSop = document.getElementsByClassName('ph-shop')[0]
const dbCount = document.getElementById('dbcount');
const prodTitle = document.querySelectorAll('#prodname');
const figProd = document.querySelectorAll('#fig-prod');
const savedlocal = localStorage.getItem('Category')
window.addEventListener("scroll", () => {
    if (window.scrollY >= offset) {
        navbar.classList.add("sticky");
    }
    else {
        navbar.classList.remove("sticky");
    }
});

const DOM = {
    
    createProductDiv: (product) => {
        let div = document.createElement('div')
        div.classList.add('items');
        div.innerHTML = `
        <span>Sale</span>
                <figure id="fig-prod" style="background-image: url('http://localhost:3000${product.productImageUrl}')" class="fig_prod"></figure>
                <section>
                    <form action="shop/product" method="post" class="product-form">
                    <input type="text" class="prod_name" name="prodname" value="${product.product_name}" id="prodname" readonly/>
                    <p><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></p>
                    <article>
                        <button>Get Quote</button>
                    </article>
                    </form>
                </section>
        `;
        return div;
    },
    navOperation: (productListArray, category) => {
        document.getElementById('loader').style.display = 'grid'
        document.body.style.overflow = 'hidden'
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none'
            document.body.style.overflow = 'scroll'
            document.body.style.overflowX = 'hidden'
            window.scrollTo({
                top: 100,
                behavior: 'smooth'
            })
        }, 3000)
        while(phSop.firstChild) {
            phSop.removeChild(phSop.firstChild)
        }
        productListArray.forEach((product) => {
            if(product.product_category == category) {
                console.log(product.product_name + product.product_category)
                const catDiv = DOM.createProductDiv(product);
                phSop.appendChild(catDiv);
                dbCount.innerHTML = document.getElementsByClassName('items').length
            }
        })
    },
    backgroundManipulation: (args) => {
        for(let num = 0; num < 5; num++) {
            navCategory[num].style.backgroundColor = 'inherit';
        }
        navCategory[args].style.backgroundColor = 'var(--secondaryAccent)';
    }
}

document.addEventListener('DOMContentLoaded', async () => {
const endpoint = 'shop/get_all_products';

const productList = fetch(endpoint)
.then(response => {
    if(!response.ok) {
        throw new Error(`Network Error. ${response.status}`)
    }
    return response.json()
})
.then(data => {
    const productData =data.result;
    console.log(data)
    console.log(productData)
    console.log(productData)
    return productData
})
.catch(error => {
    console.error('There was a problem with the fetch operation:', error);
});
const productListArray = await productList;



const appendProduct = (productarray) => {
    productListArray.forEach((product) => {
        const productDiv = DOM.createProductDiv(product);
        phSop.appendChild(productDiv);
        dbCount.innerHTML = document.getElementsByClassName('items').length
    })
}

document.getElementsByClassName('all_Category')[0].addEventListener('click', () => {
    localStorage.clear();
    document.getElementById('loader').style.display = 'grid'
        document.body.style.overflow = 'hidden'
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none'
            document.body.style.overflow = 'scroll'
            document.body.style.overflowX = 'hidden'
            window.scrollTo({
                top: 100,
                behavior: 'smooth'
            })
            appendProduct()
        }, 3000)
})

navCategory[0].addEventListener('click', () =>{
    DOM.navOperation(productListArray, 'Hand Tools')
    DOM.backgroundManipulation(0);
})
navCategory[1].addEventListener('click', () =>{
    DOM.navOperation(productListArray, 'Head Safety Gear')
    DOM.backgroundManipulation(1)
})
navCategory[2].addEventListener('click', () =>{
    DOM.navOperation(productListArray, 'PPEs')
    DOM.backgroundManipulation(2)
})
navCategory[3].addEventListener('click', () =>{
    DOM.navOperation(productListArray, 'Boots')
    DOM.backgroundManipulation(3)
})
navCategory[4].addEventListener('click', () =>{
    DOM.navOperation(productListArray, 'Gloves')
    DOM.backgroundManipulation(4)
})

appendProduct()

const savedArray = ['Hand Tools', 'Head Safety Gears', 'PPEs', 'Boots', 'Gloves']

if(savedlocal) {
    const savedItem = localStorage.getItem('Category').trim()
    console.log(true)
for(let i = 0; i < savedArray.length; i++) {
    if(savedItem === savedArray[i]) {
        DOM.navOperation(productListArray, savedArray[i])
        console.log(savedArray[i])
    }
}
}

    const productForm = document.querySelectorAll('.product-form');
    console.log(productForm)
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
                alert(data)
                window.location = '/product'
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        });;
})
 
})






// document.addEventListener('DOMContentLoaded', () => {
//     productForm.forEach((form) => {
//         form.addEventListener('submit', async (event) => {
//             event.preventDefault();

//             const formData = new FormData(form);
//             const prodname = formData.get('prodname');
//             const endpoint = 'shop/product';
//             console.log(formData.getAll(form))
//             // Make a POST request to the server
//             fetch(endpoint, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ prodname: prodname }),
//             })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 // Handle the data received from the server
//                 alert(JSON.stringify(data));
//                 localStorage.setItem('ProductData', JSON.stringify(data))
//                 console.log(data)
//                 window.location = '/product'
//             })
//             .catch(error => {
//                 console.error('There was a problem with the fetch operation:', error);
//             });
//         });
//     });
// });


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
