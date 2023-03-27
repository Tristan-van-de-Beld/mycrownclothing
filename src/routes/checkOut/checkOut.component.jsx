import {CheckoutContainer, CheckOutHeader, HeaderBlock, Total} from "./checkOut.styles.jsx";
import CheckOutItem from "../../components/checkOut-item/checkOut-item.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckOut = () => {
  const { cartItems, totalPrice } = useContext(CartContext);
  return (
    <CheckoutContainer>
      <CheckOutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckOutHeader>

      {cartItems.map((item) => (
        <CheckOutItem key={item.id} checkOutItem={item} />
      ))}

      <Total as="span">Total: ${totalPrice}</Total>
    </CheckoutContainer>
  );
};

export default CheckOut;
