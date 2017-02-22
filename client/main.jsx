import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.jsx';
import { renderRoutes } from '../imports/lib/routes.js';
import DataManager from '../imports/api/DataManager.js';

Meteor.startup(() => {
  let dataManger = new DataManager();
  render(renderRoutes(), document.getElementById('render-target'));
});
