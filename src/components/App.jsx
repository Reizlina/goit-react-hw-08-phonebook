// import Form from './Form/Form';
// import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
// import PrivateRoute from './PrivateRoute';
// import PublicRoute from './PublicRoute';
import { currentUser } from 'redux/authOperations';
import AuthPage from 'pages/AuthPage';
import MainPage from 'pages/MainPage';

export const App = () => {
  // const [auth, setAuth] = useState(false);
  const dispatch = useDispatch();
  const { persistedReducer } = useSelector(state => state);
  const { token } = persistedReducer;
  // console.log('token app', token);

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

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

//   return (
//     <Routes>
//       <Route path="/" element={<Outlet />}>
//         <Route index element={<Navigate to="/auth" />} />
//         <Route element={<PrivateRoute />}>
//           <Route path="/auth" element={<AuthPage />} />
//         </Route>
//         <Route element={<PublicRoute />}>
//           <Route path="/main" element={<MainPage />} />
//         </Route>
//       </Route>
//       <Route path="*" element={<Navigate to="/auth" />} />
//     </Routes>
//   );
// };
