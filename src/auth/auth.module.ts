import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStatergy } from './local.srategy';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtSratergy } from './jwt.srategy ';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
  ],
  providers: [AuthService, LocalStatergy, JwtSratergy],
  controllers: [AuthController],
  exports: [AuthService, LocalStatergy],
})
export class AuthModule {}
