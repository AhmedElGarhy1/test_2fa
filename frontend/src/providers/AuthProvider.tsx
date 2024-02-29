import React, { useEffect } from "react";
import baseAxios from "../config/axios";
import { useAppDispatch } from "../store";
import { setUser } from "../store/slices/authSlice";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const { data } = await baseAxios.get("/auth/me");
        dispatch(setUser(data));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return children;
};

export default AuthProvider;
