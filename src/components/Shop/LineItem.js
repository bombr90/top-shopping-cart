const LineItem = ({ uid, image, title, price, quantity, events }) => {
  return (
    <li className="lineItem" id={uid}>
      <div className="image">
        <img src={image} alt=""></img>
      </div>
      <div className="bold">{title}</div>
      <div className="italic">
        <span>${price}ea</span>
        <span> x {quantity}</span>
      </div>
      <div>
        <button onClick={events.decreaseQuantity}>-</button>
        <input
          type="number"
          value={quantity}
          min="0"
          max="99"
          onChange={events.inputQuantity}
        ></input>
        <button onClick={events.increaseQuantity}>+</button>
      </div>
      <div className="bold">
        Sub Total: ${(Math.round(price * quantity * 100) / 100).toFixed(2)}
      </div>
      <button className="bold" onClick={events.removeItem}>
        Remove from Cart
      </button>
    </li>
  );
};

export default LineItem;
