import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserLabProgress } from 'src/labs/labs/entities/user-lab-progress.entity';
import { Lab } from 'src/labs/labs/entities/lab.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserLabProgress, Lab]), 
    PassportModule,
    JwtModule.register({
      secret: 'api_pwn_lab_secret',
      signOptions: { expiresIn: '4d' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}