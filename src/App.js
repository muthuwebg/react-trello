import './App.css'

import React from 'react'
import { Route, Switch } from 'react-router-dom';
// import List from "./List.js";
import AddBoard from "./AddBoard.js";
import Dashboard from "./Dashboard.js";

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/dashboard/:id" component= {Dashboard} />
        <Route path="/" component= {AddBoard} />
      </Switch>
    </>
  );
}

export default App;