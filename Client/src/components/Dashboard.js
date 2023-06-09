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
  const [getUserById, setgetUserById] = useState(false);
  const [getUserActivityById, setgetUserActivityById] = useState({});
  const [getUserAverageSessionById, setgetUserAverageSessionById] = useState(
    {}
  );
  const [getUserPerformanceById, setgetUserPerformanceById] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async (id, userswitch) => {
      const USER = await getUser(id, userswitch);
      const ACTIVITY = await getActivity(id, userswitch);
      const AVERAGE_SESSIONS = await getAverageSessions(id, userswitch);
      const PERFORMANCE = await getPerformance(id, userswitch);

      setgetUserById(USER);
      setgetUserActivityById(ACTIVITY);
      setgetUserAverageSessionById(AVERAGE_SESSIONS);
      setgetUserPerformanceById(PERFORMANCE);
      setIsLoading(false);
    };
    fetch(id, userswitch);
  }, [id, userswitch]);

  if (getUserById === null || getUserById === undefined) return <Erreur404 />;

  const USER_CLASS = !isLoading
    ? new User(
        getUserById?.userInfos.firstName,
        getUserById?.userInfos.lastName,
        getUserById?.userInfos.age,
        getUserById?.score ? getUserById.score : getUserById.todayScore,
        getUserById?.keyData.calorieCount,
        getUserById?.keyData.proteinCount,
        getUserById?.keyData.carbohydrateCount,
        getUserById?.keyData.lipidCount
      )
    : "";

    // Create every graph with data

  return (
    <StyledDashboard className="dashboard">
      {isLoading ? (
        <p>Wait please...</p>
      ) : (
        <>
          <HeaderDashboard first={USER_CLASS.firstName} />
          <div className="dashboard__charts">
            <div className="dashboard__charts-left">
              <Activity userActivityData={getUserActivityById} />
              <AverageSession averageSessionsData={getUserAverageSessionById} />
              <Performance performanceData={getUserPerformanceById} />
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
