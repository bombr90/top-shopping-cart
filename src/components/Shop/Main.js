import React, {useState} from "react";
import uniqid from "uniqid";
import products from './../../data/data'
import Cart from './Cart';
import Catalogue from "./Catalogue";
import {shuffle} from './../util'

// Create local copy of JSON data for store maintained while on the shopping page
  
const productsList = (() => {
  const productsCopy = products.map((product) => {
    product.uid = uniqid();
    return product;
  });
  return shuffle(productsCopy)
})();

const Main = () => {
  const [shoppingCart, setShoppingCart] = useState([]);

  const [cartState, setCartState] = useState({
    display: false,
  });

  const [shoppingCatalogue, setShoppingCatalogue] = useState({
    products: productsList,
  });

  //////////////////////////////////////
  ///Shopping Cart Callbacks////////////
  //////////////////////////////////////

  const handleRemoveClick = (event) => {
    const uid = event.target.parentElement.id;
    setShoppingCart((prev) => {
      return prev.filter((el) => el.uid !== uid);
    });
  };

  const handleCheckCart = () => {
    alert("Checkout functionality not coded.")
  };

  const handleCloseCart = () => setCartState({ display: false });

  const handleEmptyCart = () => {
    return window.confirm("Are you sure you want to empty your cart?")
      ? setShoppingCart([])
      : false;
  };

  const handleIncreaseQuantity = (event) => {
    const uid = event.target.parentElement.parentElement.id;
    setShoppingCart((prev) => {
      return prev.map((el) =>
        el.uid === uid ? { ...el, quantity: Math.min(el.quantity++, 99) } : el
      );
    });
  };

  const handleDecreaseQuantity = (event) => {
    const uid = event.target.parentElement.parentElement.id;
    setShoppingCart((prev) => {
      return prev.map((el) =>
        el.uid === uid ? { ...el, quantity: Math.max(el.quantity--, 1) } : el
      );
    });
  };

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    if (value < 0 || value > 99) return;
    const uid = event.target.parentElement.parentElement.id;
    setShoppingCart(
      shoppingCart.map((el) =>
        el.uid === uid
          ? { ...el, quantity: Math.max(1, value, Math.min(value, 99)) }
          : el
      )
    );
  };

  const addProductToCart = (uid, data) => {
    setShoppingCart((prev) => {
      const index = prev.findIndex((el) => el.uid === uid);
      if (index >= 0) {
        return prev.map((el) =>
          el.uid === uid ? { ...el, quantity: Math.min(el.quantity++, 99) } : el
        );
      } else {
        data.quantity = 1;
        return [...prev, data];
      }
    });
  };

  const eventsCart = {
    removeItem: handleRemoveClick,
    inputQuantity: handleQuantityChange,
    increaseQuantity: handleIncreaseQuantity,
    decreaseQuantity: handleDecreaseQuantity,
    checkCart: handleCheckCart,
    emptyCart: handleEmptyCart,
    closeCart: handleCloseCart,
  };

  //////////////////////////////////////
  ///Catalogue Callbacks////////////////
  //////////////////////////////////////

  const handleOpenCart = () => setCartState({ display: true });

  const cartCount = () =>
    shoppingCart.reduce((acc, obj) => acc + obj.quantity, 0);

  const handleItemClick = (event) => {
    const uid = event.target.parentElement.id;
    const data = shoppingCatalogue.products.find((el) => el.uid === uid);
    addProductToCart(uid, data);
  };

  const eventsCatalogue = {
    addItem: handleItemClick,
    openCart: handleOpenCart,
   };

  //////////////////////////////////////
  ///Return (render) ///////////////////
  //////////////////////////////////////

  return (
    <div id="mainShop">
      <Catalogue
        products={shoppingCatalogue.products}
        events={eventsCatalogue}
        state={cartState}
        count={cartCount()}
      />
      <Cart 
      itemList={shoppingCart} 
      events={eventsCart}
      state={cartState}
      />
    </div>
  );
}

export default Main