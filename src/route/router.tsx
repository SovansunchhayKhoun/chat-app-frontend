import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../layout/MainLayout'
import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register"
import ErrorPage from "../views/ErrorPage";
import ChatView from "../views/ChatView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "chat",
        element: <ChatView />,
      },
      {
        path: "*",
        element: <ErrorPage />
      }
    ]
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

export default router