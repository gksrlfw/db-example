import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CtDayjs } from '@src/common/date/ct-dayjs';
import { CtDatetimeColumnTransformer } from '@src/common/typeorm/ct-datetime-column-transformer';
import { User } from '@src/core/autogen/schema.graphql';
import { classToPlain, Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { UserTokenPayload } from '@src/modules/auth/types/user-token-payload';

@Entity('user')
export class UserEntity {
  @PrimaryColumn({
    comment: 'ID',
    type: 'varchar',
    length: 20,
    unique: true,
    nullable: false,
  })
  id: string;

  @Column({
    comment: '비밀번호',
    type: 'varchar',
    length: 120,
    nullable: false,
  })
  @Exclude()
  password: string;

  @Column({
    comment: '이름',
    type: 'varchar',
    length: 20,
  })
  name: string;

  @Column({
    comment: '나이',
    type: 'int',
    precision: 6,
  })
  age: number;

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

  /**
   * token
   */
  token: string;

  @BeforeInsert()
  async beforeInsert() {
    this.createdAt = CtDayjs.now();
    this.updatedAt = CtDayjs.now();
    this.password = await bcrypt.hash(this.password, 10);
  }

  /**
   *
   * @param password
   */
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  /**
   *
   */
  toUser(): User {
    return Object.assign(new User(), {
      id: this.id,
      name: this.name,
      age: this.age,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      token: this.token,
    });
  }

  toPayload(): UserTokenPayload {
    return Object.assign(new UserTokenPayload(), {
      id: this.id,
      name: this.name,
    });
  }
}
