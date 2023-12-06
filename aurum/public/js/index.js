const selectNav = document.getElementsByClassName('__category')[0]
const secBtn = document.getElementsByClassName('sec-btn');
const navItem = document.getElementsByClassName('navItem')[0]
const navCategories = document.querySelectorAll('.nav_Category');
const fTitle = document.getElementsByClassName('f-title');
const fImg = document.getElementsByClassName('f-img');
const spBtn = document.getElementsByClassName('sp-btn')[0];
const viewBtn = document.querySelectorAll('.view-btn');
const fDiv = document.querySelectorAll('.f-div');
const shBtn = document.getElementsByClassName('sh-btn')[0];
const btnNV = document.getElementById('btn-nav');
const readMore = document.getElementsByClassName('read_more');

shBtn.addEventListener('click', () =>{
    localStorage.clear()
    window.location = '/shop'
})

setTimeout(() => {
    if(localStorage.length > 0) {
        localStorage.clear()
    }
}, 20000)

selectNav.addEventListener('mouseover', (e) => {
    navItem.classList = 'hove'
    navItem.addEventListener('mouseleave', () => navItem.classList.remove('hove'))
})

document.getElementsByClassName('sub-btn')[0].disabled = true;

document.addEventListener('DOMContentLoaded', async () => {
    const featProd = fetch('/get-featured')
    .then(response => {
        if(!response.ok) {
            throw new Error('Network Error. Pleae check internet connection and try again')
        }
        return response.json()
    })
    .then(data => {
        const result = data.result; 
        console.log(result); // make them send their data to the product page
        return result
    })
    .catch(error => {
        console.log(`Error  encountered while fetching featureed data... ${error}`)
    })

    const featuredProducts = await featProd;
    featuredProducts.forEach((product, index) => {
                fTitle[index].innerHTML = product.product_name;
        fImg[index].src = `http://localhost:3000${product.productImageUrl}`
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
    console.log(navCategories[i])
    navCategories[i].addEventListener('click', (e) => {
        const refinedText = navCategories[i].textContent.replace('›', '')
        localStorage.setItem('Category', String(refinedText))
        window.location = `/shop`
    })
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
