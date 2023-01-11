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
import HomePage from '../HomePage';
import Bot from '../Bot';
import Settings from '../Settings';
import Addbot from '../Settings/Addbot';
import Composer from '../Composer';
import Intents from '../Intents';
import Entities from '../Entities';
import Traits from '../Traits';
import Utterances from '../Utterances';
import { Provider } from 'react-redux';
import { store } from '../store';

const App = () => {
  return (
    <Provider store={store}>
      <Switch>
        <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
        <Route path={`/plugins/${pluginId}/bot`} component={Bot} exact />
        <Route path={`/plugins/${pluginId}/settings`} component={Settings} exact />
        <Route path={`/plugins/${pluginId}/intents`} component={Intents} exact />
        <Route path={`/plugins/${pluginId}/entities`} component={Entities} exact />
        <Route path={`/plugins/${pluginId}/Traits`} component={Traits} exact />
        <Route path={`/plugins/${pluginId}/Utterances`} component={Utterances} exact />
        <Route path={`/plugins/${pluginId}/settings/add-bot`} component={Addbot} exact />
        <Route path={`/plugins/${pluginId}/:id/composer`} component={Composer} exact />
        <Route component={NotFound} />
      </Switch>
    </Provider>
  );
};

export default App;
