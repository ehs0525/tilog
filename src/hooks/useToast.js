import { useCallback, useRef, useState } from "react";

const useToast = () => {
  const [, setToastUpdated] = useState(false);
  const toasts = useRef([]);

  const addToast = useCallback((toast, id) => {
    toasts.current = [...toasts.current, { ...toast, id }];
    setToastUpdated((prev) => !prev);
  }, []);

  const deleteToast = useCallback(
    (id) => () => {
      toasts.current = toasts.current.filter((toast) => toast.id !== id);
      setToastUpdated((prev) => !prev);
    },
    []
  );

  return [toasts.current, addToast, deleteToast];
};

export default useToast;
