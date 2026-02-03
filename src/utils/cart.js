const CART_KEY = "noise_cart";

export const getCart = () => {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const setCart = (items) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  // same-tab updates
  window.dispatchEvent(new Event("cartUpdated"));
};

export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.qty || 0), 0);
};

export const getCartSubtotal = () => {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 0), 0);
};

export const addToCart = (product, qty = 1) => {
  const cart = getCart();
  const idx = cart.findIndex((i) => i.id === product.id);
  if (idx >= 0) {
    cart[idx] = { ...cart[idx], qty: (cart[idx].qty || 0) + qty };
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      qty,
    });
  }
  setCart(cart);
};

export const updateQty = (productId, qty) => {
  const cart = getCart();
  const next = cart
    .map((item) => (item.id === productId ? { ...item, qty } : item))
    .filter((item) => (item.qty || 0) > 0);
  setCart(next);
};

export const removeFromCart = (productId) => {
  const cart = getCart();
  const next = cart.filter((item) => item.id !== productId);
  setCart(next);
};

export const clearCart = () => setCart([]);

