// ./src/admin/webpack.config.js
'use strict';

/* eslint-disable no-unused-vars */
module.exports = (config, webpack) => {
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack config
  // Important: return the modified config
  config.plugins.push(
    new webpack.DefinePlugin({
      CLIENT_FRONTEND_URL: process.env.CLIENT_FRONTEND_URL,
      CLIENT_FB_REQUEST_VERSION: process.env.FB_REQUEST_VERSION,
      CLIENT_FB_APP_ID: process.env.FB_APP_ID,
      CLIENT_FB_APP_SECRECT: process.env.FB_APP_SECRECT,
    })
  )

  return config;
};