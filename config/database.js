module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', '125.212.221.198'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'app_db'),
      user: env('DATABASE_USERNAME', 'app_db'),
      password: env('DATABASE_PASSWORD', '01272345'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
