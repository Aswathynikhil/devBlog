import React from "react";
import { useSelector } from "react-redux";
import AdminSidebar from "../Admin/AdminSidebar";
import AdminNavbar from "./Admin/AdminNavbar";
import AccountVerificationAlertWarning from "./Alerts/AccountVerificationAlertWarning";
import AccountVerificationSuccessAlert from "./Alerts/AccountVerificationSuccessAlert";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";


const Navbar = () => {
  //-----get user from store--------
  const state = useSelector((state) => state.users);
  const { userAuth, profile } = state;
  const isAdmin = userAuth?.isAdmin;
  const account = useSelector((state) => state?.accountVerification);
  const { loading, appErr, serverErr, token } = account;
  return (
    <>
      {isAdmin ? (
      <>
        <AdminNavbar isLogin={userAuth} />
      {/* <AdminSidebar/> */}
       </> 
      ) : userAuth ? (
        <PrivateNavbar isLogin={userAuth} />
      ) : (
        <PublicNavbar />
      )}
      {/* display alert */}
      {userAuth?.isVerified || isAdmin || !userAuth ? null : (
        <AccountVerificationAlertWarning />
      )}
      {/* display success msg */}
      {loading && <h2 className="text-center">Loading please wait</h2>}
      {token && <AccountVerificationSuccessAlert />}
      {appErr || serverErr ? (
        <h2 className="text-center text-red-500">
          {serverErr} {appErr}
        </h2>
      ) : null}
    </>
  );
};

export default Navbar;
