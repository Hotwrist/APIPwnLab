/* Author/Creator: John Ebinyi Odey
 * Follow me on:
    * Twitter: @i_am_giannis
    * Youtube: @Stodachon
    * Linkedin: John Ebinyi Odey
    * Website: https://www.stodachon.com
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LabsService } from 'src/labs/labs/labs.service';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Voucher } from 'src/vouchers/vouchers/entities/voucher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MassAssignmentService {
  constructor(
    private labsService: LabsService,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Voucher)
    private voucherRepo: Repository<Voucher>
  ) {}
  async updateUser(userId: number, reqBody: UpdateUserDto, headers: any) {
    let voucherSolved = false;
    //const user = await this.userRepo.findOne({ where:{ id: userId }});

    // I need the hidden voucherCode that i set in the database not to be exposed, to be
    // exposed when a user solves the voucherCode lab, hence the reason i am making use of .createQueryBuilder()
    const user = await this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.voucherCode')
      .where('user.id = :id', { id: userId })
      .getOne();

    if (!user) return { message: `User with user id ${userId} not found!` };

    // Vulnerability: Accepting arbitrary fields
    Object.assign(user, reqBody);
    await this.userRepo.save(user);

    // Task detection
    if (reqBody.role) {
      user.role = reqBody.role === 'admin' ? 'user' : reqBody.role;
      await this.labsService.markTaskSolved(
        userId,
        'Mass Assignment',
        'Modify your own role',
      );
    }

    if (reqBody.role === 'admin' && headers['x-admin-override'] == 'true') {
      user.role = 'admin';
      await this.labsService.markTaskSolved(
        userId,
        'Mass Assignment',
        'Become an admin',
      );
    }

    if (reqBody.isVerified) {
      user.isVerified = reqBody.isVerified;
      await this.labsService.markTaskSolved(
        userId,
        'Mass Assignment',
        'Modify protected account fields (Become Verified)'
      );
    }

    if (reqBody.isPremium) {
      user.isPremium = false;
    }

    if (reqBody.voucherCode) {
      const voucher = await this.voucherRepo.findOne({
        where: {
          code: reqBody.voucherCode,
        },
      });

      if (!voucher)
        return {
          message: `Invalid voucher: ${reqBody.voucherCode}`,
        };
      user.voucherCode = reqBody.voucherCode;

      await this.labsService.markTaskSolved(
        userId,
        'Mass Assignment',
        'Modify protected account fields (Become Premium)',
      );

      voucherSolved = true;
      user.isPremium = true;
    }
    await this.userRepo.save(user);

    const response = {
      message: 'Profile updated!',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        voucherCode: user.voucherCode,
      },
    };

    if (voucherSolved === true) {
      response.message = '🎉 Voucher unlocked!';
      response.user.voucherCode = user.voucherCode;
    }
    return response;
  }
}
