import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Chats from "./components/Chats.jsx";
import AddChat from "./components/AddChat.jsx";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
