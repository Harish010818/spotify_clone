import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useUserData } from "./context/UserContext";
import Loader from "./components/Loader";
import Album from "./pages/Album";
import PlayList from "./pages/Playlist";
import Admin from "./pages/Admin";

function App() {
  const { isAuth, loading } = useUserData();
  if (loading) return <Loader />;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/playlist",
      element: isAuth ? <PlayList /> : <Login />
    },
    {
      path: "/admin/dashboard",
      element: isAuth ? <Admin /> : <Login />
    },
    {
      path: "/login",
      element: isAuth ? <Home /> : <Login />
    },
    {
      path: "/register",
      element: isAuth ? <Home /> : <Register />
    },
    {
      path: "/album/:id",
      element: <Album />
    }
  ]);

  
  return <RouterProvider router={router} />;
}

export default App;
