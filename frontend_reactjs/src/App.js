import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'
import { Index } from './pages/Index'
import './index.css'

function App() {
  return (
    <Router>
        <Switch>
          <Route path='/' component={Index} exact />
          <Redirect path='*' to='/' exact />
        </Switch>
      </Router>
  );
}

export default App;
