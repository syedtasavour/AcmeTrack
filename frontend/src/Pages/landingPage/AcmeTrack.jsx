import React from "react";

const AcmeTrack = () => {
  return (
    <div className="relative w-full max-w-[1290px] mx-auto px-4 py-8 flex flex-col lg:block">
      {/* Left Side Content */}
      <div className="z-10 max-w-[462px]">
        <div className="text-neutral-400 text-base font-normal font-['Fredoka'] leading-tight mb-4">
          Become an AcmeTrack Patient
        </div>

        <div className="text-zinc-900 text-4xl lg:text-6xl font-semibold font-['Work_Sans'] leading-tight lg:leading-[60px] mb-6">
          Start Your Transformation
        </div>

        <div className="text-zinc-500 text-lg lg:text-xl font-medium font-['Fredoka'] leading-7 mb-8">
          Join the growing community of individuals who have transformed their
          lives with AcmeTrack's GLP-1-based weight-loss program
        </div>

        <div className="w-48 lg:w-60 h-14 lg:h-16 bg-black rounded-full flex items-center justify-center hover:bg-zinc-800 transition">
          <span className="text-stone-300 text-base font-semibold font-['Fredoka']">
            Sign Up Now
          </span>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="mt-8 lg:mt-0 lg:absolute top-0 right-0 ">
        <img
          className="w-full mt-2 max-w-[338px] lg:max-w-[328px] h-auto rounded-md object-cover"
          src="src/assets/media/AcmeTrack.jpeg"
          alt="AcmeTrack transformation visual"
        />
      </div>
    </div>
  );
};

export default AcmeTrack;
