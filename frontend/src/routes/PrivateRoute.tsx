import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextProvider";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthContext();
  const navigator = useNavigate();
  useEffect(() => {
    if (!user) {
      navigator("/login");
    }
  }, []);

  if (!user) return "Redirecting...";

  return <div>{children}</div>;
};

export default PrivateRoute;
