import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import CrimeInfo from "./pages/CrimeInfo/CrimeInfo";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "./App.css";

require("dotenv").config();

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/crime/state/:stateId" component={CrimeInfo} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}
