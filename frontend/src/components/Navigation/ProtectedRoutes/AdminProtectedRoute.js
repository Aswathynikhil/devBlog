import { useSelector } from "react-redux";
import { Navigate, Outlet,  } from "react-router-dom";

//check if  user is loggin

const AdminProtectRoute = () => {
  const user = useSelector((state) => state.users);
  const { userAuth } = user;
  const isAdmin = userAuth?.isAdmin;

  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminProtectRoute;
