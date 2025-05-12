import SideBar from "../../components/sideBar";
import UserDash from "../../components/userDash";

function Overview() {
  const userData = {
    name: "Jake Vincent",
    greetingMessage: "Good Morning",
    greetingSubtext: "Hope you feel better today.",
    avatarUrl: "https://placehold.co/32x32", // Optional: custom avatar
  };
  return (
    <div>
      <SideBar />
      <UserDash userData={userData} />
    </div>
  );
}

export default Overview;
