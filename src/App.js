import React from 'react';
import Garden from './components/Garden/Garden';
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';

import './App.css';

function App (){
  return(
    <div className="App">
      <header className="App-header">
        <h1>Welcome to your garden!</h1>
      </header>
      <Router>
        <Route exact path="/">
          <Garden />
        </Route>
        <Switch>
          <Route path="/api/plant/details/:id" />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
