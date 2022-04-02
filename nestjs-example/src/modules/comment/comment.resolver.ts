import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentService } from '@src/modules/comment/comment.service';
import {
  Comment,
  CreateCommentInput,
  User,
} from '@src/core/autogen/schema.graphql';

@Resolver('Comment')
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  /**
   *
   */
  @Query(() => [Comment])
  async getComments(): Promise<Comment[]> {
    return (await this.commentService.getComments()).map((post) =>
      post.toComment(),
    );
  }

  /**
   *
   * @param input
   */
  @Mutation(() => User)
  async createComment(
    @Args('input') input: CreateCommentInput,
  ): Promise<Comment> {
    return (await this.commentService.create(input)).toComment();
  }
}
