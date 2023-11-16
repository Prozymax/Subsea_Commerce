// all dom elements
const spanCategory = document.getElementById('sp-category'),
spanProductname = document.getElementById('sp-prodname'),
headerProdName = document.getElementById('product_name'),
descriptionDOM = document.getElementsByClassName('desc_article')[0],
figProdImage = document.getElementById('fig_prod-image')


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
    headerProdName.innerHTML = pd.product_name
    descriptionDOM.innerHTML = pd.productImageDescription
    figProdImage.src = `http://localhost:3000${pd.productImageUrl}`
}
else {
    console.log('This isnt an object')
}

})

window.onbeforeunload = () => {
    if (!window.location === '/product') {
    localStorage.clear()
    }
}