const path = require('path');

module.exports = {
  type: 'mongodb',
  url: process.env.DATABASE_URL,
  autoLoadEntities: true,
  useUnifiedTopology: true,
  synchronize: true,
  logging: true,
  ssl: true,
  entities: [path.join(__dirname, './**/*.entity{.ts,.js}')],
};