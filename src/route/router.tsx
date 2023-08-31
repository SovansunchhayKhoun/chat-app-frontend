import { createBrowserRouter } from "react-router-dom";
import Home from '../views/Home'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

export default router