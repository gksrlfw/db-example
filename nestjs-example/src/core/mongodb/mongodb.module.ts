import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

/**
 *
 */
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const logger = new Logger('MongooseModule');

        const host = configService.get<string>('MONGODB_HOST') || 'localhost';
        const user = configService.get<string>('MONGODB_USER') || '';
        const password =
          configService.get<string>('MONGODB_USER_PASSWORD') || '';
        const dbName = configService.get<string>('MONGODB_DB') || 'test';

        // fixme
        const uri = `mongodb://${host}:27017/${dbName}`;
        logger.debug(`uri: ${uri}`);
        return {
          uri,
          retryAttempts: 5,
          connectTimeoutMS: 1000 * 50,
          socketTimeoutMS: 1000 * 50, // default timeout 30s
        };
      },
    }),
  ],
})
export class MongodbModule implements OnModuleInit {
  private readonly logger: Logger = new Logger(this.constructor.name);

  onModuleInit(): void {
    this.logger.debug(`MongodbModule init`);
  }
}
