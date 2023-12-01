// all dom elements
const spanCategory = document.getElementById('sp-category'),
spanProductname = document.getElementById('sp-prodname'),
headerProdName = document.getElementById('product_name'),
descriptionDOM = document.getElementsByClassName('desc_article')[0],
figProdImage = document.getElementById('fig_prod-image')

const DOCUMENT = {
    getElements: () => {
        const figure = document.getElementsByClassName('fig_prod'),
        productName = document.getElementsByClassName('prod_name')
        return { figure, productName }
        
    },
    replaceRelativeProducts: (productList) => {
    const { figure, productName } = DOCUMENT.getElements()
        productList.forEach((product, index) => {
            if(productList.length <= figure.length ) {
            figure[index].style.backgroundImage = `url('http://localhost:3000${product.productImageUrl}')`
            productName[index].value = product.product_name;
        }
        })
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const storedData = JSON.parse(localStorage.getItem('ProductData'))
    const message = (storedData) ? storedData : 'No Data Acquired'
    console.log(message);
    const prodname = storedData.message;console.log(prodname)
    const endpoint = `product/product_details?prodname=${encodeURIComponent(prodname)}`

  const PageProductResponseData = fetch(endpoint)
  .then(response => {
      if(!response.ok) {
          throw new Error(`Network Error. ${response.status}`)
      }
      return response.json()
  })
  .then(data => {
      const productData = data.result;
      console.log(data)
      console.log(productData)
      return productData
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });


const ProductDetails = await PageProductResponseData;
if (typeof(ProductDetails) === 'object') {
    console.log(ProductDetails);
    let pd = ProductDetails
    spanProductname.innerHTML = pd.product_name;
    spanCategory.innerHTML = pd.product_category
    headerProdName.value = pd.product_name
    descriptionDOM.innerHTML = pd.productImageDescription
    figProdImage.src = `http://localhost:3000${pd.productImageUrl}`
}
else {
    console.log('This isnt an object')
}

const category = ProductDetails.product_category
console.log(category)
const categoryCallback = fetch('product/product-category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ category: category })
    })
    .then(response => {
        if(!response.ok) {
        throw new Error('Network Error. Please Check your internet connection and try again')
        }
        return response.json()
    })
    .then(data => {
        console.log(data.result)
        return data.result
    })
    .catch(error => {
        console.error('Error: ', error)
    })

    const relatedprod = await categoryCallback;
    console.log(relatedprod)
       DOCUMENT.replaceRelativeProducts(relatedprod)
})


window.onbeforeunload = () => {
    if (!window.location === '/product') {
    localStorage.clear()
    }
}