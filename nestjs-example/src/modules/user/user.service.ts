import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '@src/modules/user/repositories/user.repository';
import { CreateUserInput } from '@src/core/autogen/schema.graphql';
import { UserEntity } from '@src/modules/user/entities/user.entity';
import { CommentRepository } from '@src/modules/comment/repositories/comment.repository';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly userRepository2: CommentRepository,
  ) {}

  /**
   *
   * @param id
   */
  getUserByName(name: string) {
    return this.userRepository.findOne({
      name,
    });
  }

  /**
   *
   */
  getUsers(): Promise<UserEntity[]> {
    return this.userRepository.getAllUsers();
  }

  /**
   *
   * @param name
   * @param age
   */
  create({ name, age }: CreateUserInput): Promise<UserEntity> {
    const instance = this.userRepository.create({
      name,
      age,
    });

    return this.userRepository.save(instance);
  }
}
