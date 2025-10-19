import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useUserData } from "./context/UserContext";
import Loader from "./components/Loader";
import Album from "./pages/Album";

function App() {
  const { isAuth, loading } = useUserData();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: isAuth ? <Home /> : <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/album/:id",
      element: <Album />
    }
  ]);

  
  return loading ? (
    <Loader />
  ) : (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
