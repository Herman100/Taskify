import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Error from "./components/Error/Error";
import Layout from "./Layout";
import CreateTodo from "./components/Todos/CreateTodo";
import CompletedTasks from "./components/Todos/Completed/CompletedTasks";
import Personal from "./components/Todos/Personal/Personal";
import Work from "./components/Todos/Work/Work";
import SignUp from "./components/UserAuth/SignUp";
import Login from "./components/UserAuth/Login";
import AuthContextProvider from "./contexts/AuthContextProvider";
import Settings from "./components/ProfileSettings/Settings";
import ForgotPassword from "./components/UserAuth/ForgotPassword";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index path="signup" element={<SignUp />} />
      <Route index path="/login" element={<Login />} />
      <Route index path="/reset" element={<ForgotPassword />} />
      <Route path="/" element={<Layout />}>
        <Route index path="Taskify" element={<Home />} />
        <Route index path="create" element={<CreateTodo />} />
        <Route index path="personal" element={<Personal />} />
        <Route index path="work" element={<Work />} />
        <Route index path="completed" element={<CompletedTasks />} />
        <Route index path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Error />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
