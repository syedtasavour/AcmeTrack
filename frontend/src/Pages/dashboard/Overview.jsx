import SideBar from "../../components/sideBar";
import UserDash from "../../components/userDash";
import Avatar from "../../assets/media/card.png";
import HealthStatus from "../../components/healthStatus";
import BloodPressureChart from "../../components/BloodPressureChart";
import OverviewCard from "../../components/OverviewCard";
import OverviewBigCard from "../../components/OverviewBigCard";
import scale from "../../assets/media/scale.svg";
import package_icon from "../../assets/media/package.svg";
import trending_up from "../../assets/media/trending-up.svg";

function Overview() {
  const userData = {
    name: "Jake Vincent",
    greetingMessage: "Good Morning",
    greetingSubtext: "Hope you feel better today.",
    image: Avatar,
    gender: "Male",
    age: 28,
    height: 8.7,
    bloodType: "O+",
  };

  // Original health data
  const healthDataOriginal = [
    { label: "Weight (kg/lbs)", percentage: 92 },
    { label: "BMI", percentage: 87 },
    { label: "Heart Rate", percentage: 99 },
    { label: "Blood Pressure", percentage: 70 },
    { label: "Blood Sugar", percentage: 88 },
  ];

  // Filter to include BMI and the top 2 from the remaining metrics
  const bmiData = healthDataOriginal.find((item) => item.label === "BMI");
  const remainingData = healthDataOriginal.filter(
    (item) => item.label !== "BMI"
  );
  const topTwoRemaining = remainingData
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 2);
  const healthData = [bmiData, ...topTwoRemaining].sort(
    (a, b) => b.percentage - a.percentage
  );

  const bloodPressureData = {
    title: "Blood Pressure",
    values: [
      { month: "JAN", value: 3.5 },
      { month: "FEB", value: 2.0 },
      { month: "MAR", value: 4.0 },
      { month: "APR", value: 1.5 },
      { month: "MAY", value: 3.0 },
      { month: "JUN", value: 2.8 },
    ],
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 border-r border-gray-300">
        <SideBar />
      </div>

      {/* Main dashboard content */}
      <div className="flex-1 p-8">
        {/* First row: UserDash, HealthStatus, BloodPressureChart */}
        <div className="flex gap-6">
          <UserDash className="flex-1" userData={userData} />
          <HealthStatus className="flex-1" data={healthData} />
          <BloodPressureChart
            className="flex-1"
            title={bloodPressureData.title}
            data={bloodPressureData.values}
          />
        </div>

        {/* Second row: Three OverviewCards inline */}
        <div className="mt-6 flex gap-6">
          <OverviewCard
            className="flex-1"
            label="Body Mass Index"
            value="26.5"
          />
          <OverviewCard className="flex-1" label="Days on Program" value="90" />
          <OverviewCard
            className="flex-1"
            label="Total Weight Lost"
            value="15 lbs"
          />
        </div>

        {/* Third row: Three OverviewBigCards inline */}
        <div className="mt-6 flex gap-6">
          <OverviewBigCard
            className="flex-1"
            label="Current Weight"
            value="185"
            type="lbs"
            description="Down 5 lbs from last week"
            icon={scale}
          />
          <OverviewBigCard
            className="flex-1"
            label="Goal Progress"
            value="75"
            type="%"
            description="Approaching your target!"
            icon={package_icon}
          />
          <OverviewBigCard
            className="flex-1"
            label="Next Shipment"
            value="Oct"
            type="2024"
            description="Meal replacements arriving soon"
            icon={trending_up}
          />
        </div>
      </div>
    </div>
  );
}

export default Overview;
