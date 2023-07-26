let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
};

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.header .navbar a');

window.onscroll = () => {
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
  section.forEach((sec) => {
    let top = window.scrollY;
    let height = sec.offsetHeight;
    let offset = sec.offsetTop - 150;
    let id = sec.getAttribute('id');
    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove('active');
        document.querySelector('.header .navbar a[href*=' + id + ']').classList.add('active');
      });
    }
  });
};

document.querySelector('#search-icon').onclick = () => {
  document.querySelector('#search-form').classList.toggle('active');
};

document.querySelector('#close').onclick = () => {
  document.querySelector('#search-form').classList.remove('active');
};

var swiper = new Swiper(".home-slider", {
  spaceBetween: 50,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true,
});

var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  loop: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// Function to fetch products data from the backend API
async function fetchProductsData() {
  try {
    const response = await fetch('/api/products'); // Use the correct API endpoint
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Return an empty array in case of error
  }
}

// Function to create a product card dynamically
function createProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('box');

  // Create the card's content dynamically using product information
  card.innerHTML = `
    <div class="image">
      <img src="${product.image}" alt="">
      <a href="#" class="fa fa-heart"></a>
    </div>
    <div class="content">
      <div class="stars">
        ${generateStars(product.rating)}
      </div>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <button class="btn add-to-cart" data-id="${product.id}"><a href="/cart.html">add to cart</a></button>
      <span class="price">$${product.price.toFixed(2)}</span>
    </div>
  `;

  return card;
}
// Function to generate stars based on rating
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  return `${'<i class="fa fa-star"></i>'.repeat(fullStars)}
          ${halfStar ? '<i class="fa fa-star-half-alt"></i>' : ''}
          ${'<i class="fa fa-star"></i>'.repeat(emptyStars)}`;
}

// Cart items array to store added products
let cartItems = [];

// Function to add a product to the cart
function addToCart(productId, productName, productPrice) {
  // Add the product to the cartItems array
  const cartItem = {
    id: productId,
    name: productName,
    price: productPrice,
    quantity: 1, // Set the quantity to 1 by default
  };
  cartItems.push(cartItem);
  // Update the cart total and display
  updateCartTotal();
  updateCartDisplay();
}

// Function to update the cart total
function updateCartTotal() {
  // Calculate the total price of all cart items
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  // Update the cart total in the cart.html
  const cartTotalElement = document.querySelector('.subtotal .value');
  cartTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// Function to update the cart display
function updateCartDisplay() {
  // Get the cartWrap element
  const cartWrap = document.querySelector('.cartWrap');
  // Clear the current content of the cartWrap
  cartWrap.innerHTML = '';
  // Add each cart item to the cartWrap
  cartItems.forEach((item) => {
    const cartItemHTML = `
      <li class="items">
        <div class="infoWrap">
          <div class="cartSection">
            <img src="${item.image}" alt="" class="itemImg" />
            <p class="itemNumber">#${item.id}</p>
            <h3>${item.name}</h3>
            <p>${item.quantity} x $${item.price.toFixed(2)}</p>
          </div>
          <div class="prodTotal cartSection">
            <p>$${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <div class="cartSection removeWrap">
            <a href="#" class="remove" data-id="${item.id}">x</a>
          </div>
        </div>
      </li>
    `;
    cartWrap.insertAdjacentHTML('beforeend', cartItemHTML);
  });
}

// Function to initialize Buyfy with products data as props
async function initializeBuyfy() {
  try {
    const products = await fetchProductsData();
    const menuSection = document.getElementById('productContainer');

    if (products.length > 0) {
      menuSection.innerHTML = ''; // Clear existing content
      products.forEach((product) => {
        const productCard = createProductCard(product);
        menuSection.appendChild(productCard);
      });
    } else {
      // Display a message if no products are available
      menuSection.innerHTML = '<p>No products available at the moment.</p>';
    }
  } catch (error) {
    console.error('Error initializing Buyfy:', error);
    // Display an error message if initialization fails
    menuSection.innerHTML = '<p>Failed to initialize Buyfy.</p>';
  }
}
initializeBuyfy();
// Add event listeners to the "add to cart" buttons
document.querySelectorAll('.add-to-cart').forEach((button) => {
  console.log("hello")
  button.addEventListener('click', (event) => {
    const card = button.closest('.box');
    const productId = parseInt(button.dataset.id);
    console.log(productId)
    const productName = card.querySelector('h3').textContent;
    const productPrice = parseFloat(card.querySelector('.price').textContent.slice(1));

    // Add the product to the cart with a default quantity of 1
    addToCart(productId, productName, productPrice);
    window.location.href = '/cart.html';
  });
});

