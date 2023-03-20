import { useContext } from 'react'

import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'

import { CartContext } from '../../contexts/cart.context'

import './cart-icon.styles.scss'

const CartIcon = () => {
    // This grabs the state of isCartOpen from the context and provides the function to update that state.
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext)

    // This sets the is cart open to the inverse of what it is currently set to
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);






    return(
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{cartCount}</span>
        </div>
    )

}

export default CartIcon