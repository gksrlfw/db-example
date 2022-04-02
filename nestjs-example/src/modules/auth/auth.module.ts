import { UserRepository } from '@src/modules/user/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '@src/modules/auth/auth.service';
import { UserModule } from '@src/modules/user/user.module';
import { AuthResolver } from '@src/modules/auth/auth.resolver';
import { Global, Module } from '@nestjs/common';
import { RefreshTokenModule } from '@src/modules/auth/token/refresh-token.module';
import { AccessTokenModule } from '@src/modules/auth/token/access-token.module';
import { RedisService } from '@src/common/redis/redis.service';

@Global()
@Module({
  imports: [
    AccessTokenModule,
    RefreshTokenModule,
    TypeOrmModule.forFeature([UserRepository]),
    UserModule,
  ],
  providers: [AuthService, AuthResolver, RedisService],
  exports: [AuthService],
})
export class AuthModule {}
