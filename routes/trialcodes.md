<!-- // ${DOM.ConvertToURLQueryParam(productName)}
document.addEventListener('DOMContentLoaded', () => {
    const fetchData = async () => {
        const url = `/shop/product?productName=port`
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network is not okay or may have been interrupted . Please check your internet connection')
            }
            const data = await response.json();
            const jsonObject = data.message;
            console.log(jsonObject)
        }
        catch (error) {
            console.log(error)
        }
    }
    fetchData()
}) -->