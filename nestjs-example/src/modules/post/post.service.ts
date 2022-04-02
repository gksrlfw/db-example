import { Injectable, Logger } from '@nestjs/common';
import {
  CreatePostInput,
  UpdatePostInput,
} from '@src/core/autogen/schema.graphql';
import { PostRepository } from '@src/modules/post/repositories/post.repository';
import { UserEntity } from '@src/modules/user/entities/user.entity';
import { PostEntity } from '@src/modules/post/entities/post.entity';
import { CtError } from '@src/common/error/ct-error';
import { CtErrorType } from '@src/common/error/ct-error-type';

@Injectable()
export class PostService {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly postRepository: PostRepository) {}

  /**
   *
   */
  async getPosts(): Promise<PostEntity[]> {
    return this.postRepository.getAllPosts();
  }

  /**
   *
   * @param name
   */
  async create({
    title,
    content,
    userId,
  }: CreatePostInput): Promise<PostEntity> {
    const instance = this.postRepository.create({
      title,
      content,
      user: {
        id: userId,
      } as UserEntity,
    });

    return this.postRepository.save(instance);
  }

  /**
   *
   * @param userIds
   */
  getPostsByUsers(userIds: string[]): Promise<PostEntity[]> {
    return this.postRepository.getAllPostsByUsers(userIds);
  }

  /**
   *
   * @param id
   * @param title
   * @param content
   */
  async update({ id, title, content }: UpdatePostInput): Promise<PostEntity> {
    this.logger.debug(
      `update({ id: ${id}, title: ${title}, content: ${content})`,
    );
    const instance = await this.postRepository.findOne(id);

    if (!instance) {
      this.logger.debug(`id: ${id} 를 찾을 수 없습니다.`);
      throw new CtError(
        CtErrorType.ResourceNotFound,
        '게시글의 ID 를 확인해주세요',
      );
    }

    instance.update(title, content);

    return this.postRepository.save(instance);
  }
}
