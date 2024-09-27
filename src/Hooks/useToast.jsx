
import { toast, Bounce } from "react-toastify";

export const useToast = () => {
   const showToast = (message, options = {}) => {
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      ...options, // allow customization for specific toasts
    });
  };

  return { showToast };
};
