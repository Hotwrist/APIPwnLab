/* Author/Creator: John Ebinyi Odey
 * Follow me on:
    * Twitter: @i_am_giannis
    * Youtube: @Stodachon
    * Linkedin: John Ebinyi Odey
    * Website: https://www.stodachon.com
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lab } from './entities/lab.entity';
import { Repository } from 'typeorm';
import { UserLabProgress } from './entities/user-lab-progress.entity';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class LabsService {
    constructor(
        @InjectRepository(Lab)
        private labRepo: Repository<Lab>,

        @InjectRepository(UserLabProgress)
        private progressRepo: Repository<UserLabProgress>,

        @InjectRepository(User)
        private userRepo: Repository<User>
    ) {}
    
  // Get all labs
  async getLabs() {
    return this.labRepo.find();
  }

  // Reset all progress for a user
  async resetProgressForUser(userId: number) {
    await this.progressRepo.update(
      { userId },
      { solvedTasks: [], totalPoints: 0, completedAt: null },
    );
    return { message: 'Your progress for all labs has been reset ✅' };
  }

  // Reset progress for a specific lab
  async resetProgressForUserLab(userId: number, labId: number) {
    await this.progressRepo.update(
      { userId, labId },
      { solvedTasks: [], totalPoints: 0, completedAt: null },
    );
    return { message: `Progress for lab ${labId} has been reset ✅` };
  }

  // Get progress for a user
  async getUserProgress(userId: number) {
    return this.progressRepo.find({
      where: { userId },
      relations: ['lab'],
    });
  }

  async markTaskSolved(userId:number, labName:string, taskName:string) {

    const lab = await this.labRepo.findOne({ where:{ name:labName }});

    if(!lab) {
        throw new Error(`Lab {$labName} not found`);
    }

    const progress: any = await this.progressRepo.findOne({ where:{userId:userId,labId:lab.id} })

    if(!progress) {
        throw new Error(`User progress not initialized`);
    }

    if(progress.solvedTasks.includes(taskName)){
        return;
    }   

    const task = lab.tasks.find(t=>t.name === taskName)

    if(!task) throw new Error(`Task ${taskName} not found in lab`)

    progress.solvedTasks.push(taskName)
    progress.totalPoints += task.points

    // check if all tasks are solved
    if (progress.solvedTasks.length === lab.tasks.length) {
            progress.completedAt = new Date();
    }

    await this.progressRepo.save(progress)
    }
}
