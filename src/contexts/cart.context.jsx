import { createContext, useEffect, useState } from "react";


const addCartItem = (cartitems, itemToAdd) =>{
   const existingCartItem = cartitems.find((item) => item.id === itemToAdd.id
   );

   if (existingCartItem) {
     return cartitems.map((item)=> item.id === existingCartItem.id ? 
         {...item, quantity: item.quantity+1} : item)
   }

   return [...cartitems, {...itemToAdd, quantity:1}]
}

const removeCartItem = (cartitems, itemToRemove)=>{
   if (itemToRemove.quantity === 1){
      return cartitems.filter((item)=> item.id !== itemToRemove.id);
   }

   return cartitems.map((item)=> item.id === itemToRemove.id ? 
   {...item, quantity: item.quantity - 1} : item)   
}

const clearCartItem = (cartitems, itemToRemove)=>{
   return cartitems.filter((item)=> item.id !== itemToRemove.id); 
}


export const CartContext = createContext({
   isCartOpen: false,
   setIsCartOpen: ()=> {},
   cartItems:[],
   addItemToCart: ()=>{},
   removeItemFromCart: ()=>{},
   clearItemFromCart:()=>{},
   cartCount:0,
   cartTotal:0
})

export const CartProvider = ({children}) =>{
   const [isCartOpen, setIsCartOpen] = useState(false);
   const [cartItems, setCartItems] = useState([]);
   const [cartCount, setCartCount] = useState(0);
   const [cartTotal, setCartTotal] = useState(0);

   useEffect(()=>{
      const newCartCount = cartItems.reduce((total, item)=> total+item.quantity, 0);
      setCartCount(newCartCount)
      },[cartItems])


   useEffect(()=>{
      const newCartTotal = cartItems.reduce((total, cartitem)=>total+cartitem.quantity * cartitem.price,0)
      setCartTotal(newCartTotal);
      })

   const addItemToCart = (itemToAdd) =>{
      setCartItems(addCartItem(cartItems, itemToAdd))
      }

   const removeItemFromCart = (itemToRemove) =>{
      setCartItems(removeCartItem(cartItems, itemToRemove))
      }

   const clearItemFromCart = (itemToRemove) =>{
      setCartItems(clearCartItem(cartItems, itemToRemove))
      }

   const value = {
      isCartOpen, 
      setIsCartOpen, 
      cartItems, 
      addItemToCart, 
      removeItemFromCart, 
      clearItemFromCart, 
      cartCount, 
      cartTotal};

   return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}