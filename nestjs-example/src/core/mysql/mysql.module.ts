import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection, TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { Connection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DbName } from '@src/core/mysql/db-name';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const mysqlHost = configService.get<string>('MYSQL_HOST', 'localhost');
        const mysqlPort = configService.get<number>('MYSQL_PORT', 3306);
        const mysqlUser = configService.get<string>('MYSQL_USER', 'root');
        const mysqlUserPassword = configService.get<string>(
          'MYSQL_USER_PASSWORD',
          '',
        );

        const mysqlName = configService.get<string>('MYSQL_NAME', 'template');

        return {
          // dbms 유형
          type: 'mysql',
          name: DbName.TEMPLATE,
          entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
          namingStrategy: new SnakeNamingStrategy(),
          synchronize: true,
          // debug: true,
          host: mysqlHost,
          port: mysqlPort,
          username: mysqlUser,
          password: mysqlUserPassword,
          database: mysqlName,
          logging: ['query', 'log', 'info', 'error'],
          // migrationsTableName: 'migration',
          // migrations: [__dirname + '/migrations/*.js'],
        };
      },
    }),
  ],
})
export class MysqlModule implements OnModuleInit {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  /**
   * Module 이 초기화되면 database connection 연결을 확인합니다.
   */
  async onModuleInit(): Promise<void> {
    this.logger.debug(`MysqlModule init`);
  }
}
