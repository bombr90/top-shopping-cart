import React, {useEffect, useState} from "react";
import uniqid from "uniqid";
import products from './../../data/data'
import Cart from './Cart';
import Catalogue from "./Catalogue";
import { randomSelection } from './../util'

const Main = () => {
  //////////////////////////////////////
  ///Cart and catalogue state setup/////
  //////////////////////////////////////

  // localStorage.clear()
  const [shoppingCart, setShoppingCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const [cartState, setCartState] = useState({
    display: false,
  });

  const [shoppingCatalogue, setShoppingCatalogue] = useState(
    JSON.parse(
      localStorage.getItem("catalogue")) || { products: createProductsList() }
  );

  // On mount, check for empty cart. Generate a fresh sample catalogue if it is
  useEffect(() => {
    if (shoppingCart.length === 0) {
      setShoppingCatalogue({ products: createProductsList() });
    }
  }, []);

  // Sync 'cart' localstorage with component shoppingCart
  useEffect(
    () => localStorage.setItem("cart", JSON.stringify(shoppingCart)),
    [shoppingCart]
  );

  // On unmount, Save current catalogue (to maintain uniqid's)
  useEffect(() => {
    return () => {
      localStorage.setItem("catalogue", JSON.stringify(shoppingCatalogue));
    };
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
    alert("Checkout functionality not coded.");
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
  ///Helper function////////////////////
  //////////////////////////////////////

  // Create random sample of the JSON data
  function createProductsList() {
    const productsCopy = randomSelection(products, 10).map((product) => {
      product.uid = uniqid();
      return product;
    });
    return productsCopy;
  }

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
      <Cart itemList={shoppingCart} events={eventsCart} state={cartState} />
    </div>
  );
}

export default Main