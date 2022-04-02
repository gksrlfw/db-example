import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  Comment,
  CreatePostInput,
  Post,
  UpdatePostInput,
  User,
} from '@src/core/autogen/schema.graphql';
import { Logger, UseGuards } from '@nestjs/common';
import { PostService } from '@src/modules/post/post.service';
import { Loader } from '@src/common/dataloader/nestjs-dataloader';
import { CommentsLoader } from '@src/modules/post/loaders/comments.loader';
import * as DataLoader from 'dataloader';
import { JwtGuard } from '@src/modules/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Resolver('Post')
export class PostResolver {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly postService: PostService) {}

  /**
   *
   */
  @Query(() => [Post])
  async getPosts(): Promise<Post[]> {
    return (await this.postService.getPosts()).map((post) => post.toPost());
  }

  /**
   *
   * @param input
   */
  @Mutation(() => User)
  async createPost(@Args('input') input: CreatePostInput): Promise<Post> {
    return (await this.postService.create(input)).toPost();
  }

  /**
   *
   * @param input
   */
  @Mutation(() => User)
  async updatePost(@Args('input') input: UpdatePostInput): Promise<Post> {
    this.logger.debug(`updatePost(input: ${JSON.stringify(input)})`);
    return (await this.postService.update(input)).toPost();
  }

  /**
   *
   * @param post
   * @param commentsLoader
   */
  @ResolveField('comments')
  async comments(
    @Parent() post: Post,
    @Loader(CommentsLoader) commentsLoader: DataLoader<number, Comment[]>,
  ): Promise<Comment[]> {
    this.logger.debug(`comments(post: ${JSON.stringify(post)})`);
    return commentsLoader.load(post.id);
  }
}
