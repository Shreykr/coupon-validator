import "./card.css";
import React from "react";
import { Link } from "react-router-dom";

import Input from "../../../core/Input/Input";
import Button from "../../../core/Button/Button";

const Card = React.forwardRef((props, ref) => {
  return (
    <div className='card__body'>
      <div className='form-container-1'>
        <form className='form-container__form-1'>
          <div className='form-group'>
            <label className='card__text' htmlFor='cart-value'>
              Cart value
            </label>
            <div className='card__input-group'>
              <Input
                type='number'
                id='cart-value'
                className={
                  "form-control " +
                  (props.fieldState
                    ? "form-control--disable"
                    : "form-control--enable")
                }
                disabled={props.fieldState}
                min='50'
                max='5000'
                ref={ref}
              />
              <Button
                type='submit'
                className={
                  "card__submit-button " +
                  (props.buttonState ? "btn--disable" : "")
                }
                onClick={(e) => props.updateCartValue(e)}
                disabled={props.buttonState}
                value='Apply'
              />
            </div>
          </div>
        </form>
      </div>
      <p className='card__value'>₹{props.cartValue}/-</p>
      <Button
        title='Reset'
        type='button'
        className='card__button card__button--margin'
        onClick={props.resetCartValue}
        value='Reset'
      />

      <Button
        title='List Coupons'
        className={
          "card__button card__button--margin " +
          (props.buttonState ? "btn--disable" : "")
        }
        onClick={props.navToggle}
        disabled={props.buttonState}
        value='List Coupons'
      />

      <Link to='../create-coupon' className='card__button'>
        Create Coupon
      </Link>

      <div
        className={
          "card__discount-value " +
          (props.visibilityState
            ? "card__discount-value--visible"
            : "card__discount-value--invisible")
        }>
        Discount Value &nbsp; -₹{props.discountValue}/-
      </div>
    </div>
  );
});

export default Card;
