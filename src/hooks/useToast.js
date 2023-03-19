import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { addToast as add, removeToast } from "../store/toastSlice";

const useToast = () => {
  const dispatch = useDispatch();

  const addToast = useCallback(
    (toast, id) => {
      // toasts.current = [...toasts.current, { ...toast, id }];
      // setToastUpdated((prev) => !prev);
      dispatch(add({ ...toast, id }));
    },
    [dispatch]
  );

  const deleteToast = useCallback(
    (id) => () => {
      // toasts.current = toasts.current.filter((toast) => toast.id !== id);
      // setToastUpdated((prev) => !prev);
      dispatch(removeToast(id));
    },
    [dispatch]
  );

  return { addToast, deleteToast };
};

export default useToast;
