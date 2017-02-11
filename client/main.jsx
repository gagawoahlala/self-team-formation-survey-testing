import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.jsx';
import DataManager from '../imports/api/DataManager.js';

Meteor.startup(() => {
  let dataManger = new DataManager();
  render(<App data={dataManger.fakeData()}/>, document.getElementById('render-target'));
});
