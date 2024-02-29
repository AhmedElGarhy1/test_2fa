import { ReactNode, createContext, useContext } from "react";
import { useQuery } from "react-query";
import baseAxios from "../config/axios";

interface IContext {
  user: IUser | null;
}

let AuthContext = createContext<IContext>({
  user: null,
});

export interface IUser {}

let AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useQuery(
    "user",
    () => baseAxios.get("/auth/me") as any,
    { retry: false }
  );

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div>
      <AuthContext.Provider value={{ user: data?.user || null }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthContextProvider");
  }
  return context;
};
