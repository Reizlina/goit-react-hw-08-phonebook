// import Form from './Form/Form';
// import { useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import AuthPage from 'pages/AuthPage';
import MainPage from 'pages/MainPage';

export const App = () => {
  // const [auth, setAuth] = useState(false);
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Navigate to="/auth" />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="main" element={<MainPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
};
// <Form />;
