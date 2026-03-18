/* Author/Creator: John Ebinyi Odey
 * Follow me on:
    * Twitter: @i_am_giannis
    * Youtube: @Stodachon
    * Linkedin: John Ebinyi Odey
    * Wesite: https://www.stodachon.com
*/

import { Module } from '@nestjs/common';
import { IdorService } from './idor.service';
import { IdorController } from './idor.controller';
import { LabsModule } from 'src/labs/labs/labs.module';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [LabsModule, AuthModule, TypeOrmModule.forFeature([User])],
  providers: [IdorService],
  controllers: [IdorController],
})
export class IdorModule {}
