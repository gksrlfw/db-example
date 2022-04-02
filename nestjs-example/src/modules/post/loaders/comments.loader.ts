import { Injectable, Logger, Scope } from '@nestjs/common';
import { Comment } from '@src/core/autogen/schema.graphql';
import { DataloaderUtil } from '@src/common/dataloader/dataloader.util';
import { CommentRepository } from '@src/modules/comment/repositories/comment.repository';
import { CommentEntity } from '@src/modules/comment/entities/comment.entity';
import { CNestDataLoader } from '@src/common/dataloader/c-nest-dataloader';

/**
 * Nest-dataloader 사용
 */
@Injectable({
  scope: Scope.REQUEST,
})
export class CommentsLoader extends CNestDataLoader<number, Comment[]> {
  protected readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly commentRepository: CommentRepository) {
    super();
  }

  async batchLoadFn(keys: number[]): Promise<Comment[][]> {
    this.logger.debug(`batchLoadFn(keys: ${keys})`);
    const comments = await this.commentRepository.getCommentsByPosts(
      Array.from<number>(keys),
    );

    return DataloaderUtil.responseList<number, CommentEntity>(
      Array.from<number>(keys),
      comments,
      'postId',
    ).map((results) => results?.map((comment) => comment.toComment()));
  }
}
