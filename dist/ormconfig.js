require('dotenv').config();
module.exports = {
    type: process.env.DB_TYPE,
    host: `${process.env.POSTGRES_HOST}`,
    port: process.env.POSTGRES_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/src/**/*.entity.js'],
    synchronize: true,
    dropSchema: true,
    seeds: ['dist/src/database/seeding/seeds/**/*.js'],
    factories: ['dist/src/database/factories/**/*.js'],
};
//# sourceMappingURL=ormconfig.js.map