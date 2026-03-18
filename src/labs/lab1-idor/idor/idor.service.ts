/* Author/Creator: John Ebinyi Odey
 * Follow me on:
    * Twitter: @i_am_giannis
    * Youtube: @Stodachon
    * Linkedin: John Ebinyi Odey
    * Wesite: https://www.stodachon.com
*/

import { Injectable } from '@nestjs/common';
import { LabsService } from '../../labs/labs.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../users/entities/user.entity'
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class IdorService {
    constructor(private labsService: LabsService, 
        @InjectRepository(User)
        private usersRepo: Repository<User>) {}
    
    async handleProfileRequest(userId: number, targetId: number) {
        const targetUser = await this.usersRepo.findOne( { where: {id: targetId } });

        if(!targetUser) return { message: `User with user_id: ${targetId} not found!` };

        // Vulnerability here: User can access ANY profile
        if(userId !== targetId) {
            await this.labsService.markTaskSolved(userId, "IDOR", "Access another user record");
        }

        return targetUser;
    }

    async getUsersProfile(userId: number) {
        const users = await this.usersRepo.find();
       
        // Vulnerability: returning all users
        if (users.length > 1) {
           await this.labsService.markTaskSolved(userId, "IDOR", "Enumerate users profile");
        }

        return users;
    }

    async modifyAnotherUserProfile(userId: number, targetId: number, req_body: UpdateUserDto) {
        const user = await this.usersRepo.findOne({ where: { id: targetId }});

        if(!user) return { message: `User with user_id: ${targetId} not found` };
       
        // Vulnerability: no authorization check, user can modify another user's profile
        if(userId != targetId) await this.labsService.markTaskSolved(userId, "IDOR", "Modify another user profile");
       
        Object.assign(user, req_body);

        await this.usersRepo.save(user);

        return { message: "Profile updated", user };
    }
}
