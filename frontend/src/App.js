import './App.css';
import React from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate
} from "react-router-dom";
import { LoginComponent } from './LoginComponent';
import { User } from './User';
import { Admin } from './Admin';


function App() {
  // const isLoggedIn = localStorage.getItem('auth_token');
  // const user_type = localStorage.getItem('user_type');
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route index path="/login" element={<LoginComponent />} />
        <Route path="/user" element={<User />} />
        <Route path="/admin" element={<Admin />} />
        {/* <Route
          path="/user"
          element={
            isLoggedIn ? (
              user_type === 'User' ? (
                <User />
              ) : (
                <Navigate to="/admin" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin"
          element={
            isLoggedIn ? (
              user_type === 'Admin' ? (
                <Admin />
              ) : (
                <Navigate to="/user" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        /> */}
      </>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
