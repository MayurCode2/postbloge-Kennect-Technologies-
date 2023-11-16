import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { registerUser } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
const navigate = useNavigate()
  const authStatus = useSelector((state) => state.auth.authStatus);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authStatus === "fulfilled") {
      // Redirect to login page after successful registration
      navigate("login");
      // Reset form fields
      setFormData({
        username: "",
        password: "",
      });
    }
  }, [authStatus, history]);

  const validateForm = () => {
    const errors = {};
    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }
    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormErrors({
      ...formErrors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setFormErrors({});
      setLoading(true);

      try {
        await dispatch(registerUser({ username: formData.username, password: formData.password }));
      } catch (error) {
        console.error("Error during registration:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className=" flex justify-center">
      <div className=" border border-black rounded-3xl p-10">
      <h2 className="text-center text-3xl uppercase">Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <p className="username">Username:</p>
          <input
          className="border border-black h-10 rounded-2xl w-60 text-center"
          placeholder="Username"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {formErrors.username && <p className=" text-red-500 text-xs">{formErrors.username}</p>}
        </div>
        <div>
          <p className="password">Password:</p>
          <input
           className="border border-black h-10 rounded-2xl w-60 text-center"
           placeholder="Password"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {formErrors.password && <p className=" text-red-500 text-xs">{formErrors.password}</p>}
        </div>
        <div className="flex justify-center mt-5">
        <button className=" border border-black rounded-full w-28 hover:bg-black hover:text-white h-10  " type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        </div>
      </form>
      {authStatus === "error" && <p className=" text-red-500 text-xs">Error occurred during registration.</p>}
      </div>
    </div>
  );
};

export default Register;
