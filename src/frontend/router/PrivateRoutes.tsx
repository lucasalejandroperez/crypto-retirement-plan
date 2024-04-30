import { Outlet, Navigate } from 'react-router-dom';

interface Props {
  isAuthenticated: boolean;
}

const PrivateRoutes = ({ isAuthenticated }: Props) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
