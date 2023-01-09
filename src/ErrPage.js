import Header from "./components/Header";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";

const ErrPage = () => {
  return (
    <div id="errpage">
      <Header />
      <div id="landingPage">
        <h1>404 Oops!</h1>
        <p className="bold">
          We can't seem to find the page you're looking for.
        </p>
        <Link to="/">
          <button>Back to Home</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default ErrPage