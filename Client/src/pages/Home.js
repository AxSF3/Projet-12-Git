import React from "react";
import { useNavigate } from "react-router-dom";

// CSS
import { StyledHome } from "./styles/Home.styled";


const Home = () => {
  const navigate = useNavigate();

  // User token

  const SetUserToken = (user, id) => {
    localStorage.removeItem("accessToken");
    localStorage.setItem("accessToken", id);
    navigate(`/${user}/${id}`);
  };

  return (
    <StyledHome className="home">
      <div className="home__links">
  
        <div>
          <button
            className="home__links--link"
            onClick={() => {
              SetUserToken("mock", 18);
            }}
          >
          Cécilia Ratorez
          </button>
        </div>
        <div>
          <button
            className="home__links--link"
            onClick={() => {
              SetUserToken("mock", 12);
            }}
          >
          Karl Dovineau
          </button>
        </div>

      </div>
    </StyledHome>
  );
};
export default Home;
