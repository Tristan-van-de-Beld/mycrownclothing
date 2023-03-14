import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context.jsx'
import Button from '../button/button.component.jsx'

import './cart-dropdown.styles.scss'

const CartDropDown = () => {
    const {open} = useContext(CartContext)
    return(

        <div className='cart-dropdown-container'>
            <div className='cart-items'/>

            <Button>CHECKOUT</Button>

        </div>
    )
}

export default CartDropDown