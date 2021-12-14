import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import Checkout from "./components/Checkout/Checkout";
import Coupon from "./components/Coupon/Coupon";

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
