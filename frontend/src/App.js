import './App.css';
import React from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import { LoginComponent } from './components/LoginComponent';
import { User } from './User';
import { Admin } from './Admin';
import { SharedLayouts } from './layouts/SharedLayouts';


function App() {
  // const isLoggedIn = localStorage.getItem('auth_token');
  // const user_type = localStorage.getItem('user_type');
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<SharedLayouts />} >
          <Route index element={<LoginComponent />} />
          <Route path="login" element={<LoginComponent />} />
          <Route path="user" element={<User />} />
          <Route path="admin" element={<Admin />} />
        </Route>
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
