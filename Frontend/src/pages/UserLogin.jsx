import {React, useState, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserLogin =  () =>  {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState({});

    const { user, setUser } = useContext(UserDataContext);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const userData = {
            email: email,
            password: password
        }

        console.log(userData);

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
        
        if (response.status === 200) {
            const data = response.data
            setUser(data.user)
            localStorage.setItem('token', data.token)
            navigate('/home')
          } 

        setEmail("");
        setPassword("");
    }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      {/* Header */}
      <div className="w-full bg-black text-white py-4 text-center  text-3xl font-bold">
        Uber
      </div>

      {/* Login Container */}
      <div className="flex flex-col items-center justify-center align-middle mt-12 bg-white shadow-lg rounded-lg w-96 p-6">
        <h2 className="text-lg font-medium text-center mb-6">
          What's your email?
        </h2>

    <form onSubmit={(e) => handleSubmit(e)}>
        {/* Input email */}
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder ="Enter your email "
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm mb-4 focus:outline-none focus:ring focus:ring-gray-300"
        />

        {/* Input Password */}
        <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password"
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm mb-4 focus:outline-none focus:ring focus:ring-gray-300"
        />

        {/* Login Button */}
        <button className="w-full bg-black text-white py-2 rounded-md text-lg mb-4">
          Login
        </button>
    </form>
    <p className="text-center">New here? <Link to="/signup" className="text-blue-600 text-sm"> Create new Account</Link> </p>

        
        {/* Divider */}
        <div className="relative flex items-center justify-center w-full my-4">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="absolute bg-white px-2 text-sm text-gray-700">or</span>
        </div>

        {/* Signin as Captain */}

        <Link to="/captain-login" className="w-full bg-black flex items-center justify-center text-white py-2 rounded-md text-m mb-4 mt-4">
          Sign in as Captain
        </Link>
 

        {/* Footer Text */}
        <p className="text-xs text-gray-500 text-center mt-6">
          By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages,
          including by automated means, from Uber and its affiliates to the number
          provided.
        </p>
        </div>
    </div>
  );
};

export default UserLogin;
