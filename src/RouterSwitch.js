import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Shop from './Shop';
import ErrPage from './ErrPage';

const RouteSwitch = () => {
  return (
    <BrowserRouter basename="/top-shopping-cart">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="*" element={<ErrPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;