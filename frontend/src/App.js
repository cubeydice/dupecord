import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginForm from './components/LoginForm';
import RegisterForm from "./components/RegisterForm";
import SplashPage from "./components/SplashPage";
import ChannelsPage from "./components/ChannelsPage";
import ServerForm from "./components/ServerForm";

function App() {
  return (
    <Switch>
      <Route exact path="/"><SplashPage /></Route>
      <Route path="/login"><LoginForm /></Route>
      <Route path="/register"><RegisterForm /></Route>
      <Route path="/channels/create-server"><ServerForm /></Route>
      <Route path="/channels/:serverId"><ChannelsPage /></Route>
      <Route path="/channels/:serverId/:channelId"><ChannelsPage /></Route>
      <Route path="/channels"><ChannelsPage /></Route>
    </Switch>
  );
}

export default App;
