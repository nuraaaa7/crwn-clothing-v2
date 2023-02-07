import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component'
import { useContext } from 'react';
import {CartContext} from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';
import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';

const CartDropdown = ()=>{
   const {cartItems} = useContext(CartContext);
   const navigate = useNavigate();

   const goToCheckout = ()=>{
      navigate('/checkout');
   }

   return (
      <CartDropdownContainer>
         <CartItems>
            {
               cartItems.length > 0 ? (cartItems.map((item)=>{ 
                  return <CartItem key= {item.id} cartitem={item} /> })
                  ) : 
                  <EmptyMessage> Your Cart Is Empty </EmptyMessage>
            }
         </CartItems>
         <Button onClick={goToCheckout}> GO TO CHECKOUT</Button>
      </CartDropdownContainer>
   )
}

export default CartDropdown;