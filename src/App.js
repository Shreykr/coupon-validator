import React from "react";
import Checkout from "./components/Checkout/Checkout";
import Coupon from "./components/Coupon/Coupon";
import { Route, Navigate, Routes } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route
          path='/'
          render={() => <Navigate to='/checkout' />}
          element={<Checkout />}
        />
        <Route path='checkout' element={<Checkout />} />
        <Route path='create-coupon' element={<Coupon />} />
      </Routes>
    </>
  );
}
export default App;
