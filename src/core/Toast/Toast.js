import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Toast(type, message) {
  // toast message on error
  let errorToast = (message) => {
    return toast.error(message, {
      position: "bottom-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }; // end of errorToast

  // toast message on success
  let successToast = (message) => {
    return toast.success(message, {
      position: "bottom-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }; // end of successToast

  if (type === "error") {
    errorToast(message);
  } else if (type === "success") {
    successToast(message);
  }
}
