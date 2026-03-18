/* Author/Creator: John Ebinyi Odey
 * Follow me on:
    * Twitter: @i_am_giannis
    * Youtube: @Stodachon
    * Linkedin: John Ebinyi Odey
    * Wesite: https://www.stodachon.com
*/

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Lab {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  endpoint: string;

  // Database should not store invalid diffulty values, hence i am making use of enum.
  @Column({ type: "enum", enum: ["easy", "medium", "hard"], default: "easy" })
  difficulty: "easy" | "medium" | "hard";

  @Column({ type: 'json', default: [] })
  tasks: { name: string; points: number; solved?: boolean; hint?: string }[];
}