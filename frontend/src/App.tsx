import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./providers/AuthProvider";
import { router } from "./routes";
import { store } from "./store";
const client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <AuthProvider>
          <ToastContainer />
          <RouterProvider router={router} />
        </AuthProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
