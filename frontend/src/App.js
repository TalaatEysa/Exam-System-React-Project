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
import EditExam from './components/exams/EditExam';
import ProtectedRoute from './components/ProtectedRoute';
import AdminResults from './components/admin/AdminResults';
import { NotFound } from './components/NotFound';
import EditQuestion from './components/Questions/EditQuestion';
import { NotAuthorized } from './components/NotAuthorized';

function App() {
  // const isLoggedIn = localStorage.getItem('auth_token');
  // const user_type = localStorage.getItem('user_type');

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<SharedLayouts />}>
          <Route index element={<LoginComponent />} />
          <Route path="login" element={<LoginComponent />} />
          <Route path="register" element={<StudentRegistration />} />
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
        <Route path="/admin" element={<ProtectedRoute element={SharedLayouts} allowedRoles={['Admin']} />}>
          <Route path="exams" element={<Exams/>} />
          <Route path="exams/:id" element={<Exam />} />
          <Route path="addExam" element={<AddExam />} />
          <Route path='exams/editExam/:examId' element={<EditExam />} />
          <Route path="exams/:examId/addQuestions" element={<AddQuestions />} />
          <Route path="exams/:examId/editQuestion/:id" element={<EditQuestion />} />
          <Route path="results" element={<AdminResults />} />
        </Route>
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="*" element={<NotFound />} />

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