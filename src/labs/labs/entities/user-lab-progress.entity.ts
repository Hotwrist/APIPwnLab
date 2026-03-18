/* Author/Creator: John Ebinyi Odey
 * Follow me on:
    * Twitter: @i_am_giannis
    * Youtube: @Stodachon
    * Linkedin: John Ebinyi Odey
    * Website: https://www.stodachon.com
*/

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../../users/entities/user.entity';
import { Lab } from './lab.entity';

@Entity()
export class UserLabProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Lab)
  @JoinColumn({ name: 'labId' })
  lab: Lab;

  @Column()
  labId: number;

  @Column({ type: 'json', default: [] })
  solvedTasks: string[]; // store names of tasks the user solved
  
  @Column({ default: 0 })
  totalPoints: number;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date | null;
}