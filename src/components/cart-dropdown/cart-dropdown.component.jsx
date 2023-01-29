import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component'
import { useContext } from 'react';
import {CartContext} from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';

const CartDropdown = ()=>{
   const {cartItems} = useContext(CartContext);
   const navigate = useNavigate();

   const goToCheckout = ()=>{
      navigate('/checkout');
   }

   return (
      <div className='cart-dropdown-container'>
         <div className='cart-items'>
            { cartItems.map((item)=>{ 
               return <CartItem key= {item.id} cartitem={item} /> })}
         </div>
         <Button onClick={goToCheckout}> GO TO CART</Button>
      </div>
   )
}

export default CartDropdown;