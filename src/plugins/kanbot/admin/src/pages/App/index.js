/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NotFound } from '@strapi/helper-plugin';
import { Provider } from 'react-redux';
import { store } from '../store';

import pluginId from '../../pluginId';
import Response from '../Response';
import Utterances from '../Utterances';
import Conservation from '../Conservation';
import ConservationEditor from '../ConservationEditor';

const App = () => {
  return (
    <Provider store={store}>
      <Switch>
        <Route path={`/plugins/${pluginId}/`} component={Conservation} exact />
        <Route path={`/plugins/conservation/:bot_id/editor`} component={ConservationEditor} exact />
        <Route path={`/plugins/${pluginId}/:app_name/responses`} component={Response} exact />
        <Route path={`/plugins/${pluginId}/:app_name/utterances`} component={Utterances} exact />
        <Route component={NotFound} />
      </Switch>
    </Provider>
  );
};

export default App;
