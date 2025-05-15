import React, { useEffect, useState } from "react";
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
import axios from "axios";

function Overview() {
  const [bmi, setBmi] = useState(null);
  const [weeklyWeight, setWeeklyWeight] = useState(null);
  const [strikes, setStrikes] = useState(null);
  const [dailyWeight, setDailyWeight] = useState(null);
  const [shipment, setShipment] = useState(null);

  const [errors, setErrors] = useState({
    bmi: null,
    weeklyWeight: null,
    strikes: null,
    dailyWeight: null,
    shipment: null,
  });

  // API Fetch Handlers

  useEffect(() => {
    const fetchBmi = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/health/calculate-bmi`,
          {
            withCredentials: true,
          }
        );
        setBmi(data.data?.bmi ?? null);
      } catch (err) {
        setErrors((prev) => ({ ...prev, bmi: "BMI data unavailable." }));
      }
    };
    fetchBmi();
  }, []);

  useEffect(() => {
    const fetchWeeklyWeight = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/health/weekly-weight`,
          {
            withCredentials: true,
          }
        );
        setWeeklyWeight(data.data?.weightChange ?? null);
      } catch (err) {
        setErrors((prev) => ({
          ...prev,
          weeklyWeight: "Weekly weight data unavailable.",
        }));
      }
    };
    fetchWeeklyWeight();
  }, []);

  useEffect(() => {
    const fetchStrikes = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/users/strikes`,
          {
            withCredentials: true,
          }
        );
        setStrikes(data.data?.strikes ?? null);
      } catch (err) {
        setErrors((prev) => ({
          ...prev,
          strikes: "Strikes data unavailable.",
        }));
      }
    };
    fetchStrikes();
  }, []);

  useEffect(() => {
    const fetchDailyWeight = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/health/curr-weight`,
          {
            withCredentials: true,
          }
        );
        setDailyWeight(data.data?.dailyWeight ?? null);
      } catch (err) {
        setErrors((prev) => ({
          ...prev,
          dailyWeight: "Daily weight data unavailable.",
        }));
      }
    };
    fetchDailyWeight();
  }, []);

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/shipments/recent`,
          {
            withCredentials: true,
          }
        );
        setShipment(data.data ?? null);
      } catch (err) {
        setErrors((prev) => ({
          ...prev,
          shipment: "Shipment data unavailable.",
        }));
      }
    };
    fetchShipment();
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-64 bg-gray-100 border-r border-gray-300">
        <SideBar />
      </div>

      <div className="flex-1 p-8 space-y-6">
        <div className="flex gap-6">
          <UserDash />
          <HealthStatus />
          <BloodPressureChart />
        </div>

        <div className="flex gap-6">
          <OverviewCard
            label="Body Mass Index"
            value={bmi ?? errors.bmi ?? "—"}
          />
          <OverviewCard
            label="Health Log Strikes"
            value={strikes ?? errors.strikes ?? "—"}
          />
          <OverviewCard
            label="Total Weight Lost"
            value={weeklyWeight ?? errors.weeklyWeight ?? "—"}
          />
        </div>

        <div className="flex gap-6">
          <OverviewBigCard
            label={
              shipment?.expectedDeliveryComponents?.monthName &&
              shipment?.expectedDeliveryComponents?.year
                ? "Next Shipment"
                : errors.shipment ?? "No Upcoming Shipment"
            }
            value={shipment?.expectedDeliveryComponents?.monthName ?? "—"}
            type={shipment?.expectedDeliveryComponents?.year ?? ""}
            description={shipment?.medication ?? "No medication info"}
            icon={trending_up}
          />
          <OverviewBigCard
            label="Current Weight"
            value={dailyWeight ?? errors.dailyWeight ?? "—"}
            type="Kg"
            description="Down 5 lbs from last week"
            icon={scale}
          />
          <OverviewBigCard
            label="Goal Progress"
            value="75"
            type="%"
            description="Approaching your target!"
            icon={package_icon}
          />
        </div>
      </div>
    </div>
  );
}

export default Overview;
