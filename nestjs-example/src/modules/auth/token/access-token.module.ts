import { UserRepository } from '@src/modules/user/repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@src/modules/user/user.module';
import { Global, Module } from '@nestjs/common';
import { AccessTokenService } from '@src/modules/auth/token/access-token.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: process.env.ACCESS_SECRET,
      signOptions: {
        expiresIn: '60s',
      },
    }),
    UserModule,
  ],
  providers: [AccessTokenService],
  exports: [AccessTokenService],
})
export class AccessTokenModule {}
