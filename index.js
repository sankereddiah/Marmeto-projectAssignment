// Function to fetch data from API
async function fetchData() {
    try {
      const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }
  
  // Function to calculate discount percentage
  function calculateDiscountPercentage(price, compareAtPrice) {
    const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
    return Math.round(discount);
  }
  
  // Function to generate product cards based on category
  async function showProducts(category) {
    const data = await fetchData();
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = '';
  const {categories}=data
  
  let modData=null;
  if(category==="Men"){
      modData=categories[0]
  }
  else if(category==="Women"){
      modData=categories[1]
  }
  else{
      modData=categories[2]
  }
  
  const{category_products}=modData
  console.log(category_products)
    const categoryData = category_products;
    for (let product of categoryData) {
      const card = document.createElement('div');
      card.classList.add('product-card');
  
      // Create card elements
      const image = document.createElement('img');
      image.src = product.image;
      image.classList.add("image")
  
      
  
      const title = document.createElement('h3');
      title.innerText = product.title;
      title.classList.add("title")
  
      const vendor = document.createElement('p');
      vendor.innerText = ` ${product.vendor}`;
  
      const price = document.createElement('p');
      price.innerText = `RS${product.price}`;
      price.classList.add("price")
  
      const compareAtPrice = document.createElement('p');
      compareAtPrice.innerText = `${product.compare_at_price}`;
      compareAtPrice.classList.add("compare")
  
      const discount = document.createElement('p');
      discount.innerText = `${calculateDiscountPercentage(product.price, product.compare_at_price)}% off`;
      discount.classList.add("discount")
      
      const addToCartBtn = document.createElement('button');
      addToCartBtn.innerText = 'Add to Cart';
      addToCartBtn.classList.add('add-to-cart');
  
      // Append elements to card
      card.appendChild(image);
      
      card.appendChild(title);
      card.appendChild(vendor);
      card.appendChild(price);
      card.appendChild(compareAtPrice);
      card.appendChild(discount);
      card.appendChild(addToCartBtn);
  
      // Append card to product container
      productContainer.appendChild(card);
    };
  }
  
  // Initially display products for the default category (e.g., 'men')
  showProducts('Men');
  