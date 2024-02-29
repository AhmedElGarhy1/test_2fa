import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Landing from "../pages/Landing";
import GuestRoute from "./GuestRoute";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        index
        element={
          <PrivateRoute>
            <Landing />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      ></Route>
      <Route
        path="login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      ></Route>
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
