
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

import { CtDayjs } from '@src/common/date/ct-dayjs'

export class JoinInput {
    id: string;
    password: string;
    name: string;
    age: number;
}

export class LoginInput {
    id: string;
    password: string;
}

export class CreateCommentInput {
    postId: number;
    content: string;
}

export class CreatePostInput {
    userId: string;
    title: string;
    content: string;
}

export class UpdatePostInput {
    id: number;
    title: string;
    content: string;
}

export class CreateUserInput {
    name: string;
    age: number;
}

export abstract class IQuery {
    abstract getComments(): Nullable<Comment>[] | Promise<Nullable<Comment>[]>;

    abstract getPosts(): Nullable<Post>[] | Promise<Nullable<Post>[]>;

    abstract getUsers(): Nullable<User>[] | Promise<Nullable<User>[]>;
}

export abstract class IMutation {
    abstract join(input: JoinInput): User | Promise<User>;

    abstract login(input: LoginInput): User | Promise<User>;

    abstract createComment(input: CreateCommentInput): Comment | Promise<Comment>;

    abstract createPost(input: CreatePostInput): Post | Promise<Post>;

    abstract updatePost(input: UpdatePostInput): Post | Promise<Post>;

    abstract createUser(input: CreateUserInput): User | Promise<User>;
}

export class Comment {
    id?: Nullable<number>;
    content?: Nullable<string>;
    postId?: Nullable<number>;
}

export class Post {
    id?: Nullable<number>;
    title?: Nullable<string>;
    content?: Nullable<string>;
    createdAt?: Nullable<CtDatetime>;
    updatedAt?: Nullable<CtDatetime>;
    userId?: Nullable<number>;
    comments?: Nullable<Nullable<Comment>[]>;
}

export class User {
    id?: Nullable<string>;
    name?: Nullable<string>;
    age?: Nullable<number>;
    createdAt?: Nullable<CtDatetime>;
    updatedAt?: Nullable<CtDatetime>;
    token?: Nullable<string>;
    posts?: Nullable<Nullable<Post>[]>;
}

export type CtDate = CtDayjs;
export type CtDatetime = CtDayjs;
type Nullable<T> = T | null;
