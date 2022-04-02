import { Module, OnModuleInit } from '@nestjs/common';
import { UserModule } from '@src/modules/user/user.module';
import { CoreModule } from '@src/core/core.module';
import { PostModule } from '@src/modules/post/post.module';
import { CommentModule } from '@src/modules/comment/comment.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from '@src/common/dataloader/nestjs-dataloader';
import { CommonModule } from '@src/common/common.module';
import { AuthModule } from '@src/modules/auth/auth.module';

@Module({
  imports: [
    CoreModule,
    CommonModule,
    UserModule,
    PostModule,
    CommentModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    // const client = RedisService.get();
    // console.log('client', client);
  }
}
