import React from "react";
import {
  Switch,
  Redirect,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import CoinDetails from "./components/CoinDetails";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Switch>
          <Route path="/coins/:id">
            {(props) => <CoinDetails {...props} />}
          </Route>
          <Route path="/coins" component={Home} />
          <Route path="/not-found" component={NotFound} />
          <Redirect exact from="/" to="/coins" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
