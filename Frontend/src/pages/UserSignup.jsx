import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }

    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      {/* Header */}
      <div className="w-full bg-black text-white py-4 text-center text-3xl font-bold">
        Uber
      </div>

      {/* Signup Container */}
      <div className="flex flex-col items-center justify-center mt-12 bg-white shadow-lg rounded-lg w-full md:w-96 p-6">
        <h2 className="text-lg font-medium text-center mb-6">
          Enter your Information
        </h2>

        <form onSubmit={submitHandler}>
          {/* Name Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* First Name Input */}
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="Enter your first name"
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-300"
            />
            {/* Last Name Input */}
            <input
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Enter your last name"
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>

          {/* Email Input */}
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm mb-4 focus:outline-none focus:ring focus:ring-gray-300"
          />

          {/* Password Input */}
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm mb-4 focus:outline-none focus:ring focus:ring-gray-300"
          />

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md text-sm md:text-lg md:py-3 mb-4 hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300"
          >
            Create User Account
          </button>
        </form>

        <p className="text-center">
          Have an Account?{" "}
          <Link to="/login" className="text-blue-600 text-sm">
            Find my account
          </Link>
        </p>

        {/* Divider */}
        <div className="relative flex items-center justify-center w-full my-4">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="absolute bg-white px-2 text-sm text-gray-700">or</span>
        </div>

        {/* Signup as Captain */}
        <Link
          to="/Captain-Signup"
          className="w-full bg-black flex items-center justify-center text-white py-2 rounded-md text-sm md:text-lg md:py-3 hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300"
        >
          Sign up as Captain
        </Link>

        {/* Footer Text */}
        <p className="text-xs text-gray-500 text-center mt-6">
          By proceeding, you consent to receive calls, WhatsApp, or SMS/RCS
          messages, including by automated means, from Uber and its affiliates.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
