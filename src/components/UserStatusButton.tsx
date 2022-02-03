import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


const RedirectToLogin: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  loginWithRedirect();
  return <></>;
};

const UserStatusButton = () => {
  const { isAuthenticated, isLoading, logout } = useAuth0();
  return(
      <>

      </>
  )

}

export default UserStatusButton;