import React from "react";
import { NavLink } from "react-router-dom";

// CSS
import { Styled404 } from "./styles/404.styled";

function Erreur404() {
    return(
     
        <Styled404 className="average-session">
        <div className="page-404">
            <h1 className="titre-404">404</h1>
            <span className="description-404">Oups! La page que vous demandez n'existe pas.</span>
            <NavLink to="/" className="lien-site lien-404">Retourner sur la page d’accueil</NavLink>
        </div>
        </Styled404>
     
    );
}

export default Erreur404;