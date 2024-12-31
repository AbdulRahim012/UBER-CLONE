import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProtectWrapper = ({ children }) => {
  // Check if token exists in localStorage
  const token = localStorage.getItem("token");
  const navigate=useNavigate();


    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [token] );

  // Render children if token exists
  return (
    <>
        {children}
    </>
  )
};

export default UserProtectWrapper;
