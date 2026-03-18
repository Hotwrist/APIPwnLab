/* Author/Creator: John Ebinyi Odey
 * Follow me on:
    * Twitter: @i_am_giannis
    * Youtube: @Stodachon
    * Linkedin: John Ebinyi Odey
    * Website: https://www.stodachon.com
*/

import { IsString, IsEmail, Length, IsOptional, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(2, 50)
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;

  @IsBoolean()
  @IsOptional()
  isPremium?: boolean;

  @IsString()
  @IsOptional()
  voucherCode?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
