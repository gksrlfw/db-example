import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CtDayjs } from '@src/common/date/ct-dayjs';
import { CtDatetimeColumnTransformer } from '@src/common/typeorm/ct-datetime-column-transformer';
import { Post, User } from '@src/core/autogen/schema.graphql';
import { UserEntity } from '@src/modules/user/entities/user.entity';

/**
 *
 */
@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '제목',
    type: 'varchar',
    length: 120,
  })
  title: string;

  @Column({
    comment: '내용',
    type: 'varchar',
    length: 1000,
  })
  content: string;

  @Column({
    comment: '생성일자',
    type: 'datetime',
    transformer: CtDatetimeColumnTransformer,
  })
  createdAt: CtDayjs;

  @Column({
    comment: '수정일자',
    type: 'datetime',
    transformer: CtDatetimeColumnTransformer,
  })
  updatedAt: CtDayjs;

  @Column({
    comment: '작성자ID',
    type: 'varchar',
  })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @BeforeInsert()
  beforeInsert() {
    this.createdAt = CtDayjs.now();
    this.updatedAt = CtDayjs.now();
  }

  /**
   *
   */
  toPost(): Post {
    return Object.assign(new Post(), {
      id: this.id,
      title: this.title,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      userId: this.userId,
    });
  }

  /**
   *
   * @param title
   * @param content
   */
  update(title: string, content: string): PostEntity {
    this.title = title;
    this.content = content;
    return this;
  }
}
