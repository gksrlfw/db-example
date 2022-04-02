import { EntityRepository, Repository } from 'typeorm';
import { CommentEntity } from '@src/modules/comment/entities/comment.entity';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  /**
   *
   */
  toString(): string {
    return 'CommentRepository';
  }

  /**
   *
   */
  getAllComments(): Promise<CommentEntity[]> {
    return this.createQueryBuilder('c').getMany();
  }

  /**
   *
   * @param userIds
   */
  getCommentsByPosts(postIds: number[]): Promise<CommentEntity[]> {
    return this.createQueryBuilder('c')
      .where('post_id in (:postIds)', { postIds })
      .getMany();
  }
}
