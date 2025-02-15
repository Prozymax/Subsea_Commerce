const selectNav = document.getElementsByClassName('__category')[0]
const secBtn = document.getElementsByClassName('sec-btn');
const navItem = document.getElementsByClassName('navItem')[0]
const navCategories = document.querySelectorAll('.nav_Category');
const fTitle = document.getElementsByClassName('f-title');
const fImg = document.getElementsByClassName('f-img');
const spBtn = document.getElementsByClassName('sp-btn')[0];
const viewBtn = document.querySelectorAll('.view-btn');
const fDiv = document.querySelectorAll('.f-div');
const btnNV = document.getElementById('btn-nav');
const readMore = document.getElementsByClassName('read_more');


setTimeout(() => {
    if(localStorage.length > 0) {
        localStorage.clear()
    }
}, 20000)


document.addEventListener('DOMContentLoaded', async () => {
    const featProd = fetch('/get-featured')
    .then(response => {
        if(!response.ok) {
            throw new Error('Network Error. Please check internet connection and try again')
        }
        return response.json()
    })
    .then(data => {
        const result = data.result; 
        // console.log(result); // make them send their data to the product page
        return result
    })
    .catch(error => {
        console.log(`Error  encountered while fetching featured data... ${error}`)
    })

    const featuredProducts = await featProd;
    featuredProducts.forEach((product, index) => {
                fTitle[index].innerHTML = product.product_name;
                console.log(`https://admin-aurum.vercel.app${product.productImageUrl}`)
        fImg[index].src = `https://admin-aurum.vercel.app${product.productImageUrl}`
    })
})

fDiv.forEach((product, index) => {
    product.addEventListener('click', () => {
        let data = { message: fTitle[index].textContent }
        localStorage.setItem('ProductData', JSON.stringify(data))
        window.location = '/product'
    })
})

spBtn.addEventListener('click', () => {
    const data = {
        message: 'Marine Personal Protective Equipment'
    }
    console.log(data)
    localStorage.setItem('ProductData', JSON.stringify(data))
    window.location = '/product'
})


for(let i = 0; i <= navCategories.length; i++) {
    const myCategories = ['Head Safety Gears', 'PPEs', 'Hand Tools']
    
    console.log(secBtn[i])
        secBtn[i].addEventListener('click', () => {
            localStorage.setItem('Category', myCategories[i])
            window.location = `/shop`
        })
    
        console.log(viewBtn[i]) 
        const viewfunc = (num) => {
            myCategories[3] = 'Boots'
            myCategories[4] = 'Gloves'
            // alert(myCategories)
            localStorage.setItem('Category', myCategories[num])
            window.location = `/shop`
        }
        viewBtn[i].addEventListener('click', () => {
            viewfunc(i)
        })
        viewBtn[3].addEventListener('click', () => {
            viewfunc(3)
        })
        viewBtn[4].addEventListener('click', () => {
            viewfunc(4)
        })

        readMore[i].addEventListener('click', () => {
            localStorage.setItem('BlogNumber', i)
            window.location = '/blog'
        })
        
}

