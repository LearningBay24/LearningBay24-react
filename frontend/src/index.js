import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as
Router,
Routes,
Route,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./css/index.css";
// import App from "./components/App";
import Abgabenuebersicht from "./components/Abgabenuebersicht";
import Anlegen from "./components/Anlegen";
import Benachrichtigungen from "./components/Benachrichtigungen";
import Institution from "./components/Institution";
import Klausurenuebersicht from "./components/Klausurenuebersicht";
import Wrapper from "./components/Kursansicht";
import Kursuebersicht from "./components/Kursuebersicht";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Stundenplan from "./components/Stundenplan";
import Suchergebnis from "./components/Suchergebnis";


ReactDOM.render(
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/abgabenuebersicht"
          element={<Abgabenuebersicht />} />
        <Route exact path="/anlegen" element={<Anlegen />} />
        <Route exact path="/benachrichtigungen"
          element={<Benachrichtigungen />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/institution" element={<Institution />} />
        <Route exact path="/klausurenuebersicht"
          element={<Klausurenuebersicht />} />
        <Route exact path="/kursansicht/:id" element={<Wrapper />} />
        <Route exact path="/kursuebersicht" element={<Kursuebersicht />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/stundenplan" element={<Stundenplan />} />
        <Route exact path="/suchergebnis" element={<Suchergebnis />} />
      </Routes>
    </Router>,
    document.getElementById("root"),
);
