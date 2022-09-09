import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import AppConfig from './app.config';

const { databaseOptions } = new AppConfig().build();

const ormConfig: PostgresConnectionOptions = {
  username: databaseOptions.user,
  password: databaseOptions.password,
  type: 'postgres',
  port: databaseOptions.dbPort,
  host: databaseOptions.endpoint,
  logging: true,
  database: databaseOptions.dbName,
  synchronize: databaseOptions.tableSchemaAutoupdate,
  migrationsTableName: 'migrations',
  migrationsRun: false,
  maxQueryExecutionTime: 3000,
  entities: ['dist/src/handlers/**/*.entity.js'],
  migrations: ['dist/src/migrations/*.js'],
  ssl: process.env.SLL === 'true' ? { rejectUnauthorized: false } : false,
  namingStrategy: new SnakeNamingStrategy(),
};

export default ormConfig;
