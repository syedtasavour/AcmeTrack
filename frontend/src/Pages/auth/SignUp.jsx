import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signupUser,
  updateField,
  toggleShowPassword,
  selectSignupState,
} from "../../redux/slices/signupSlice";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    firstName,
    lastName,
    email,
    password,
    agreeToTerms,
    showPassword,
    status,
    error,
  } = useSelector(selectSignupState);

  // Redirect to dashboard on successful signup
  useEffect(() => {
    if (status === "succeeded") {
      navigate("/dashboard");
    }
  }, [status, navigate]);

  const handleChange = (e) => {
    dispatch(updateField({ name: e.target.name, value: e.target.value }));
  };

  const handleCheckbox = (e) => {
    dispatch(updateField({ name: e.target.name, value: e.target.checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      firstName,
      lastName,
      email,
      password,
      agreeToTerms,
    };

    dispatch(signupUser(formData));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto h-auto relative bg-white overflow-hidden p-6 sm:p-8"
    >
      <div className="flex flex-col justify-start items-start gap-6 sm:gap-10">
        {/* Title */}
        <div className="text-zinc-800 text-3xl sm:text-4xl font-medium">
          Sign up
        </div>
        <div className="text-stone-500/80 text-base">
          Sign up for free to access any of our products
        </div>

        {/* First Name */}
        <div className="w-full">
          <label className="text-stone-500 text-base">First Name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            className="w-full h-14 mt-1 px-4 rounded-xl outline outline-1 outline-stone-500/30"
            required
          />
        </div>

        {/* Last Name */}
        <div className="w-full">
          <label className="text-stone-500 text-base">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            className="w-full h-14 mt-1 px-4 rounded-xl outline outline-1 outline-stone-500/30"
            required
          />
        </div>

        {/* Email */}
        <div className="w-full">
          <label className="text-stone-500 text-base">Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="w-full h-14 mt-1 px-4 rounded-xl outline outline-1 outline-stone-500/30"
            required
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <label className="text-stone-500 text-base flex justify-between">
            Password
            <span
              onClick={() => dispatch(toggleShowPassword())}
              className="text-stone-500 cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleChange}
            className="w-full h-14 mt-1 px-4 rounded-xl outline outline-1 outline-stone-500/30"
            required
            minLength={6}
          />
          <p className="text-stone-500 text-sm mt-1">
            Use 6 or more characters with a mix of letters, numbers & symbols
          </p>
        </div>

        {/* Terms & Newsletter */}
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={agreeToTerms}
              onChange={handleCheckbox}
              required
            />
            Agree to our <span className="underline">Terms of Use</span> and{" "}
            <span className="underline">Privacy Policy</span>
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Subscribe to our monthly newsletter
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-64 sm:w-72 h-16 bg-neutral-900 text-white rounded-[32px] text-xl"
        >
          {status === "loading" ? "Signing up..." : "Sign up"}
        </button>

        {/* Error Display */}
        {error && <p className="text-red-500 mt-2">{error}</p>}

        {/* Login Redirect */}
        <div className="text-base text-zinc-800">
          Already have an account?
          <span className="underline text-neutral-900 ml-2 cursor-pointer">
            Log in
          </span>
        </div>
      </div>
    </form>
  );
}

export default SignUp;
