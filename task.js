document.addEventListener('DOMContentLoaded', () => {
    fetch('/products')
        .then(response => response.json())
        .then(data => {
            allProducts = data; 
            displayProducts(data);
        })
        .catch(error => console.error('Error fetching products:', error));


    document.querySelectorAll('.category, .brand').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    document.getElementById('minMax').addEventListener('click', applyFilters);
    document.querySelector('search input').addEventListener('input', applyFilters);
});

let allProducts = [];

function displayProducts(products) {
    let productsContainer = document.querySelector('.products');

   
    if (!productsContainer) {
        productsContainer = document.createElement('div');
        productsContainer.className = 'products';
        document.querySelector('.container').appendChild(productsContainer);
    } else {
        productsContainer.innerHTML = '';  
    }

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <div class="product-image">
                <img src="img/${product.img}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h4>${product.name}</h4>
                <p class="category">${product.category}</p>
                <p class="price">$${product.price}</p>
                <p class="brand">${product.brand}</p>
            </div>
        `;
        productsContainer.appendChild(productElement);
    });
}

function applyFilters() {
    const selectedCategories = Array.from(document.querySelectorAll('.category:checked')).map(cb => cb.value);
    const selectedBrands = Array.from(document.querySelectorAll('.brand:checked')).map(cb => cb.value);
    const minPrice = document.getElementById('min-price').value;
    const maxPrice = document.getElementById('max-price').value;
    const searchQuery = document.querySelector('search input').value.toLowerCase();

    let filteredProducts = allProducts;

    if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter(product => selectedCategories.includes(product.category));
    }

    if (selectedBrands.length > 0) {
        filteredProducts = filteredProducts.filter(product => selectedBrands.includes(product.brand));
    }

    if (minPrice) {
        filteredProducts = filteredProducts.filter(product => product.price >= minPrice);
    }

    if (maxPrice) {
        filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
    }

    if (searchQuery) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchQuery) ||
            product.category.toLowerCase().includes(searchQuery) ||
            product.brand.toLowerCase().includes(searchQuery)
        );
    }

    displayProducts(filteredProducts);
}
