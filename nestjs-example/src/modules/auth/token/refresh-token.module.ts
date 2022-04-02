import { UserRepository } from '@src/modules/user/repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@src/modules/user/user.module';
import { Global, Module } from '@nestjs/common';
import { RefreshTokenService } from '@src/modules/auth/token/refresh-token.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: process.env.REFRESH_SECRET,
      signOptions: {
        expiresIn: '14d',
      },
    }),
    UserModule,
  ],
  providers: [RefreshTokenService],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
