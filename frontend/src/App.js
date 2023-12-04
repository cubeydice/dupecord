import React from "react";
import { Route, Switch } from "react-router-dom";
import RouteChangeTracker from "./RouteChangeTracker";
import LoginForm from './components/SplashPage/LoginForm';
import RegisterForm from "./components/SplashPage/RegisterForm";
import SplashPage from "./components/SplashPage";
import ChannelsPage from "./components/MainPage";

export const handleImgError = (e) => {
  e.currentTarget.src='https://i.imgur.com/ZUnA3o9.png'
}

export const imgError = 'https://i.imgur.com/ZUnA3o9.png'

function App() {
  return (
    <div>
    <Switch>
      <Route exact path="/"><SplashPage /></Route>
      <Route path="/login"><LoginForm /></Route>
      <Route path="/register"><RegisterForm /></Route>
      <Route path="/channels/:serverId/:channelId"><ChannelsPage /></Route>
      <Route path="/channels/:serverId"><ChannelsPage /></Route>
      <Route path="/channels/@me"><ChannelsPage /></Route>
      <Route path="/"><SplashPage /></Route>
    </Switch>
    <RouteChangeTracker/>
    </div>
  );
}

export default App;
