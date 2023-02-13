module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.0'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'strapi'),
      user: env('DATABASE_USERNAME', 'trapi'),
      password: env('DATABASE_PASSWORD', 'strai'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
