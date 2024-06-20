import './App.css';
import React from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { LoginComponent } from './components/LoginComponent';
import { SharedLayouts } from './layouts/SharedLayouts';
import Exams from './components/exams/Exams';
import Exam from './components/exams/Exam';
import AddExam from './components/exams/AddExam';
import StudentRegistration from './components/user/StudentRegistration';
import AddQuestions from './components/Questions/AddQuestions';
import { UserExams } from './components/user/UserExams';
import { TakeExam } from './components/user/TakeExam';
import { UserResults } from './components/user/UserResults';
import ProtectedRoute from './components/ProtectedRoute';
import { NotFound } from './components/NotFound';

function App() {
  // const isLoggedIn = localStorage.getItem('auth_token');
  // const user_type = localStorage.getItem('user_type');

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<SharedLayouts />}>
          <Route index element={<LoginComponent />} />
          <Route path="login" element={<LoginComponent />} />
          <Route path="exams" element={<Exams />} />
          <Route path="exams/:id" element={<Exam />} />
          <Route path="addExam" element={<AddExam />} />
          <Route path="/exams/:examId/addQuestions" element={<AddQuestions/>}/>
          <Route path="register" element={<StudentRegistration />} />
          {/* <Route path="userexams" element={<UserExams />} /> */}
          {/* <Route path="userexams/:id" element={<TakeExam />} /> */}
          {/* <Route path="userresults" element={<UserResults />} /> */}
          <Route
            path="userexams"
            element={<ProtectedRoute element={UserExams} allowedRoles={['User']} />}
          />
          <Route
            path="userexams/:id"
            element={<ProtectedRoute element={TakeExam} allowedRoles={['User']} />}
          />
          <Route
            path="userresults"
            element={<ProtectedRoute element={UserResults} allowedRoles={['User']} />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />

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