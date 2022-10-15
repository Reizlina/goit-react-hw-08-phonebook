import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = () => {
  const { persistedReducer } = useSelector(state => state);
  const { isLogin } = persistedReducer;

  if (isLogin) {
    return <Navigate replace to="/main" />;
  }
  return <Outlet />;
};

export default PublicRoute;
