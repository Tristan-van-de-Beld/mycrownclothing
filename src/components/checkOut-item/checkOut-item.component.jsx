import {CheckOutItemContainer} from "./checkOut-item.styles.jsx";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckOutItem = ({ checkOutItem }) => {
  const { name, quantity, imageUrl, price } = checkOutItem;
  const { addItemToCart, decreaseProductAmount, removeItemFromCart } = useContext(CartContext);

  const decreaseItemHandler = () => decreaseProductAmount(checkOutItem)
  const increaseItemHandeler = () => addItemToCart(checkOutItem)
  const removeItemHandler = () => removeItemFromCart(checkOutItem)

  return (
    <CheckOutItemContainer>
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={decreaseItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>{" "}
        <div className="arrow" onClick={increaseItemHandeler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={removeItemHandler}>
        &#10005;
      </div>

      {/* <p>{name}</p>
      <button onClick={() => decreaseProductAmount(checkOutItem)}>←</button>
      <p>{quantity}</p>
      <button onClick={() => addItemToCart(checkOutItem)}>→</button>
      <button onClick={() => removeItemFromCart(checkOutItem)}>✕</button>
      <p>${price}</p> */}
    </CheckOutItemContainer>
  );
};
export default CheckOutItem;
