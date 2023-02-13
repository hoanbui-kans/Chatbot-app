/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NotFound } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import Intents from '../Intents';
import ConservationEditor from '../ConservationEditor';
import { Provider } from 'react-redux';
import { store } from '../store';

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Switch>
            <Route path={`/plugins/${pluginId}`} component={Intents} exact />
            <Route path={`/plugins/${pluginId}/composer`} component={ConservationEditor} exact />
            <Route component={NotFound} />
        </Switch>
    </Provider>
    </div>
  );
};

export default App;