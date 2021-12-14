import axios from "axios";
import { Toast } from "../../core/Toast/Toast";

export function couponService(type, operation = undefined, data = {}) {
  const getCoupon = (operation) => {
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

  const addCoupon = (data) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/coupon/add-coupon`, data)
      .then(function (response) {
        if (response.data.status === 200) {
          Toast("success", "Coupon Created 😄");
        } else if (response.data.status === 400) {
          Toast("error", "Failed to create coupon 😥");
        } else if (response.data.status === 403) {
          Toast("error", response.data.message);
        }
      })
      .catch(function (error) {
        Toast("error", "Some Error Occurred 😥");
      });
  };

  if (type === "get-coupons") {
    return getCoupon(operation);
  }
  if (type === "add-coupon") {
    return addCoupon(data);
  }
}
