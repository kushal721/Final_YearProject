import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useAlert = () => {
  const [alertType, setAlertType] = useState("");
  const [message, setMessage] = useState("");

  const showAlert = (type, msg) => {
    setAlertType(type);
    setMessage(msg);
  };

  const showSuccess = (msg) => showAlert("success", msg);
  const showError = (msg) => showAlert("error", msg);
  const showWarning = (msg) => showAlert("warning", msg);
  const showInfo = (msg) => showAlert("info", msg);

  const displayAlert = () => {
    switch (alertType) {
      case "success":
        alert(message);
        break;
      case "error":
        alert(message);
        break;
      case "warning":
        alert(message);
        break;
      case "info":
        alert(message);
        break;
      default:
        break;
    }
  };

  return { showSuccess, showError, showWarning, showInfo, displayAlert };
};

export default useAlert;
