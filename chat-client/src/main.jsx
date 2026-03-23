import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Chats from "./components/Chats.jsx";
import AddChat from "./components/AddChat.jsx";
import "./index.css";
import Layout from "./Layout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Chats />,
      },
      {
        path: "add-chat",
        element: <AddChat />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
