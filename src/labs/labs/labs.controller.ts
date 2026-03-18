/* Author/Creator: John Ebinyi Odey
 * Follow me on:
    * Twitter: @i_am_giannis
    * Youtube: @Stodachon
    * Linkedin: John Ebinyi Odey
    * Website: https://www.stodachon.com
*/

import { Controller, Get, Param, Post, Body, Patch, UseGuards, Req } from '@nestjs/common';
import { LabsService } from './labs.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('labs')
export class LabsController {
  constructor(private readonly labsService: LabsService) {}

  @Get()
  getLabs() {
    return this.labsService.getLabs();
  }

  @Get('progress/:userId')
  getUserProgress(@Param('userId') userId: number) {
    return this.labsService.getUserProgress(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('reset')
  async resetUserProgress(@Req() req) {
    const userId = req.user.sub; // user id from the JWT payload
    return this.labsService.resetProgressForUser(userId)
  }
}