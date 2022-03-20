import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from 'src/user/user.module';

import { AuthService } from './auth.service';
import { LocalStatergy } from './local.statergy';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStatergy],
})
export class AuthModule {}
