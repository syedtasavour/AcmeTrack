import React from "react";

function Hero() {
  return (
    <div className="bg-neutral-100 w-full min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row items-center justify-between">
        {/* Left Section */}
        <div className="max-w-xl lg:w-1/2 space-y-6">
          <div className="text-neutral-500 text-base font-normal font-['Fredoka'] leading-tight">
            Welcome to AcmeTrack
          </div>
          <div className="text-black text-4xl md:text-6xl lg:text-8xl font-semibold font-['Work_Sans'] leading-snug lg:leading-[86.5px]">
            Revolutionize Your Weight-Loss Journey
          </div>
          <div className="text-zinc-600 text-base md:text-lg font-medium font-['Fredoka'] leading-relaxed">
            Experience a personalized, GLP-1-based weight-loss program with
            AcmeTrack. Our comprehensive platform empowers you to track your
            medication, monitor progress, and connect with healthcare
            professionals for a tailored approach to achieving your goals.
          </div>
          <div>
            <button className="bg-black rounded-full px-8 py-4 text-stone-300 text-xl font-semibold font-['Fredoka']">
              Get Started
            </button>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="mt-12 lg:mt-0 lg:w-1/2 flex justify-center">
          <img
            className="w-full max-w-md lg:max-w-[485px] h-auto"
            src="src/assets/media/PersonRight.png"
            alt="AcmeTrack illustration"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
