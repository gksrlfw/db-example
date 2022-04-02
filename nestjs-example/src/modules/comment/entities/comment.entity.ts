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
import { Comment } from '@src/core/autogen/schema.graphql';
import { PostEntity } from '@src/modules/post/entities/post.entity';

/**
 *
 */
@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
    comment: '게시글ID',
    type: 'int',
  })
  postId: number;

  @ManyToOne(() => PostEntity, (post) => post.id)
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;

  @BeforeInsert()
  beforeInsert() {
    this.createdAt = CtDayjs.now();
    this.updatedAt = CtDayjs.now();
  }

  /**
   *
   */
  toComment(): Comment {
    return Object.assign(new Comment(), {
      id: this.id,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      postId: this.postId,
    });
  }
}
