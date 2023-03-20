import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import useToast from "./hooks/useToast";
import NavBar from "./components/NavBar";
import Toast from "./components/Toast";
import LoadingSpinner from "./components/LoadingSpinner";
import ProtectedRoute from "./ProtectedRoute";
import routes from "./routes";
import { login } from "./store/authSlice";

const App = () => {
  const toasts = useSelector((state) => state.toast.toasts);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const { deleteToast } = useToast();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      dispatch(login());
    }
    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <BrowserRouter>
      <NavBar />
      <Toast toasts={toasts} deleteToast={deleteToast} />
      <div className="container mt-3">
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.auth ? (
                  <ProtectedRoute element={route.element} />
                ) : (
                  route.element
                )
              }
            />
          ))}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
