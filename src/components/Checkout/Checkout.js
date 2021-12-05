import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./checkout.css";
import axios from "axios";

function Checkout() {
  useEffect(() => {
    axios
      .get(
        "https://coupon-validator-backend.herokuapp.com/api/v1/coupon/get-coupons"
      )
      .then(function (response) {
        if (response.data.status === 200) {
          setCoupon(response.data.data);
        } else {
          toast.error("Failed to find coupon details", {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch(function (error) {
        toast.error("Some error occurred", {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }, []);

  let [cartValue, setCartValue] = useState(0);
  let [coupon, setCoupon] = useState(null);
  let [status, setStatus] = useState(false);
  let [navState, setNavOpen] = useState("");
  let [buttonState, setButtonState] = useState(false);
  let [discountValue, setDiscountValue] = useState(0);
  let [visibilityState, setVisibilityState] = useState(false);
  let [fieldState, setFieldState] = useState(false);
  let [cartInputState, setCartInputState] = useState();

  let [formErrors, setFormErrors] = useState({
    cartValueError: "",
  });

  let [fieldValidity, setFieldValidity] = useState({
    cartValue: false,
  });

  let [formValid, setFormValid] = useState(false);

  let cartInput = useRef(null);

  let navToggle = () => {
    setStatus((status = !status));
    status ? setNavOpen((navState = "nav--open")) : setNavOpen((navState = ""));
  };

  let resetCartValue = (e) => {
    e.preventDefault();
    setCartValue(0);
    setFieldState(false);
    setButtonState((buttonState = false));
    setVisibilityState((visibilityState = false));
    cartInput.current.value = 0;
  };

  let executeFunctions = (coupon) => {
    navToggle();
    validateCoupon(coupon);
  };

  let validateCoupon = (coupon) => {
    if (coupon.couponExpiryDate <= new Date().getTime()) {
      toast.error("Invalid Coupon - Expired", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (cartValue < coupon.minCartAmount) {
      toast.error("Min. Cart value not met 😥", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
    toast.success(`Valid Coupon - Discount applied`, {
      position: "bottom-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  let updateCartValue = (e) => {
    if (cartInput.current.value < 50 || cartInput.current.value > 5000) {
      setCartValue(0);
    } else {
      e.preventDefault();
      if (cartInput.current.value === "") {
        setCartValue(0);
      } else {
        setCartValue(Number(cartInput.current.value));
      }
    }
  };

  let couponValue = (coupon) => {
    if (coupon.couponType === "Flat Discount") {
      return <span>₹{coupon.couponValue}/-</span>;
    } else {
      return <span>{coupon.couponValue}% off</span>;
    }
  };

  let coupons = [];
  if (coupon !== null) {
    coupons = coupon.map((coupon, i) => {
      return (
        <div className='nav__content' key={i}>
          <div className='nav__coupon-content'>{coupon.couponCode}</div>
          <div className='nav__discount-group'>
            <div className='nav__discount-content'>
              Min. cart value: <span>₹{coupon.minCartAmount}/- </span>
            </div>
            <div className='nav__discount-content'>
              Coupon Value: {couponValue(coupon)}
            </div>
            <div className='nav__discount-content'>
              Max.Discount Amount: <span>₹{coupon.maxDiscountAmount}/- </span>
            </div>
          </div>
          <button
            title='Apply Coupon'
            className='nav__button'
            onClick={() => executeFunctions(coupon)}>
            Apply Coupon
          </button>
        </div>
      );
    });
  }

  return (
    <>
      <nav className={"nav " + navState}>
        <div className={"nav__collapse "}>
          <div className='nav__heading'>Available coupons</div>
          {coupon?.length > 0 ? (
            <div className='nav__wrapper'>{coupons}</div>
          ) : (
            <div className='nav__wrapper-2'>No Coupons Available 😞</div>
          )}
        </div>
        <div className='nav__overlay' onClick={navToggle}></div>
      </nav>
      <section className='card'>
        <div className='card__body'>
          <div className='form-container-1'>
            <form className='form-container__form-1'>
              <div className='form-group'>
                <label className='card__text' htmlFor='cart-value'>
                  Cart value
                </label>
                <div className='card__input-group'>
                  <input
                    type='number'
                    id='cart-value'
                    className='form-control'
                    disabled={fieldState}
                    style={{
                      backgroundColor: fieldState ? "#B8ACAC" : "#F5F3F3",
                      color: fieldState ? "#857D7D" : "#000000",
                    }}
                    min='50'
                    max='5000'
                    ref={cartInput}
                  />
                  <button
                    type='submit'
                    className='card__submit-button'
                    onClick={(e) => updateCartValue(e)}
                    disabled={buttonState}>
                    Apply
                  </button>
                </div>
              </div>
            </form>
          </div>
          <p className='card__value'>₹{cartValue}/-</p>

          <button
            title='Reset'
            type='button'
            className='card__button'
            style={{ marginBottom: "10px" }}
            onClick={resetCartValue}>
            Reset
          </button>

          <button
            title='List Coupons'
            className='card__button'
            style={{ marginBottom: "10px" }}
            onClick={navToggle}
            disabled={buttonState}>
            List Coupons
          </button>

          <Link
            to='../create-coupon'
            className='card__button'
            style={{ textDecoration: "none", color: "black" }}>
            <div>Create Coupon</div>
          </Link>

          <div
            className='card__discount-value'
            style={{ display: visibilityState ? "inline" : "none" }}>
            Discount Value &nbsp; -₹{discountValue}/-
          </div>
        </div>
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
