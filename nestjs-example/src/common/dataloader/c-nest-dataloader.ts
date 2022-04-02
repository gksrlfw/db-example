import { Logger } from '@nestjs/common';
import * as DataLoader from 'dataloader';

/**
 * NestDataLoader 에서 batchLoaderFunction 만 따로 작성하도록 합니다.
 * 옵션이 필요한 경우에는 setOptions 메서드를 이용합니다.
 */
export abstract class CNestDataLoader<ID, Type> {
  protected readonly logger: Logger = new Logger(this.constructor.name);
  private options: DataLoader.Options<ID, Type>;

  /**
   *
   */
  generateDataLoader(): DataLoader<ID, Type> {
    // return new DataLoader<ID, Type>(this.batchLoadFn.bind(this), this.options);
    return new DataLoader<ID, Type>(
      async (keys) => await this.batchLoadFn(keys),
      this.options,
    );
  }

  /**
   * 옵션을 설정합니다.
   * @param options
   */
  setOptions(options: DataLoader.Options<ID, Type>): void {
    this.options = options;
  }

  /**
   * batchLoadFn 을 작성합니다.
   */
  abstract batchLoadFn(keys: readonly ID[]): Promise<Type[]>;
}
