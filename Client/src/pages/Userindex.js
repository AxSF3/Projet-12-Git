import React from "react";
import Dashboard from "../components/Dashboard";

// CSS
import { StyledUserindex } from "./styles/Userindex.styled";

function Userindex() {
  return (
    <StyledUserindex className="user">
      <Dashboard />
    </StyledUserindex>
  );
}

export default Userindex;
