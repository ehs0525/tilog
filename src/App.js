import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import useToast from "./hooks/useToast";
import NavBar from "./components/NavBar";
import Toast from "./components/Toast";
import routes from "./routes";

const App = () => {
  const [toasts, addToast, deleteToast] = useToast();

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
              element={route.component}
            />
          ))}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
