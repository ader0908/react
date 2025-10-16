import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider
      router={router}
      basename={import.meta.env.VITE_PUBLIC_URL}
    />
  </StrictMode>
);
