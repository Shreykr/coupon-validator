import React, { useState, useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import { Toast } from "../../core/Toast/Toast";

import Nav from "./Nav/Nav";
import Card from "./Card/Card";

import "react-toastify/dist/ReactToastify.css";
import "./checkout.css";

import { couponService } from "../../services/http/Coupon";

function Checkout() {
  let [cartValue, setCartValue] = useState(0);
  let [coupon, setCoupon] = useState(null);
  let [status, setStatus] = useState(false);
  let [navState, setNavOpen] = useState("");
  let [buttonState, setButtonState] = useState(false);
  let [discountValue, setDiscountValue] = useState(0);
  let [visibilityState, setVisibilityState] = useState(false);
  let [fieldState, setFieldState] = useState(false);

  useEffect(() => {
    couponService("get-coupons", setCoupon);
  }, []);

  let cartInput = useRef(null);

  let resetCartValue = (e) => {
    e.preventDefault();
    setCartValue(0);
    setFieldState(false);
    setButtonState((buttonState = false));
    setVisibilityState((visibilityState = false));
    cartInput.current.value = "";
  };

  let executeFunctions = (coupon) => {
    navToggle();
    validateCoupon(coupon);
  };

  let navToggle = () => {
    setStatus((status = !status));
    status ? setNavOpen((navState = "nav--open")) : setNavOpen((navState = ""));
  };

  let validateCoupon = (coupon) => {
    if (coupon.couponExpiryDate <= new Date().getTime()) {
      Toast("error", "Invalid Coupon - Expired");
    } else if (cartValue < coupon.minCartAmount) {
      Toast("error", "Min. Cart value not met 😥");
    } else {
      updateCart(coupon);
    }
  };

  let updateCart = (coupon) => {
    if (coupon.couponType === "Flat Discount") {
      setCartValue(cartValue - coupon.couponValue);
      setDiscountValue((discountValue = coupon.couponValue));
    } else {
      let tempResult = (cartValue * coupon.couponValue) / 100;
      if (tempResult <= coupon.maxDiscountAmount) {
        setCartValue(cartValue - tempResult);
        setDiscountValue((discountValue = tempResult));
      } else {
        setCartValue(cartValue - coupon.maxDiscountAmount);
        setDiscountValue((discountValue = coupon.maxDiscountAmount));
      }
    }
    setButtonState(true);
    setFieldState(true);
    setVisibilityState(true);
    Toast("success", "Valid Coupon - Discount applied");
  };

  let updateCartValue = (e) => {
    if (cartInput.current.value < 50 || cartInput.current.value > 5000) {
      setCartValue(0);
    } else {
      e.preventDefault();
      cartInput.current.value === ""
        ? setCartValue(0)
        : setCartValue(Number(cartInput.current.value));
    }
  };

  let couponValue = (coupon) =>
    coupon.couponType === "Flat Discount" ? (
      <span>₹{coupon.couponValue}/-</span>
    ) : (
      <span>{coupon.couponValue}% off</span>
    );

  return (
    <>
      <Nav
        cartValue={cartValue}
        updateCart={updateCart}
        coupon={coupon}
        couponValue={couponValue}
        navState={navState}
        navToggle={navToggle}
        executeFunctions={executeFunctions}
      />
      <section className='card'>
        <Card
          fieldState={fieldState}
          buttonState={buttonState}
          visibilityState={visibilityState}
          discountValue={discountValue}
          resetCartValue={resetCartValue}
          updateCartValue={updateCartValue}
          cartValue={cartValue}
          navToggle={navToggle}
          ref={cartInput}
        />
      </section>
      <ToastContainer
        theme='dark'
        position='bottom-center'
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </>
  );
}

export default Checkout;
