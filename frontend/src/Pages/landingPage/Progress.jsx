import React from "react";
import InfoCard from "../../components/InfoCard";

function Progress() {
  return (
    <div className="bg-gray-50 px-4 py-16">
      <h2 className="text-center text-6xl font-semibold font-['Work_Sans'] text-zinc-900 mb-4">
        Visualize Success
      </h2>
      <p className="text-center text-xl text-neutral-500 font-medium font-['Fredoka'] mb-12">
        Track your progress with cutting-edge tools that measure weight, BMI,
        and other key metrics
      </p>

      <div className="flex flex-col lg:flex-row justify-center gap-12">
        <InfoCard
          title="Healthcare Collaboration"
          description="Connect with your healthcare team to receive personalized guidance and support"
          iconUrl="src/assets/media/Icon.png"
          imageUrl="src/assets/media/card.png"
        />{" "}
        <InfoCard
          title="Healthcare Collaboration"
          description="Connect with your healthcare team to receive personalized guidance and support"
          iconUrl="src/assets/media/Icon.png"
          imageUrl="src/assets/media/card.png"
        />{" "}
        <InfoCard
          title="Healthcare Collaboration"
          description="Connect with your healthcare team to receive personalized guidance and support"
          iconUrl="src/assets/media/Icon.png"
          imageUrl="src/assets/media/card.png"
        />
      </div>
      <div className="flex flex-col lg:flex-row justify-center gap-12 mt-10">
        <InfoCard
          title="Healthcare Collaboration"
          description="Connect with your healthcare team to receive personalized guidance and support"
          iconUrl="src/assets/media/Icon.png"
          imageUrl="src/assets/media/card.png"
        />{" "}
        <InfoCard
          title="Healthcare Collaboration"
          description="Connect with your healthcare team to receive personalized guidance and support"
          iconUrl="src/assets/media/Icon.png"
          imageUrl="src/assets/media/card.png"
        />{" "}
        <InfoCard
          title="Healthcare Collaboration"
          description="Connect with your healthcare team to receive personalized guidance and support"
          iconUrl="src/assets/media/Icon.png"
          imageUrl="src/assets/media/card.png"
        />
      </div>
    </div>
  );
}

export default Progress;
