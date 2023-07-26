// Initialize an empty cart array to store cart items
let cart = [];

// Function to add a cart item to the cart array
// function addToCartFunction(cart) {
//   cart.push(cart);
// }

// Function to update the cart total
function updateCartTotal() {
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 5.00; // Sample shipping cost
  const tax = 0.10 * subtotal; // Sample tax at 10% of subtotal
  const total = subtotal + shipping + tax;

  // Update the subtotal, shipping, tax, and total elements in the HTML
  const subtotalElement = document.querySelector('.subtotal .value');
  const shippingElement = document.querySelector('.shipping .value');
  const taxElement = document.querySelector('.tax .value');
  const totalElement = document.querySelector('.total .value');

  subtotalElement.textContent = '$' + subtotal.toFixed(2);
  shippingElement.textContent = '$' + shipping.toFixed(2);
  taxElement.textContent = '$' + tax.toFixed(2);
  totalElement.textContent = '$' + total.toFixed(2);

  // Update the cart display
  updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
  const cartWrap = document.querySelector('.cartWrap');
  cartWrap.innerHTML = '';

  cart.forEach((item) => { // Change cartItems to cart here
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

// Event listener to execute when the DOM content has loaded
document.addEventListener('DOMContentLoaded', () => {
  updateCartTotal();
});

// Add event listener to the "remove" button in cart display
document.querySelector('.cartWrap').addEventListener('click', (event) => {
  if (event.target.classList.contains('remove')) {
    const itemId = parseInt(event.target.dataset.id);
    // Remove the item from the cart array
    cart = cart.filter((item) => item.id !== itemId);
    // Update the cart total and display
    updateCartTotal();
  }
});
