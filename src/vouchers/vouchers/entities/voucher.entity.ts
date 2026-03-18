/* Author/Creator: John Ebinyi Odey
 * Follow me on:
    * Twitter: @i_am_giannis
    * Youtube: @Stodachon
    * Linkedin: John Ebinyi Odey
    * Website: https://www.stodachon.com
*/

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Voucher {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    usedByUserId: number;

    @Column()
    usedAt: Date;

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

}
