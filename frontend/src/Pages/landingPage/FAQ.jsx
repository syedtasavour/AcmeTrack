import React from "react";

function FAQ() {
  return (
    <div className="bg-gray-50 w-full px-4 py-16">
      <div className="max-w-screen-xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-neutral-400 text-base font-['Fredoka'] leading-tight mb-2">
            Frequently Asked Questions
          </p>
          <h2 className="text-zinc-900 text-4xl lg:text-7xl font-semibold font-['Work_Sans'] leading-tight mb-6">
            Your Questions Answered
          </h2>
          <p className="text-zinc-500 text-lg font-medium font-['Fredoka'] leading-7 max-w-2xl mx-auto">
            Explore our comprehensive FAQ section to find answers to your
            burning questions about AcmeTrack's GLP-1-based weight-loss program
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 - Weight Loss */}
          <div className="bg-gray-50 border border-neutral-700 rounded-[5px] p-6 flex flex-col items-center text-center">
            <img
              className="w-32 h-32 mb-4"
              src="src/assets/media/faq1.png"
              alt="Weight Loss"
            />
            <h3 className="text-neutral-700 text-2xl font-medium font-['Fredoka'] leading-7 mb-2">
              Weight Loss
            </h3>
            <p className="text-zinc-500 text-base font-normal font-['Fredoka'] leading-relaxed">
              Discover how AcmeTrack's GLP-1-based approach can help you achieve
              sustainable weight loss through personalized care and cutting-edge
              tools
            </p>
          </div>

          {/* Card 2 - Medication Management */}
          <div className="bg-gray-50 border border-zinc-500 rounded-[5px] p-6 flex flex-col items-center text-center">
            <img
              className="w-36 h-32 mb-4"
              src="src/assets/media/faq2.png"
              alt="Medication Management"
            />
            <h3 className="text-neutral-700 text-2xl font-semibold font-['Fredoka'] leading-7 mb-2">
              Medication Management
            </h3>
            <p className="text-zinc-500 text-lg font-medium font-['Fredoka'] leading-relaxed">
              Unlock the power of seamless medication tracking and reminders to
              ensure consistent adherence to your GLP-1 regimen
            </p>
          </div>

          {/* Card 3 - Patient Support */}
          <div className="bg-gray-50 border border-neutral-700 rounded-[5px] p-6 flex flex-col items-center text-center">
            <img
              className="w-32 h-32 mb-4"
              src="src/assets/media/faq3.png"
              alt="Patient Support"
            />
            <h3 className="text-neutral-700 text-2xl font-semibold font-['Fredoka'] leading-7 mb-2">
              Patient Support
            </h3>
            <p className="text-neutral-400 text-base font-normal font-['Fredoka'] leading-7">
              Benefit from the guidance and expertise of our dedicated
              healthcare professionals, who are committed to supporting you
              every step of the way
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
