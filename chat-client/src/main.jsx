import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Chats from "./components/Chats.jsx";
import AddChat from "./components/AddChat.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Feedback from "./components/Feedback.jsx";

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
      {
        path: "feedback",
        element: <Feedback />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
