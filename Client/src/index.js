import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// CSS
import GlobalStyle from "./theme/globalStyle";
import { ThemeProvider } from "styled-components";
import themeStyled from "./theme/schema.json";

// Pages
import Home from "./pages/Home";
import Userindex from "./pages/Userindex";

// Components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Erreur404 from "./components/404";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Router>
      <ThemeProvider theme={themeStyled}>
        <Header />
        <Sidebar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/:userswitch/:id" element={<Userindex />} />
          <Route path="*" element={<Erreur404 />}/>

        </Routes>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
