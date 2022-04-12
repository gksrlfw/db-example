import { Connection, createConnection } from 'typeorm';
import { User } from './entities/user.entity';
import dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({
  path: join(__dirname, '..', '.env'),
});

export async function initialiseTestDatabase() {
  return new Promise<Connection>((resolve, reject) => {
    console.log('???', process.env.DB_TYPE);
    const connectionConfig = {
      name: 'test',
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User],
      synchronize: true,
      // dropSchema: process.env.DB_INIT,
      logging: false,
    };

    createConnection(connectionConfig as any)
      .then((connection) => {
        // here you can start to work with your entities
        if (process.env.DB_INIT) {
          console.log(`Database initialised...`);
        }
        resolve(connection);
      })
      .catch((error) => reject(error));
  });
}
