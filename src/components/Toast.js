import React from "react";
import PropTypes from "prop-types";

const Toast = ({ toasts, deleteToast }) => {
  return (
    <div className="position-fixed bottom-0 end-0 p-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`alert alert-${
            toast.type || "success"
          } m-0 py-2 mt-2 cursor-pointer`}
          onClick={deleteToast(toast.id)}
        >
          {toast.text}
        </div>
      ))}
    </div>
  );
};

Toast.propTypes = {
  toasts: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      type: PropTypes.string,
    })
  ).isRequired,
  deleteToast: PropTypes.func.isRequired,
};

Toast.defaultProps = {
  toasts: [],
};

export default Toast;
