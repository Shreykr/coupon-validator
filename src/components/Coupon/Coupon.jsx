import { ToastContainer } from "react-toastify";
import { CouponForm } from "./CouponForm/CouponForm";
import "./coupon.css";

function Coupon() {
  return (
    <>
      <section className='coupon-form-container'>
        <CouponForm />
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
