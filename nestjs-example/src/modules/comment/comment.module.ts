import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from '@src/modules/post/post.module';
import { CommentResolver } from '@src/modules/comment/comment.resolver';
import { CommentService } from '@src/modules/comment/comment.service';
import { CommentRepository } from '@src/modules/comment/repositories/comment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository]), PostModule],
  providers: [CommentResolver, CommentService],
  exports: [],
})
export class CommentModule {}
