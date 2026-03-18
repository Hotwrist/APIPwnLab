/* Author/Creator: John Ebinyi Odey
 * Follow me on:
    * Twitter: @i_am_giannis
    * Youtube: @Stodachon
    * Linkedin: John Ebinyi Odey
    * Website: https://www.stodachon.com
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

 async findAll() {
    return await this.usersRepo.find();
  }

 async createUser(user: CreateUserDTO) {
    const newUser = this.usersRepo.create(user);
    return await this.usersRepo.save(newUser);
  }
  async findOne(user_id: number) {
    const user = await this.usersRepo.findOne({ where: { id: user_id } });
    if (!user)
      throw new NotFoundException(`User with user id: ${user_id} not found`);
    else return user;
  }

  async updateUser(id: number, data: Partial<UpdateUserDto>) {
    const user = await this.usersRepo.findOne({ where: { id: id } });
    if (!user)
      throw new NotFoundException(`User with user id: ${id} not found!`);
    else return await this.usersRepo.save({ ...user, ...data });
  }

  async deleteUser(id: number) {
    const user = await this.usersRepo.findOne({ where: { id: id } });
    if (!user)
      throw new NotFoundException(`User with user id: ${id} not found!`);
    else {
      await this.usersRepo.delete(id);

      // Return a clean production message
      return {
        statusCode: 200,
        message: `User with id ${id} has been successfully deleted.`,
      };
    }
  }
}
