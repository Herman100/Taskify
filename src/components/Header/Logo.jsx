import { useNavigate } from "react-router-dom";
import taskifylogo from "./assets/taskifylogo.svg";
import taskifylogoicon from "./assets/taskifylogoicon.svg";

export default function Logo({ theme, collapsed }) {
  const navigate = useNavigate();
  function handleLogoClick() {
    navigate("/");
  }

  const styles = {
    height: "75px",
    margin: "10px 0",
    width: "100%",
    cursor: "pointer",
    filter:
      theme === "dark"
        ? "invert(100%) sepia(100%) saturate(0%) hue-rotate(78deg) brightness(101%) contrast(103%)"
        : "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",

    // backgroundColor: theme === "dark" ? "white " : "#150654",
  };
  return (
    <div>
      {collapsed ? (
        <img
          src={taskifylogoicon}
          alt="taskify logo"
          style={styles}
          onClick={handleLogoClick}
        />
      ) : (
        <img
          src={taskifylogo}
          alt="taskify logo"
          style={styles}
          onClick={handleLogoClick}
        />
      )}
    </div>
  );
}
