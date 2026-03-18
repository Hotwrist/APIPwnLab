/* Author/Creator: John Ebinyi Odey
 * Follow me on:
    * Twitter: @i_am_giannis
    * Youtube: @Stodachon
    * Linkedin: John Ebinyi Odey
    * Website: https://www.stodachon.com
*/

import { IsString , IsEmail, IsOptional, Length} from "class-validator";

export class CreateUserDTO {
    @IsString()
    @Length(2,50)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}