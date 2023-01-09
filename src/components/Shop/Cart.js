import LineItem from './LineItem'

const Cart = ({itemList, events, state}) => {

  const displayItems = itemList.map((item) => (
    <LineItem
      key={item.uid}
      uid={item.uid}
      image={item.image}
      title={item.title}
      price={item.price}
      quantity={item.quantity}
      events={events}
    />
  ));

  const cartTotal = () => {
    const total = itemList.reduce((acc, obj) => {
    return(acc + obj.price * obj.quantity)
    },0);
    return (Math.round(total*100)/100).toFixed(2)
  }

  return (
    <div id="cart" className={state.display === true ? "" : "hide"}>
      <div className="flex-reverse sticky-top">
        <button className="escape" onClick={events.closeCart}>
          &#10005;
        </button>
        <div>
          <h1>Cart</h1>
        </div>
      </div>
      <div className={itemList.length > 0 ? "hide" : "emptyCart bold"}>
        Your cart is empty.
      </div>
      <ul>{displayItems}</ul>
      <div id="cart-gui" className="sticky-bottom">
        <div className="bold">Cart Total: ${cartTotal()}</div>
        <div>
          <button onClick={events.checkCart} disabled={itemList.length === 0}>
            Checkout
          </button>
          <button onClick={events.emptyCart} disabled={itemList.length === 0}>
            Empty Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart