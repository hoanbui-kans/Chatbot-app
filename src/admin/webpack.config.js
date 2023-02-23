// ./src/admin/webpack.config.js
'use strict';
module.exports = (config, webpack) => {
  config.plugins.push(
    new webpack.DefinePlugin({
        ENV: {
          CLIENT_FRONTEND_URL: JSON.stringify(process.env.CLIENT_FRONTEND_URL),
          CLIENT_FB_URL: JSON.stringify(process.env.FB_REQ_URL),
          CLIENT_FB_REQUEST_VERSION: JSON.stringify(process.env.FB_REQUEST_VERSION),
          CLIENT_FB_APP_ID: JSON.stringify(process.env.FB_APP_ID),
          CLIENT_FB_APP_SECRECT: JSON.stringify(process.env.FB_APP_SECRECT),
        }
    })
  )

  return config;
};