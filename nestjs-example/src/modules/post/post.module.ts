import { Module } from '@nestjs/common';
import { PostResolver } from './post.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from '@src/modules/post/repositories/post.repository';
import { PostService } from '@src/modules/post/post.service';
import { CommentsLoader } from '@src/modules/post/loaders/comments.loader';
import { CommentRepository } from '@src/modules/comment/repositories/comment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository, CommentRepository])],
  providers: [PostResolver, PostService, CommentsLoader],
  exports: [PostService],
})
export class PostModule {}
