import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateField,
  toggleShowPassword,
  loginUser,
  resetStatus,
  selectLoginState,
} from "../../redux/slices/loginSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password, showPassword, rememberMe, status, error } =
    useSelector(selectLoginState);

  // Local state for agreement error display
  const [agreeError, setAgreeError] = useState("");

  const handleChange = (e) => {
    dispatch(updateField({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rememberMe) {
      setAgreeError("You must agree to the terms before logging in.");
      return;
    }

    setAgreeError("");
    dispatch(loginUser({ email, password }));
  };

  // Redirect after successful login
  useEffect(() => {
    if (status === "succeeded") {
      navigate("/dashboard"); // Adjust route as needed
      dispatch(resetStatus());
    }
  }, [status, navigate, dispatch]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto h-auto relative bg-white overflow-hidden p-6 sm:p-8"
    >
      <div className="flex flex-col justify-start items-start gap-6 sm:gap-10">
        {/* Title and Subheading */}
        <div className="flex flex-col justify-center items-start gap-2 sm:gap-3">
          <h1 className="text-zinc-800 text-3xl sm:text-4xl font-medium font-['Poppins']">
            Login
          </h1>
          <p className="text-stone-500/80 text-base font-normal font-['Poppins']">
            Sign in to access your account
          </p>
        </div>

        {/* Email Input */}
        <div className="w-full flex flex-col gap-1">
          <label className="text-stone-500 text-base font-['Poppins']">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="h-14 w-full rounded-xl px-4 outline outline-1 outline-stone-500/30 text-zinc-800"
            required
          />
        </div>

        {/* Password Input */}
        {/* Password Input */}
        <div className="w-full flex flex-col gap-1 relative">
          <label className="text-stone-500 text-base font-['Poppins']">
            Password
          </label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="••••••••"
              className="h-14 w-full rounded-xl px-4 pr-16 outline outline-1 outline-stone-500/30 text-zinc-800"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => dispatch(toggleShowPassword())}
              className="absolute top-3 right-4 text-sm text-stone-500/80 font-['Poppins']"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <p className="text-stone-400 text-sm mt-1 font-['Poppins']">
            Use 6 or more characters with a mix of letters, numbers & symbols
          </p>
        </div>

        {/* Error Messages */}
        {(error || agreeError) && (
          <div className="text-red-600 text-sm font-medium font-['Poppins']">
            {agreeError || error}
          </div>
        )}

        {/* Agreement Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() =>
              dispatch(updateField({ name: "rememberMe", value: !rememberMe }))
            }
            className="w-5 h-5"
            id="agreeCheckbox"
          />
          <label
            htmlFor="agreeCheckbox"
            className="text-zinc-800 text-base font-['Poppins'] cursor-pointer select-none"
          >
            Agree to our{" "}
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-neutral-900"
            >
              Terms of use
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-neutral-900"
            >
              Privacy Policy
            </a>
          </label>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-64 sm:w-72 h-16 bg-neutral-900 text-white text-xl font-medium font-['Poppins'] rounded-[32px] flex items-center justify-center disabled:opacity-50"
        >
          {status === "loading" ? "Logging in..." : "Login"}
        </button>

        {/* Sign Up Link */}
        <div className="flex gap-2 text-base font-['Poppins']">
          <span className="text-zinc-800">Don’t have an account?</span>
          <a href="/signup" className="underline text-neutral-900">
            Sign Up
          </a>
        </div>
      </div>
    </form>
  );
}

export default Login;
