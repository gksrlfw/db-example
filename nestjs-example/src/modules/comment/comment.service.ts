import { Injectable, Logger } from '@nestjs/common';
import { CreateCommentInput } from '@src/core/autogen/schema.graphql';
import { CommentRepository } from '@src/modules/comment/repositories/comment.repository';
import { CommentEntity } from '@src/modules/comment/entities/comment.entity';
import { PostEntity } from '@src/modules/post/entities/post.entity';

@Injectable()
export class CommentService {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly commentRepository: CommentRepository) {}

  /**[
   *
   */
  async getComments(): Promise<CommentEntity[]> {
    return this.commentRepository.getAllComments();
  }

  /**
   *
   * @param name
   */
  async create({
    content,
    postId,
  }: CreateCommentInput): Promise<CommentEntity> {
    const instance = this.commentRepository.create({
      content,
      post: {
        id: postId,
      } as PostEntity,
    });

    return this.commentRepository.save(instance);
  }
}
