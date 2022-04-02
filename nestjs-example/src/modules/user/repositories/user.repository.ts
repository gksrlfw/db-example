import {
  Connection,
  EntityRepository,
  getConnection,
  Repository,
} from 'typeorm';
import { UserEntity } from '@src/modules/user/entities/user.entity';
import { DbName } from '@src/core/mysql/db-name';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  /**
   *
   */
  toString(): string {
    return 'UserRepository';
  }

  /**
   *
   */
  getAllUsers(): Promise<UserEntity[]> {
    return this.createQueryBuilder('u').getMany();
  }

  /**
   *
   * @param name
   */
  findByName(name: string): Promise<UserEntity[]> {
    return this.createQueryBuilder('user')
      .where('name = :name', { name })
      .getMany();
  }
}
