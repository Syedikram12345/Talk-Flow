import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Chats from "./components/Chats.jsx";
import AddChat from "./components/AddChat.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Feedback from "./components/Feedback.jsx";
import Profile from "./components/Profile.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import SignIn from "./components/auth/SignIn.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Notifications from "./components/Notifications.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Chats /> },
      { path: "add-chat", element: <AddChat /> },
      { path: "feedback", element: <Feedback /> },
      { path: "profile", element: <Profile /> },
      { path: "notifications", element: <Notifications /> },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
