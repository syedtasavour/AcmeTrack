import React from "react";

function Personalized() {
  return (
    <div className="bg-white w-full min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-screen-xl w-full flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Column */}
        <div className="w-full lg:w-1/2 relative">
          <div className="text-neutral-500 text-base font-['Fredoka'] leading-tight mb-2">
            Unlock Your Potential
          </div>
          <div className="text-zinc-950 text-4xl md:text-5xl lg:text-6xl font-semibold font-['Work_Sans'] leading-tight mb-6">
            Personalized Care
          </div>
          <div className="text-zinc-400 text-base md:text-lg font-medium font-['Fredoka'] leading-7 mb-8 max-w-md">
            Discover how AcmeTrack's GLP-1-based program can transform your
            weight-loss journey through seamless medication tracking, progress
            monitoring, and expert guidance.
          </div>
          <button className="bg-white text-zinc-600 text-xl font-semibold font-['Fredoka'] px-6 py-3 rounded-3xl border border-zinc-600">
            Join Now
          </button>
          <div className="mt-12 flex justify-center lg:justify-start">
            <img
              className="w-80 md:w-96 h-auto"
              src="src/assets/media/PersonLeft.png"
              alt="Progress Illustration"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-1/2 relative flex flex-col items-center">
          <img
            className="w-full max-w-md h-auto mb-10"
            src="src/assets/media/PersonRight.png"
            alt="Dashboard Screenshot"
          />
          <div className="flex items-start gap-4 max-w-md">
            <img
              className="w-10 h-10"
              src="src/assets/media/Icon.png"
              alt="Icon"
            />
            <div>
              <div className="text-stone-900 text-2xl md:text-3xl font-semibold font-['Work_Sans'] leading-9 mb-2">
                Medication Tracking
              </div>
              <div className="text-neutral-500 text-base font-normal font-['Fredoka'] leading-7">
                Stay on top of your GLP-1 medication regimen with AcmeTrack's
                intuitive dashboard. Log doses, set reminders, and access
                detailed usage history to ensure seamless management of your
                weight-loss journey.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Personalized;
