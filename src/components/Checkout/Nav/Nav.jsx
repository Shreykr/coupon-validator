import Button from "../../../core/Button/Button";
import "./nav.css";

function Nav(props) {
  let coupons = [];
  // Generating coupon list on sidenav
  if (props.coupon !== null) {
    coupons = props.coupon.map((coupon, i) => {
      return (
        <div className='nav__content' key={i}>
          <div className='nav__coupon-content'>{coupon.couponCode}</div>
          <div className='nav__discount-group'>
            <div className='nav__discount-content'>
              Min. cart value: <span>₹{coupon.minCartAmount}/- </span>
            </div>
            <div className='nav__discount-content'>
              Coupon Value: {props.couponValue(coupon)}
            </div>
            <div className='nav__discount-content'>
              Max.Discount Amount: <span>₹{coupon.maxDiscountAmount}/- </span>
            </div>
          </div>
          <Button
            title='Apply Coupon'
            className='nav__button'
            onClick={() => props.executeFunctions(coupon)}
            value='Apply Coupon'
          />
        </div>
      );
    });
  }

  return (
    <>
      <nav className={"nav " + props.navState}>
        <div className={"nav__collapse "}>
          <div className='nav__heading'>Available coupons</div>
          {props.coupon?.length > 0 ? (
            <div className='nav__wrapper'>{coupons}</div>
          ) : (
            <div className='nav__wrapper-2'>No Coupons Available 😞</div>
          )}
        </div>
        <div className='nav__overlay' onClick={props.navToggle}></div>
      </nav>
    </>
  );
}

export default Nav;
