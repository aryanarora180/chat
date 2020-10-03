import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login.js";
import Inbox from "./components/Inbox.js";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/inbox">
          <Inbox />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}
