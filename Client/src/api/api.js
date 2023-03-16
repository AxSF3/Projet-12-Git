import * as MOCKED_DATA from "../__mocks__/datamocked";
import axios from "axios";

async function getURL(id, userswitch, uri) {
  let userData = {};

  // Export User Infos from the Mock

  if (userswitch === "mock") {
    userData.USER = MOCKED_DATA.USER_MAIN_DATA.find(
      (user) => user.id === parseInt(id)
    );


    userData.ACTIVITY = MOCKED_DATA.USER_ACTIVITY.find(
      (user) => user.userId === parseInt(id)
    );


    userData.AVERAGE_SESSION = MOCKED_DATA.USER_AVERAGE_SESSIONS.find(
      (user) => user.userId === parseInt(id)
    );


    userData.PERFORMANCE = MOCKED_DATA.USER_PERFORMANCE.find(
      (user) => user.userId === parseInt(id)
    );
  } else {
    // Export User Infos from the API

    const instance = axios.create({
      baseURL: "http://localhost:1234/user",
      headers: { "X-Custom-Header": "foobar" },
      timeout: 1000,
    });

    userData.USER = await instance.get(`/${id}`);

    userData.ACTIVITY = await instance.get(`/${id}/activity`);

    userData.AVERAGE_SESSION = await instance.get(`/${id}/average-sessions`);

    userData.PERFORMANCE = await instance.get(`/${id}/performance`);
  }
  return userData;
}

  

async function getUser(id, userswitch) {
  console.log('mmmm')
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
