import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store";
import { selectUser } from "../store/slices/authSlice";

const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector(selectUser);
  const navigator = useNavigate();
  useEffect(() => {
    if (user) {
      navigator("/landing");
    }
  }, []);

  if (user) return "Redirecting...";

  return <div>{children}</div>;
};

export default GuestRoute;
