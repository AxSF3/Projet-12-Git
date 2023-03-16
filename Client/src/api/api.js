import * as MOCKED_DATA from "../__mocks__/datamocked";
import axios from 'axios';

async function getURL(id, userswitch, uri) {

  // Export User Infos from the Mock

  if (userswitch === "mock") {
    switch (uri) {
      case "":
        const MOCKED_USER = MOCKED_DATA.USER_MAIN_DATA.find(
          (user) => user.id === parseInt(id)
        );
          
        return MOCKED_USER;
      case "activity":
        const MOCKED_USER_ACTIVITY = MOCKED_DATA.USER_ACTIVITY.find(
          (user) => user.userId === parseInt(id)
        );

        return MOCKED_USER_ACTIVITY;
      case "average-sessions":
        const MOCKED_USER_AVERAGE_SESSIONS =
          MOCKED_DATA.USER_AVERAGE_SESSIONS.find(
            (user) => user.userId === parseInt(id)
          );
          
        return MOCKED_USER_AVERAGE_SESSIONS;
      case "performance":
        const MOCKED_USER_PERFORMANCE = MOCKED_DATA.USER_PERFORMANCE.find(
          (user) => user.userId === parseInt(id)
        );
        return MOCKED_USER_PERFORMANCE;
      default:
        break;
    }
  } else {

    // Export User Infos from the API

    const instance = axios.create({
      baseURL: "http://localhost:1234/user",
      headers: {"X-Custom-Header": "foobar"},
      timeout: 1000
    });

    switch (uri) {

      case "":
        const response = await instance.get(`/${id}`);
        return response.data.data;
      
    
      case "activity":
        const response_activity = await instance.get(`/${id}/activity`);
        return response_activity.data.data;


      case "average-sessions":
        const response_average_sessions = await instance.get(`/${id}/average-sessions`);
        return response_average_sessions.data.data;
     

      case "performance":
        const response_performance = await instance.get(`/${id}/performance`);
        return response_performance.data.data;
    
        default:
        break;

    }

}
}


async function getUser(id, userswitch) {
  return await getURL(id, userswitch, "");
}


async function getActivity(id, userswitch) {
  return await getURL(id, userswitch, "activity");
}


async function getAverageSessions(id, userswitch) {
  return await getURL(id, userswitch, "average-sessions");
}


async function getPerformance(id, userswitch) {
  return await getURL(id, userswitch, "performance");
}

export { getUser, getActivity, getAverageSessions, getPerformance };
