// const Order = require('../../models/order');
// const Item = require('../../models/item');

module.exports = {
  cart,
  addToCart,
  setItemQtyInCart,
  checkout,
};

async function cart(req, res) {
  // A cart is the unpaid order for a user

}

async function addToCart(req, res) {
  // Add the item to the cart

}

// Updates an item in the cart's qty
async function setItemQtyInCart(req, res) {
}

async function checkout(req, res) {
  // Update the cart's isPaid property to true

}
