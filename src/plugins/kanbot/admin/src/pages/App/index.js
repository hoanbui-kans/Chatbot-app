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
import WitAi from '../Witai';
import ConservationEditor from '../ConservationEditor';
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
        <Route path={`/plugins/${pluginId}`} component={WitAi} exact />
        <Route path={`/plugins/${pluginId}/:app_name/intents`} component={Intents} exact />
        <Route path={`/plugins/${pluginId}/:app_name/intents/:intent_id/composer`} component={ConservationEditor} exact />
        <Route path={`/plugins/${pluginId}/:app_name/entities`} component={Entities} exact />
        <Route path={`/plugins/${pluginId}/:app_name/traits`} component={Traits} exact />
        <Route path={`/plugins/${pluginId}/:app_name/utterances`} component={Utterances} exact />
        <Route component={NotFound} />
      </Switch>
    </Provider>
  );
};

export default App;
