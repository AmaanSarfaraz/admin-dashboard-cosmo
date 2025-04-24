import axios from "axios";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
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
      navigateTo("/dashboard");
    } catch (error) {
      console.log(`Error occurred while logging in: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="min-h-[40rem] flex flex-col items-center justify-center py-6 px-4 w-[80rem] shadow-2xl shadow-[#460874] bg-[#450874c2]">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
          <div>
            <h1 className="lg:text-5xl text-3xl font-bold lg:leading-[57px] text-white">
              Cosmo House
            </h1>
            <p className="text-sm mt-6 text-white leading-relaxed">
              Sign in to your account to access your profile, history, and any
              private pages you've been granted access to.
            </p>
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
              <form
                className="max-w-md md:ml-auto w-full"
                onSubmit={handleSubmit}
              >
                <h3 className="text-white lg:text-3xl text-2xl font-bold mb-8">
                  Sign in
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm text-white font-medium mb-2 block">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="bg-slate-100 w-full text-sm text-black px-4 py-3 rounded-md outline-none border focus:border-blue-600 focus:border-2"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange}
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-white font-medium mb-2 block">
                      Password
                    </label>
                    <div className="relative flex items-center">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        className="bg-slate-100 w-full text-sm text-black px-4 py-3 rounded-md outline-none border focus:border-blue-600 focus:border-2"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                      />
                      <button
                        onClick={handleShowPassword}
                        className="absolute right-2"
                        type="button"
                      >
                        {showPassword ? (
                          <FiEye className="text-gray-600" />
                        ) : (
                          <FiEyeOff className="text-gray-600" />
                        )}
                      </button>
                    </div>
                    {errors.password && touched.password && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-white focus:ring-blue-300 border-slate-300 rounded cursor-pointer"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-3 block text-sm text-white"
                      >
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <Link
                        to="/forgot-password"
                        className="text-white hover:text-blue-500 font-medium"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="!mt-12">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                  >
                    {isSubmitting ? "Logging in..." : "Log in"}
                  </button>
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
