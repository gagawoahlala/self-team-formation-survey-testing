import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import App from '../ui/App.jsx';
import Admin from '../ui/Admin.jsx';
import SurveyStage from '../ui/Survey.jsx';

window.browserHistory = browserHistory;


export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/admin" component={Admin}/>
    <Route path='/survey' component={SurveyStage}/>
    <Route path='/exitsurvey' component={() => window.location='https://ucsdsocialsciences.co1.qualtrics.com/jfe/form/SV_3PBujRi8JEVD4ot'}/>
  </Router>
);
