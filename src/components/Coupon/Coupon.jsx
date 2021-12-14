import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./coupon.css";

import { CouponForm } from "./CouponForm/CouponForm";

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
