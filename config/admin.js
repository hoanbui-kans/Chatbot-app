module.exports = ({ env }) => ({
  url: '/', // Note: The administration will be accessible from the root of the domain (ex: http://yourfrontend.com/)
  serveAdminPanel: true, // http://yourbackend.com will not serve any static admin files
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: { 
    salt: env('API_TOKEN_SALT'),
  },
});
