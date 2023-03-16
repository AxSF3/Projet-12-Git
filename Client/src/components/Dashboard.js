import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// API
import {
  getUser,
  getActivity,
  getAverageSessions,
  getPerformance,
} from "../api/api";

// REACT Components
import HeaderDashboard from "./HeaderDashboard";
import Kpi from "./Kpi";
import Score from "./Score";
import Performance from "./Performance";
import AverageSession from "./AverageSession";
import Activity from "./Activity";
import Erreur404 from "./404";

// JS Class
import User from "../class/User";

// CSS Style
import { StyledDashboard } from "./styles/Dashboard.styled";
import energy from "../design/energy.svg";
import chicken from "../design/chicken.svg";
import cheeseburger from "../design/cheeseburger.svg";
import apple from "../design/apple.svg";

function Dashboard() {
  let { id } = useParams();
  let { userswitch } = useParams();
  const [userData, setUserData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  });

  if(userData === null || userData === undefined) return <Erreur404/>;

console.log(userData)

  const loadUserData = async () => {
    const userData = await getUser(id, userswitch);
    console.log(userData);
    setUserData(userData);
    setIsLoading(false);
  };

  if (userData === null || userData === undefined) return <Erreur404 />;

  console.log(userData);

  const USER_CLASS = !isLoading
    ? new User(
        userData.USER.userInfos.firstName,
        userData.USER.userInfos.lastName,
        userData.USER.userInfos.age,
        userData.USER?.score ? userData.USER.score : userData.USER.todayScore,
        userData.USER?.keyData.calorieCount,
        userData.USER?.keyData.proteinCount,
        userData.USER?.keyData.carbohydrateCount,
        userData.USER?.keyData.lipidCount
      )
    : "";

  return (
    <StyledDashboard className="dashboard">
      {isLoading ? (
        <p>Wait please...</p>
      ) : (
        <>
          <HeaderDashboard first={USER_CLASS.firstName} />
          <div className="dashboard__charts">
            <div className="dashboard__charts-left">
              <Activity userActivityData={userData.ACTIVITY} />
              <AverageSession averageSessionsData={userData.AVERAGE_SESSION} />
              <Performance performanceData={userData.PERFORMANCE} />
              <Score scoreData={USER_CLASS.arrayOfPercentScore} />
            </div>
            <div className="dashboard__charts-right">
              <Kpi
                image={energy}
                value={USER_CLASS.calorie}
                title="Calories"
                unity="kCal"
                color="red"
              />
              <Kpi
                image={chicken}
                value={USER_CLASS.protein}
                title="Proteines"
                unity="g"
                color="blue"
              />
              <Kpi
                image={apple}
                value={USER_CLASS.carbohydrate}
                title="Glucides"
                unity="g"
                color="yellow"
              />
              <Kpi
                image={cheeseburger}
                value={USER_CLASS.lipid}
                title="Lipides"
                unity="g"
                color="pink"
              />
            </div>
          </div>
        </>
      )}
    </StyledDashboard>
  );
}

export default Dashboard;
