import { getToken } from './users-service';

const BASE_URL = '/api/orders';

// Retrieve an unpaid order for the logged in user
export function getCart() {
  return fetch(`${BASE_URL}/cart`, getOptionsGet()).then(res => res.json());
}

// Retrieve an unpaid order for the logged in user
export function addItemToCart(itemId) {
  const options = getOptionsPost();
  // Just send itemId for best security
  return fetch(`${BASE_URL}/cart/items/${itemId}`, options).then(res => res.json());
}

// Update the item's qty in the cart - will add the item if not currently in the cart
// Sending info via the data payload instead of a long URL
export function setItemQtyInCart(itemId, newQty) {
  const options = getOptionsPut();
  // Add the payload to the request - must be stringify'd
  options.body = JSON.stringify({ itemId, newQty });
  return fetch(`${BASE_URL}/cart/qty`, options).then(res => res.json());
}

export function checkout() {
  const options = getOptionsPost();
  return fetch(`${BASE_URL}/cart/checkout`, options).then(res => res.json());
}

export function getOrderHistory() {
  const options = getOptionsGet();
  return fetch(`${BASE_URL}/history`, options).then(res => res.json());
}

/*-- Helper Functions --*/

function getOptionsGet() {
  return {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  };
}

function getOptionsPost() {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    }
  };
}

function getOptionsPut() {
  return {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    }
  };
}

