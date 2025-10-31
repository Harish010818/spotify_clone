import axios from "axios";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import toast, { Toaster } from "react-hot-toast";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  playlist: string[];
}

interface UserContextType {
  user: User | null;
  isAuth: boolean;
  loading: boolean;
  btnLoading: boolean;
  loginUser: (
    email: string,
    password: string,
    navigate: (path: string) => void
  ) => Promise<void>;
  registerUser: (
    name: string,
    email: string,
    password: string,
    navigate: (path: string) => void
  ) => Promise<void>;
  addToPlaylist: (id: string) => void;
  logoutUser: (navigate: (path: string) => void) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  async function registerUser(
  name: string,
  email: string,
  password: string,
  navigate: (path: string) => void
) {
  setBtnLoading(true);
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_USER_SERVICE_API_URL}/api/v1/user/register`,
      { name, email, password },
      { withCredentials: true } //👈 important for cookies
    );

    toast.success("Account created successfully!");
    setUser(data.user);
    setIsAuth(true);
    setBtnLoading(false);
    navigate("/");
  } catch (error: any) {
    toast.error(error.response?.data?.message || "An error occurred");
    setBtnLoading(false);
  }
}

  async function loginUser(
    email: string,
    password: string,
    navigate: (path: string) => void
  ) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_USER_SERVICE_API_URL}/api/v1/user/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },

          withCredentials: true,
        }
      );
      
      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occured");
      setBtnLoading(false);
    }
  }

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_USER_SERVICE_API_URL}/api/v1/user/me`,
        {
          withCredentials: true,
        }
      );

      setUser(data.user);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  async function logoutUser(navigate: (path: string) => void) {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_USER_SERVICE_API_URL}/api/v1/user/logout`,
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setUser(null);
      setIsAuth(false);
      navigate("/login");
    } catch (error) {
      navigate("/login");
      console.log(error);
    }
  }

async function addToPlaylist(id: string) {
  console.log(id);
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_USER_SERVICE_API_URL}/api/v1/user/song/${id}`,
      {}, // 👈 body (empty because koi data send nahi ho raha)
      {
        withCredentials: true, // 👈 config (correct position)
      }
    );

    toast.success(data.message);
    fetchUser();
  } catch (error: any) {
    toast.error(error.response?.data?.message || "An Error Occurred");
  }
}


  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        isAuth,
        btnLoading,
        loginUser,
        registerUser,
        logoutUser,
        addToPlaylist,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const useUserData = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserProvider");
  }
  return context;
};
