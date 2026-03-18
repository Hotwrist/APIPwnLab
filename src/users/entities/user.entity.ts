/* Author/Creator: John Ebinyi Odey
 * Follow me on:
    * Twitter: @i_am_giannis
    * Youtube: @Stodachon
    * Linkedin: John Ebinyi Odey
    * Website: https://www.stodachon.com
*/

import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";
import { Exclude } from "class-transformer";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column({ default: "user" })
    role: string;

    @Column({ default: false })
    isVerified: boolean;

    @Column({ default: false })
    isPremium: boolean;

    @Column({ default: "XXXX-XXXX-XXXX", select: false })
    @Exclude()
    voucherCode: string;

    @Column()
    password: string;
}