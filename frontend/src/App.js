import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginForm from './components/LoginForm';
import RegisterForm from "./components/RegisterForm";
import SplashPage from "./components/SplashPage";
import ProfileBar from "./components/ProfileBar";

function App() {
  return (
    <Switch>
      <Route exact path="/"><SplashPage /></Route>
      <Route path="/login"><LoginForm /></Route>
      <Route path="/register"><RegisterForm /></Route>
      <Route path="/channels/@me"><ProfileBar /></Route>
    </Switch>
  );
}

export default App;
