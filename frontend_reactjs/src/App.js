import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'
import { AddTask } from './pages/Index'
import './index.css'

function App() {
  return (
    <Router>
        <Switch>
          <Route path='/addTask' component={AddTask} exact />
          <Redirect exact from='/' to='/addTask' />
        </Switch>
      </Router>
  );
}

export default App;
