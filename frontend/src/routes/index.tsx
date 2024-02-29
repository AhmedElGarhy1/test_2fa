import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Landing from "../pages/Landing";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<>home</>}></Route>
      <Route path="register" element={<Register />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route
        path="landing"
        element={
          <PrivateRoute>
            <Landing />
          </PrivateRoute>
        }
      ></Route>
    </Route>
  )
);
