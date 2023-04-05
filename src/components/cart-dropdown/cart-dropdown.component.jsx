import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../contexts/cart.context.jsx'


import Button from '../button/button.component.jsx'

import CartItem from '../cart-item/cart-item.component.jsx'

import {CartDropDownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles.jsx'

const CartDropDown = () => {
    const { cartItems } = useContext(CartContext)
    const navigate = useNavigate()
    const goToCheckoutHandler = () => {
        navigate('/checkOut')
    }

    return(

        <CartDropDownContainer>
            <CartItems>
                {cartItems.length ? (cartItems.map((item) => (<CartItem key={item.id} cartItem={item}/>))): <EmptyMessage>Your cart is empty</EmptyMessage> }
                

            </CartItems>
      
            <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>


        </CartDropDownContainer>
    )
}

export default CartDropDown