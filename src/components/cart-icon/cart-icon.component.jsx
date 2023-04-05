import { useContext } from 'react'

import { CartContext } from '../../contexts/cart.context'

import {ShoppingIcon, CartIconContainer, ItemCount} from './cart-icon.styles.jsx'

const CartIcon = () => {
    // This grabs the state of isCartOpen from the context and provides the function to update that state.
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext)

    // This sets the is cart open to the inverse of what it is currently set to
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )

}

export default CartIcon