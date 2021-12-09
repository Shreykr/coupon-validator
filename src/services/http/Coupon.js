import axios from "axios";
import { Toast } from "../../core/Toast/Toast";

export function couponService(type, operation) {
  let getCoupon = (operation) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/coupon/get-coupons`)
      .then(function (response) {
        if (response.data.status === 200) {
          operation(response.data.data);
        } else {
          Toast("error", response.data.message);
        }
      })
      .catch(function (error) {
        Toast("error", "Some Error Occurred");
      });
  };
  if (type === "get-coupons") {
    return getCoupon(operation);
  }
}
