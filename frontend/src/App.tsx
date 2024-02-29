import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider from "./context/AuthContextProvider";
import { router } from "./routes";
const client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <AuthContextProvider>
        <ToastContainer />
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default App;
