import { Link } from "react-router-dom";
import { randomSelection } from './../util'
import products from './../../data/data.js'

const Content = () => {
  //////////////////////////////////////
  ///Return (render) ///////////////////
  //////////////////////////////////////

  return (
    <div id="contentHome">
      <div>
        <h1>Home</h1>
      </div>
      <div id="landingPage">
        <h2>Welcome to Flags etCetera!</h2>
        <image><img src={randomSelection(products,1)[0].image}></img> </image>
        <div id='copy'>
          <p>
            We've been attempting to let folks with big wallets pay enormous fees for
            webp's since 2023!
          </p>
          <p>
            Our webp inventory is plentiful. Add as many copies
            (within reason) to your shopping cart. Too bad our Checkout backend isn't running yet!
          </p>
          <p className="bold">Browse our inventory now and get shopping!</p>
        </div>
        <Link to="/shop">
          <button>ENTER SHOP</button>
        </Link>
      </div>
    </div>
  );
};

export default Content;
