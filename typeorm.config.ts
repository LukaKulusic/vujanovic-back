import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

require('dotenv').config();

const dbConfig = config.get('db');

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity.ts', __dirname + '/**/*.entity.js'],
  migrationsRun: false,
  logging: true,
  migrationsTableName: 'migration',
  migrations: [
    __dirname + '/migration/**/*.ts',
    __dirname + '/migration/**/*.js',
  ],
  synchronize: true,
  //   cli: {
  //     // migrationsDir: 'src/migration',
  //   },
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
};

export = typeOrmConfig;
