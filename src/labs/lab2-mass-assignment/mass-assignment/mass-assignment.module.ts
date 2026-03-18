/* Author/Creator: John Ebinyi Odey
 * Follow me on:
    * Twitter: @i_am_giannis
    * Youtube: @Stodachon
    * Linkedin: John Ebinyi Odey
    * Wesite: https://www.stodachon.com
*/

import { Module } from '@nestjs/common';
import { MassAssignmentController } from './mass-assignment.controller';
import { MassAssignmentService } from './mass-assignment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Voucher } from 'src/vouchers/vouchers/entities/voucher.entity';
import { LabsModule } from 'src/labs/labs/labs.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Voucher]), LabsModule, AuthModule],
  controllers: [MassAssignmentController],
  providers: [MassAssignmentService]
})
export class MassAssignmentModule {}
