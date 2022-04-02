import {
  Logger,
  Module,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { RedisService } from '@src/common/redis/redis.service';

@Module({
  imports: [],
  providers: [RedisService],
  exports: [RedisService],
})
export class CommonModule implements OnModuleInit {
  private readonly logger: Logger = new Logger(this.constructor.name);

  async onModuleInit() {
    const client = await RedisService.get();
    await client.set('test', '1');
    this.logger.debug(
      `CommonModule init, redis['1']: ${await client.get('test')}`,
    );
  }
}
