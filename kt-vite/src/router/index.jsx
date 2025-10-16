import { createHashRouter, Navigate } from "react-router-dom";
import MainPage from "../pages/MainPage";
import MonitoringPage from "../pages/MonitoringPage";
import SettingsPage from "../pages/SettingsPage";

export const router = createHashRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/monitoring" replace />,
      },
      {
        path: "monitoring",
        element: <MonitoringPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);
