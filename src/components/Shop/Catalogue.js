import Item from './Item'
import React from 'react';

const Catalogue = ({products, events, state, count}) => {

  const displayItems = products.map((product) => (
    <Item
      key={product.uid}
      uid={product.uid}
      title={product.title}
      price={product.price}
      image={product.image}
      onClick={events.addItem}
    />
  ));
  
  return (
    <div id="catalogue">
      <div>
        <h1>Catalogue</h1>
        <button
          id="cartIcon"
          className={state.display === false ? "" : "hide"}
          onClick={events.openCart}
        >
          <div>Cart</div>
          <div id="cartCounter" className={count > 0 ? "" : "hide"}>
            {count}
          </div>
        </button>
      </div>
      <div id="itemStack">
        {displayItems}
      </div>
    </div>
  );
}

export default Catalogue