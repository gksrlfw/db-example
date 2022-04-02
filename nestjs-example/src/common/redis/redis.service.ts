import { Injectable, Logger } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { CtError } from '@src/common/error/ct-error';
import { CtErrorType } from '@src/common/error/ct-error-type';

/**
 * redis
 */
@Injectable()
export class RedisService {
  private static readonly logger: Logger = new Logger(RedisService.name);
  private static client: RedisClientType;

  public static async get(): Promise<RedisClientType> {
    if (!this.client) {
      const port = process.env.REDIS_PORT;
      const host = process.env.REDIS_HOST;
      const url = `redis://${host}:${port}`;
      this.client = createClient({
        url,
      });

      this.client.on('error', (err) => {
        RedisService.logger.error(`onError: ${JSON.stringify(err)}`);
        throw new CtError(CtErrorType.InternalServerError);
      });

      this.client.on('ready', () => {
        RedisService.logger.debug(`ready`);
      });

      this.client.on('connect', () => {
        RedisService.logger.debug(`Redis connected, url: ${url}`);
      });

      await this.client.connect();
    }

    return this.client;
  }

  // private onError() {
  //   RedisService.client.on('error', err => {
  //     this.logger.error(`onError: ${JSON.stringify(err)}`);
  //     throw new CtError(CtErrorType.InternalServerError);
  //   });
  // }
  //
  // private onReady() {
  //   RedisService.client.on('ready', () => {
  //     this.logger.debug(`onReady()`);
  //   });
  // }
}
