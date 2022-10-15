import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { currentUser } from 'redux/authOperations';
import AuthPage from 'pages/AuthPage';
import MainPage from 'pages/MainPage';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Navigate to="/auth" />} />
        <Route element={<PublicRoute />}>
          <Route path="/auth" element={<AuthPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/main" element={<MainPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
};
