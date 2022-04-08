// Create an array that will be filled with the .json products 
let products = [];

// Current step that increments everytime you press the load more button
let loadMoreStep = 0;

// How many items to load once you click the load more button
let itemsPerStep = 12;

const http = new XMLHttpRequest();
http.open('get', 'products/products.json', true);
http.send();
http.onload = function(){
    if(this.readyState == 4 && this.status == 200){
        let data = JSON.parse(this.responseText);
        for(let item of data){
            // Insert the item data to the products array
            products.push(item);
        }
        // Call the function to show the initial products
        loadMoreProducts();
    }
}

//Create the function
function loadMoreProducts(){

    let output = "";

    // Define the start and end
    // At the start of the page show products 1-12
    // When clicking the button show 13-24 ((0+1)*12=12 so next 12 items)
    // And then the next 12 items once the button is clicked 

    let startIndex = loadMoreStep * itemsPerStep;
    let endIndex = (loadMoreStep + 1) * itemsPerStep;

    // Get the products from the product array
    let productsToLoad = products.slice(startIndex, endIndex);
    console.log("Products to load", productsToLoad);

    //Create the div template for the json products to be placed 
    for(let item of productsToLoad){
        output += `
                <div class="product step-${loadMoreStep}">
                    <img src="${item.images}" alt="${item.name}">
                    <p class="designer">${item.designer}</p>
                    <p class="name">${item.name}</p>
                    <p class="price">${item.price}</p>
                </div>
            `;
    }
    // Append the div to the products class in the HTML
    document.querySelector(".products").innerHTML += output;
    // Increment the steps so the index is incremented by itemsperStep
    loadMoreStep++;
}

// Call the function when the button is clicked
document.querySelector(".btn").addEventListener('click', function(e) {
    loadMoreProducts();

    // Debug and hide button if there are no more products to show
    console.log("displayed products:", (loadMoreStep * itemsPerStep))
    if((loadMoreStep * itemsPerStep) >= products.length){
        console.log("No more products to load, hide button");
        this.style.display = 'none';
    }
})