import { Injectable, Logger } from '@nestjs/common';
import { PostService } from '@src/modules/post/post.service';
import { Post } from '@src/core/autogen/schema.graphql';
import { ILoader } from '@src/common/dataloader/i-loader';
import { DataloaderUtil } from '@src/common/dataloader/dataloader.util';
import { PostEntity } from '@src/modules/post/entities/post.entity';

/**
 * batchFnOnPosts
 * User 의 Posts 를 위한 dataloader 입니다.
 */
@Injectable()
export class UserPostsLoader implements ILoader<string> {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly postService: PostService) {}

  /**
   *
   * @param keys
   */
  async generate(keys: readonly string[]): Promise<Post[][]> {
    this.logger.debug(`generate(keys: ${keys})`);
    const posts = await this.postService.getPostsByUsers(
      Array.from<string>(keys),
    );

    return DataloaderUtil.responseList<string, PostEntity>(
      Array.from<string>(keys),
      posts,
      'userId',
    ).map((results) => results?.map((post) => post.toPost()));
  }
}
