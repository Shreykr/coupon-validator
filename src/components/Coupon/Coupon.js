import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./coupon.css";
import axios from "axios";

function Coupon() {
  let [formErrors, setFormErrors] = useState({
    couponCodeError: "",
    couponTypeError: "",
    couponValueError: "",
    couponStartDateError: "",
    couponExpiryDateError: "",
    minCartValueError: "",
    maxDiscountError: "",
  });
  let [fieldValidity, setFieldValidity] = useState({
    couponCode: false,
    couponType: false,
    couponValue: false,
    couponStartDate: false,
    couponExpiryDate: false,
    minCartValue: false,
    maxDiscount: false,
  });

  let [formValid, setFormValid] = useState(false);

  let [couponCode, setCouponCode] = useState("");
  let [couponType, setCouponType] = useState("");
  let [couponValue, setCouponValue] = useState(0);
  let [couponStartDate, setCouponStartDate] = useState();
  let [couponExpiryDate, setCouponExpiryDate] = useState();
  let [minCartValue, setMinCartValue] = useState(0);
  let [maxDiscount, setMaxDiscount] = useState(0);

  let [buttonState, setButtonState] = useState(false);
  let [fieldState, setFieldState] = useState(false);
  let [cartValueState, setCartValueState] = useState(false);

  let updateAndValidate = (event) => {
    validate(event);
    updateFieldState();
  };

  let validate = (event) => {
    let fieldValue;
    let str = event.target.value;
    let num = Number(str);
    if (!isNaN(num)) {
      fieldValue = num;
    } else {
      fieldValue = str;
    }
    let formError = formErrors;
    let fieldValidate = fieldValidity;
    if (event.target.name === "couponCode") {
      if (fieldValue.length <= 0) {
        formError.couponCodeError = "Code cannot be empty";
        fieldValidate.couponCode = false;
      } else if (fieldValue.length > 9) {
        formError.couponCodeError = "Code cannot be greater than 9 characters";
        fieldValidate.couponCode = false;
      } else if (fieldValue.length < 6) {
        formError.couponCodeError = "Atleast 6 characters required";
        fieldValidate.couponCode = false;
      } else {
        formError.couponCodeError = "";
        fieldValidate.couponCode = true;
      }
      if (fieldValidate.couponCode) {
        setCouponCode((couponCode = fieldValue));
      } else {
        toast.error(formError.couponCodeError, {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else if (event.target.name === "couponType") {
      if (fieldValue.length <= 0) {
        formError.couponTypeError = "Must select a coupon type";
        fieldValidate.couponType = false;
      } else {
        formError.couponTypeError = "";
        fieldValidate.couponType = true;
      }
      if (fieldValidate.couponType === true) {
        setCouponType((couponType = fieldValue));
      }
      if (couponType === "Percentage Discount") {
        if (couponValue > 100) {
          formError.couponTypeError = "Coupon value must be less than 100";
          fieldValidate.couponType = false;
          setCouponValue((couponValue = 0));
        }
      } else if (couponType === "Fixed Discount") {
        if (couponValue > 0) {
          fieldValidate.maxDiscount = true;
          setMaxDiscount((maxDiscount = couponValue));
        }
      }
      if (fieldValidate.couponType === false) {
        toast.error(formError.couponTypeError, {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else if (event.target.name === "couponValue") {
      if (fieldValue <= 0) {
        formError.couponValueError = "Must enter a valid value";
        fieldValidate.couponValue = false;
      } else if (couponType === "") {
        formError.couponValueError = "Must select a coupon type";
        fieldValidate.couponValue = false;
      } else if (couponType === "Percentage Discount") {
        if (fieldValue > 100) {
          formError.couponValueError = "Value cannot exceed 100%";
          fieldValidate.couponValue = false;
        } else {
          formError.couponValueError = "";
          fieldValidate.couponValue = true;
          setCouponValue((couponValue = fieldValue));
        }
      } else {
        formError.couponValueError = "";
        fieldValidate.couponValue = true;
      }
      if (
        couponType === "Flat Discount" &&
        fieldValue > 0 &&
        fieldValidate.couponValue
      ) {
        setCouponValue((couponValue = fieldValue));
        setMaxDiscount((maxDiscount = fieldValue));
        fieldValidate.maxDiscount = true;
      }
      if (fieldValidate.couponValue === false) {
        toast.error(formError.couponValueError, {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      updateCartValueField();
    } else if (event.target.name === "minCartValue") {
      if (fieldValue <= 0) {
        formError.minCartValueError = "Valid value required";
        fieldValidate.minCartValue = false;
      } else if (couponValue === 0) {
        formError.minCartValueError = "Coupon value required";
        fieldValidate.minCartValue = false;
      } else if (fieldValue < maxDiscount) {
        formError.minCartValueError = "Value must be greater than coupon value";
        fieldValidate.minCartValue = false;
      } else if (fieldValue > 5000) {
        formError.minCartValueError = "Min.Cart Value cannot exceed 5000";
        fieldValidate.minCartValue = false;
      } else {
        formError.minCartValueError = "";
        fieldValidate.minCartValue = true;
      }
      if (fieldValidate.minCartValue) {
        setMinCartValue((minCartValue = fieldValue));
      } else {
        toast.error(formError.minCartValueError, {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else if (event.target.name === "maxDiscount") {
      if (fieldValue <= 0) {
        formError.maxDiscountError = "Must enter a valid value";
        fieldValidate.maxDiscount = false;
      } else if (fieldValue <= 0) {
        formError.maxDiscountError = "Enter a valid value";
        fieldValidate.maxDiscount = false;
      } else if (couponType === "") {
        formError.maxDiscountError = "Must select a coupon type";
        fieldValidate.maxDiscount = false;
      } else {
        formError.maxDiscountError = "";
        fieldValidate.maxDiscount = true;
      }
      if (fieldValidate.maxDiscount) {
        setMaxDiscount((maxDiscount = fieldValue));
      } else {
        toast.error(formError.maxDiscountError, {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else if (event.target.name === "couponStartDate") {
      if (fieldValue.length <= 0) {
        formError.couponStartDateError = "Must select a date";
        fieldValidate.couponStartDate = false;
      } else {
        formError.couponStartDateError = "";
        fieldValidate.couponStartDate = true;
      }
      let selectedDate = new Date(event.target.value).getTime();
      if (selectedDate < new Date().getTime()) {
        formError.couponStartDateError = "Date must be in the future";
        fieldValidate.couponStartDate = false;
      }
      if (fieldValidate.couponStartDate) {
        setCouponStartDate((couponStartDate = selectedDate));
      } else {
        toast.error(formError.couponStartDateError, {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else if (event.target.name === "couponExpiryDate") {
      if (fieldValue.length <= 0) {
        formError.couponExpiryDateError = "Must select an expiry date";
        fieldValidate.couponExpiryDate = false;
      } else {
        formError.couponExpiryDateError = "";
        fieldValidate.couponExpiryDate = true;
      }
      let selectedDate = new Date(event.target.value).getTime();
      if (couponStartDate === "") {
        formError.couponExpiryDateError = "Must enter start date";
        fieldValidate.couponExpiryDate = false;
      } else if (selectedDate <= couponStartDate) {
        formError.couponExpiryDateError = "Date must be after start date";
        fieldValidate.couponExpiryDate = false;
      }
      if (fieldValidate.couponExpiryDate) {
        setCouponExpiryDate((couponExpiryDate = selectedDate));
      } else {
        toast.error(formError.couponExpiryDateError, {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    setFormErrors(formError);
    setFieldValidity(fieldValidate);
    validateForm();
  };

  let validateForm = () => {
    let formValidity = fieldValidity;
    if (
      formValidity.couponCode &&
      formValidity.couponType &&
      formValidity.couponValue &&
      formValidity.minCartValue &&
      formValidity.maxDiscount &&
      formValidity.couponStartDate &&
      formValidity.couponExpiryDate
    ) {
      setFormValid((formValid = true));
      updateButtonState();
    } else {
      setFormValid((formValid = false));
      updateButtonState();
    }
  };

  let updateButtonState = () => {
    if (formValid) {
      setButtonState((buttonState = true));
    } else {
      setButtonState((buttonState = false));
    }
  };

  let updateFieldState = () => {
    if (couponType === "Flat Discount") {
      setFieldState(true);
    } else if (couponType === "Percentage Discount") {
      setFieldState(false);
    }
  };

  let updateCartValueField = () => {
    if (couponValue > 0 && fieldValidity.couponValue) {
      setCartValueState((cartValueState = true));
    } else {
      setCartValueState((cartValueState = false));
    }
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    if (formValid) {
      var formJson = {
        couponCode: couponCode,
        couponType: couponType,
        couponValue: couponValue,
        minCartAmount: minCartValue,
        maxDiscountAmount: maxDiscount,
        couponStartDate: couponStartDate,
        couponExpiryDate: couponExpiryDate,
      };
      axios
        .post(
          "https://coupon-validator-backend.herokuapp.com/api/v1/coupon/add-coupon",
          formJson
        )
        .then(function (response) {
          if (response.data.status === 200) {
            toast.success("Coupon Created 😄", {
              position: "bottom-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else if (response.data.status === 400) {
            toast.error("Failed to create coupon 😥", {
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
          toast.error("Some Error Occurred 😥", {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  return (
    <>
      <section className='coupon-form-container'>
        <div className='form-container'>
          <form className='form-container__form'>
            <div className='form-container__form__group'>
              <label className='form-container__label' htmlFor='coupon-code'>
                Coupon Code
              </label>
              <input
                type='text'
                name='couponCode'
                placeholder='Enter Coupon Code'
                id='coupon-code'
                className='form-container__input'
                onBlur={validate}
              />
            </div>
            <div className='form-container__form__group'>
              <input
                type='radio'
                name='couponType'
                defaultValue='Flat Discount'
                id='coupon-type'
                className='form-container__input'
                onChange={updateAndValidate}
              />
              Flat Discount
              <input
                type='radio'
                name='couponType'
                defaultValue='Percentage Discount'
                id='coupon-type'
                className='form-container__input'
                onChange={updateAndValidate}
              />
              Percentage Discount
            </div>
            <div className='form-container__form__group'>
              <label className='form-container__label' htmlFor='coupon-value'>
                Coupon Value
              </label>
              <input
                type='number'
                name='couponValue'
                placeholder='Enter Coupon Value'
                id='coupon-value'
                className='form-container__input'
                onBlur={validate}
              />
            </div>
            <div className='form-container__form__group'>
              <label
                className='form-container__label'
                htmlFor='min-cart-amount'>
                Minimum Cart Amount
              </label>
              <input
                type='number'
                name='minCartValue'
                placeholder='Enter min.cart amount'
                id='min-cart-amount'
                disabled={!cartValueState}
                className='form-container__input'
                onBlur={validate}
              />
            </div>
            <div className='form-container__form__group'>
              <label
                className='form-container__label'
                htmlFor='max-discount-amount'>
                Maximum Discount Amount
              </label>
              <input
                type='number'
                name='maxDiscount'
                id='max-discount-amount'
                className='form-container__input'
                defaultValue={maxDiscount}
                disabled={fieldState}
                onBlur={validate}
              />
            </div>
            <div className='form-container__form__group'>
              <label className='form-container__label' htmlFor='start-date'>
                Start Date
              </label>
              <input
                type='datetime-local'
                name='couponStartDate'
                id='start-date'
                className='form-container__input'
                onBlur={validate}
              />
            </div>
            <div className='form-container__form__group'>
              <label className='form-container__label' htmlFor='expiry-date'>
                Expiry Date
              </label>
              <input
                type='datetime-local'
                name='couponExpiryDate'
                id='expiry-date'
                className='form-container__input'
                onBlur={validate}
              />
            </div>
            <button
              title='Submit Button'
              type='button'
              className='form-container__button'
              disabled={!buttonState}
              onClick={handleSubmit}>
              Submit
            </button>
          </form>
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

export default Coupon;
