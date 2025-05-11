import React from "react";

function Login() {
  return (
    <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto h-auto relative bg-white overflow-hidden p-6 sm:p-8">
      <div className="flex flex-col justify-start items-start gap-6 sm:gap-10">
        {/* Title and Subheading */}
        <div className="flex flex-col justify-center items-start gap-2 sm:gap-3">
          <div className="text-zinc-800 text-3xl sm:text-4xl font-medium font-['Poppins']">
            Login
          </div>
          <div className="text-stone-500/80 text-base font-normal font-['Poppins']">
            Sign in to access your account
          </div>
        </div>

        {/* Email Input */}
        <div className="w-full sm:w-[473px] flex flex-col justify-start items-start gap-1">
          <div className="self-stretch h-7 relative">
            <div className="absolute text-stone-500 text-base font-normal font-['Poppins']">
              Email address
            </div>
          </div>
          <div className="self-stretch h-14 relative rounded-xl outline outline-1 outline-offset-[-1px] outline-stone-500/30" />
        </div>

        {/* Password Input */}
        <div className="w-full sm:w-[473px] flex flex-col justify-start items-start gap-1">
          <div className="self-stretch h-7 relative">
            <div className="absolute text-stone-500 text-base font-normal font-['Poppins']">
              Password
            </div>
            <div className="w-6 h-6 absolute top-0 right-0 flex justify-center items-center bg-stone-500/80" />
            <div className="absolute right-0 text-stone-500/80 text-lg font-normal font-['Poppins']">
              Hide
            </div>
          </div>
          <div className="self-stretch h-14 relative rounded-xl outline outline-1 outline-offset-[-1px] outline-stone-500/30" />
          <div className="text-stone-500 text-sm font-normal font-['Poppins']"></div>
        </div>

        {/* Agreement Checkboxes */}
        <div className="flex flex-col justify-start items-start gap-4">
          <div className="flex justify-start items-center gap-2">
            <div className="w-6 h-6 relative overflow-hidden">
              <div className="w-4 h-4 left-[3px] top-[3px] absolute bg-neutral-900" />
            </div>
            <div className="text-zinc-800 text-base font-normal font-['Poppins']">
              Agree to our
              <span className="text-stone-500"> </span>
              <span className="text-zinc-800 text-base font-normal font-['Poppins'] underline">
                Terms of use
              </span>
              <span className="text-stone-500"> </span>
              and
              <span className="text-zinc-800 text-base font-normal font-['Poppins'] underline">
                Privacy Policy
              </span>
            </div>
          </div>
        </div>

        {/* Sign Up Button */}
        <div className="w-64 sm:w-72 h-16 sm:h-18 relative bg-neutral-900 rounded-[32px] flex justify-center items-center">
          <div className="text-center text-white text-xl font-medium font-['Poppins']">
            Login
          </div>
        </div>

        {/* Already have an account link */}
        <div className="flex justify-start items-start gap-2">
          <span className="text-zinc-800 text-base font-normal font-['Poppins']">
            Don’t have an account?
          </span>
          <span className="text-stone-500 text-base font-normal font-['Poppins']">
            {" "}
          </span>
          <span className="text-neutral-900 text-base font-normal font-['Poppins'] underline">
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
