import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import App from '../ui/App.jsx';
import Admin from '../ui/Admin.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/admin" component={Admin}/>
  </Router>
);
