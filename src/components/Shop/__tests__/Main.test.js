// __tests__/main.test.js

import React from "react";
import ReactDOM from 'react-dom'
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";  // optional
import userEvent from "@testing-library/user-event";
import Main from "./../Main";


describe('Smoke test of Main component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    render(<Main />, div)
  })
})

// localStorage mock
const localStorageMock = {
  getitem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

// Component initialization and rendering testing
describe("Checking initialization and rendering of component", () => {
  it("renders correct headings", () => {
    const { getByRole } = render(<Main />)
    expect(screen.getByRole('heading',{name: 'Catalogue'}).textContent).toMatch('Catalogue')
    expect(screen.getByRole('heading',{name: 'Cart'}).textContent).toMatch('Cart')
    expect(getByRole).toMatchSnapshot();
    // Check that catalogue of 10 items has been rendered
    expect(screen.getAllByRole("button",{name: 'Add to Cart'}).length).toBe(10) 
  })
})

// Cart event function testing

function setup() {return {}}

describe('All Cart events/callbacks from this file', () => {
  describe("handleRemoveClick", () => {
    it("removes item from cart", () => {
    });
  });

  describe("handleQuantityChange", () => {
    it("changes item quantity in cart", () => {});
  });

  describe("handleIncreaseQuantity", () => {
    it("increases item quantity by 1", () => {});
  });

  describe("handleDecreaseQuantity", () => {
    it("deccreases item quantity by 1", () => {});
  });

  describe("handleCheckCart", () => {
    it("chceks out the cart", () => {});
  });

  describe("handleEmptyCart", () => {
    it("clears the cart after confirmation", () => {});
  });

  describe("handleCloseCart", () => {
    it("minimizes (hides) the cart component", () => {
      render(<Main />);
      const openButton = document.getElementById("cartIcon");
      const element = document.getElementById("cart");
      const button = document.getElementsByClassName("escape")[0];
      userEvent.click(openButton)
      expect(element).toBeVisible;
      userEvent.click(button);
      expect(element).not.toBeVisible;
    });
  });


})

//catalogue event function testing
describe("All Catalogue events/callbacks from this file", () => {
  describe("handleItemClick", () => {
    it("adds item from cart", () => {
    });
  });

  describe("handleOpenCart", () => {
    it("displays (un-hides) the cart component", () => {
      render(<Main />)
      const button = document.getElementById('cartIcon')
      const element = document.getElementById('cart')
      expect(element).not.toBeVisible;
      userEvent.click(button);
      expect(element).toBeVisible
    });
  });
});

//Internal function testing
describe("All local functions from this file", () => {
  describe("createProductsList", () => {
    it("generates a sample array of objects from imported data and appends a uid", () => {});
  });
  
  describe("cartCount", () => {



    it('Test Mock Component', () => {
      render(<Main />)
    })

    it("calculates total number of units in the cart", () => {
      render(<Main />)
      
    });
  });

});
