import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains productToadd
  const alreadyInCart = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

  // if found,m increment quantity // if not add item
  if (alreadyInCart) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity+ 1 } : cartItem);
  }

  // return new array with modified cart items
  return [...cartItems, {...productToAdd, quantity: 1}]
};

const decreaseProductQuantity = (cartItems, productToDecrement) =>{

  if(productToDecrement.quantity === 1){
    const index = cartItems.findIndex((item) => item.id === productToDecrement.id)
    cartItems.splice(index, 1)
    return [...cartItems]
  }
 
  return cartItems.map((cartItem) => cartItem.id === productToDecrement.id ? {... cartItem, quantity: cartItem.quantity -1} : cartItem);

}

const removeProductFromCart = (cartItems, productToRemove) => {
  const index = cartItems.findIndex((cartItem) => cartItem.id === productToRemove.id)
  cartItems.splice(index, 1)
  return [...cartItems]
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  decreaseProductAmount: () =>{},
  removeItemFromCart: () => {},
  cartCount: 0,
  totalPrice: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0)


  useEffect(() => {
    const newCartCount = cartItems.reduce((accumulator, current) => accumulator + current.quantity, 0)
    setCartCount(newCartCount)
  }, [cartItems])

  useEffect(() => {
    const newtotalPrice = cartItems.reduce((accumulator, current) => accumulator + current.price * current.quantity, 0)
    setTotalPrice(newtotalPrice)
  }, [cartItems])


  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const decreaseProductAmount = (productToDecrement) => {
    setCartItems(decreaseProductQuantity(cartItems, productToDecrement));
  }

  const removeItemFromCart = (productToRemove) =>{
    setCartItems(removeProductFromCart(cartItems, productToRemove));
  }


 
  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, setCartCount, cartCount, decreaseProductAmount, removeItemFromCart, totalPrice };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
