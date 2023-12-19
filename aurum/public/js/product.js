// all dom elements
const spanCategory = document.getElementById('sp-category'),
spanProductname = document.getElementById('sp-prodname'),
headerProdName = document.getElementById('product_name'),
descriptionDOM = document.getElementsByClassName('desc_article')[0],
figProdImage = document.getElementById('fig_prod-image'),
endMessage = document.getElementsByClassName('end-mess')[0],
checkMessage = document.getElementsByClassName('check-mess')[0],
errMessage = document.getElementsByClassName('err-mess')[0],
prodQuoteForm = document.getElementsByClassName('prod-quote-form')[0],
responseText = document.getElementsByClassName('response_text');


let storeData = JSON.parse(localStorage.getItem('ProductData'));console.log(storeData)
    const message = (storeData) ? storeData : setTimeout(() => {window.location = '/shop' }, 3)

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
            figure[index].style.backgroundImage = `url('https://admin-aurum.vercel.app${product.productImageUrl}')`
            productName[index].value = product.product_name;
        }
        })
    },
    showAlert: (args, param, responseAray) => {
         endMessage.style.display = 'grid';
            args.style.display = 'block'
            responseText[param].textContent = responseAray;
            setTimeout(() => {
                args.style.display = 'none';
                endMessage.style.display = 'none'
            }, 3000)
            setTimeout(() => { window.location = '#' }, 3000)
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    const storedData = JSON.parse(localStorage.getItem('ProductData'));console.log(storedData)
    const message = (storedData) ? storedData : window.location = '/shop'
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
    //   console.log(data)
    //   console.log(productData)
      return productData
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });


const ProductDetails = await PageProductResponseData;
if (typeof(ProductDetails) === 'object') {
    // console.log(ProductDetails);
    let pd = ProductDetails
    spanProductname.innerHTML = pd.product_name;
    spanCategory.innerHTML = pd.product_category
    headerProdName.value = pd.product_name
    descriptionDOM.innerHTML = pd.productImageDescription
    figProdImage.src = `https://admin-aurum.vercel.app${pd.productImageUrl}`
}
else {
    console.log('This isnt an object')
}

const category = ProductDetails.product_category
// console.log(category)
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
        // console.log(data.result)
        return data.result
    })
    .catch(error => {
        console.error('Error: ', error)
    })

    const relatedprod = await categoryCallback;
    // console.log(relatedprod)
       DOCUMENT.replaceRelativeProducts(relatedprod)



       prodQuoteForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        document.getElementById('loader').style.display = 'grid'
            const mailHandlerEndpoint = '/product/quote-sent';
           const mailResponseHandler = fetch(mailHandlerEndpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
           })
           .then(response => {
            if(!response.ok) {
                return 'Network Encountered. Please check internet connection';
            }
            return response.json()
           })
           .then(data => {
            const message = data.message;
            return message;
           })
           .catch(error => {
            return 'Sorry we encountered an error';
           })
    
    
           const HandlerResponse = await mailResponseHandler;

           if(HandlerResponse =='Mail Sent') {
            document.getElementById('loader').style.display = 'none'
            DOCUMENT.showAlert(checkMessage, 0, HandlerResponse)
            }
           
           else {
            document.getElementById('loader').style.display = 'none'
            DOCUMENT.showAlert(errMessage, 1, HandlerResponse)
           }
    })
})



window.onbeforeunload = () => {
    if (!window.location === '/product') {
    localStorage.clear()
    }
}