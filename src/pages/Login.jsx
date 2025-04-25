import axios from "axios";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { TbCircleLetterCFilled } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required")
    .min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigateTo = useNavigate();

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/user/login`,
        values,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Login success:", response.data);
      localStorage.setItem("token", response.data.token);
      navigateTo("/dashboard");
    } catch (error) {
      console.log(`Error occurred while logging in: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-7xl h-[80vh] bg-white rounded-xl shadow-2xl shadow-[#450874c2] overflow-hidden flex justify-center relative">
        <div className="absolute top-8 left-4 flex flex-row">
          <span className="text-4xl mr-4 text-[#450874c2]">
            <TbCircleLetterCFilled />
          </span>
          <h1 className="text-[#450874c2] text-2xl font-bold">COSMOS HOUSE</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-6 sm:p-10">
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold text-black leading-tight">
              Cosmos House
            </h1>
            <p className="text-black mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed">
              Home appliances, kitchenware, crockery and modular kitchens <br />
              Sign in to your account to access your profile, history, and any
              private pages you've been granted access to.
            </p>
            <h3>
              Palladium Street, Lalchowk, Srinagar- 190001, J&K, 190001, India
            </h3>
            <h3>0091 - 94190 09163; cosmos_house@hotmail.com</h3>
            <h3>Copyright © 2018 COSMOS HOUSE - All Rights Reserved.</h3>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={schema}
            onSubmit={handleLogin}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
                <h3 className="text-black text-2xl sm:text-3xl font-bold mb-8 text-center md:text-left">
                  Sign in
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="w-full px-4 py-3 text-sm text-black rounded-md bg-slate-100 border focus:border-[#450874c2] outline-none"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange}
                    />
                    <p
                      className={`text-sm min-h-[1rem] ${
                        errors.email && touched.email
                          ? "text-red-400"
                          : "invisible"
                      }`}
                    >
                      {errors.email && touched.email
                        ? errors.email
                        : "placeholder"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        className="w-full px-4 py-3 text-sm text-black rounded-md bg-slate-100 border focus:border-[#450874c2] outline-none"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        onClick={handleShowPassword}
                        className="absolute right-3 top-3 text-gray-600"
                      >
                        {showPassword ? <FiEye /> : <FiEyeOff />}
                      </button>
                    </div>
                    <p
                      className={`text-sm min-h-[1.25rem] ${
                        errors.password && touched.password
                          ? "text-red-400"
                          : "invisible"
                      }`}
                    >
                      {errors.password && touched.password
                        ? errors.password
                        : "placeholder"}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="w-4 h-4 text-black border-gray-300 rounded focus:ring-[#450874c2]"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 text-sm text-black"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-black hover:text-[#450874c2] font-medium"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 text-sm font-semibold rounded bg-blue-600 text-white hover:bg-[#450874c2] focus:outline-none transition duration-200"
                    >
                      {isSubmitting ? "Logging in..." : "Log in"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
