import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { persistedReducer } = useSelector(state => state);
  const { isLogin } = persistedReducer;

  if (!isLogin) {
    return <Navigate replace to="/auth" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
