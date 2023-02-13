/*
 *
 * HomePage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import AssetsManager from '../../components/AssetsManager';

const HomePage = () => {
  return (
    <div>
        <h1>{pluginId}&apos;s HomePage</h1>
        <p>Happy coding</p>
        <AssetsManager />
    </div>
  );
};

export default HomePage;
