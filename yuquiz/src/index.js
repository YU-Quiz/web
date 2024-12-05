import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./routes/router";
import { RouterProvider } from "react-router-dom";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify"; // ToastContainer 임포트
import "react-toastify/dist/ReactToastify.css"; // Toastify 스타일 임포트
const root = ReactDOM.createRoot(document.getElementById("root"));
Modal.setAppElement("#root");

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);
