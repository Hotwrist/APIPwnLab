/* Author/Creator: John Ebinyi Odey
 * Follow me on:
    * Twitter: @i_am_giannis
    * Youtube: @Stodachon
    * Linkedin: John Ebinyi Odey
    * Wesite: https://www.stodachon.com
*/

import { Controller, UseGuards, Patch, Body, Req, Res } from '@nestjs/common';
import { MassAssignmentService } from './mass-assignment.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { NoBrowserGuard } from 'src/auth/no-browser.guard';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { Response } from 'express';

@Controller('mass-assignment')
export class MassAssignmentController {
    constructor (private massService: MassAssignmentService) {}

    @UseGuards(JwtAuthGuard)
    @UseGuards(NoBrowserGuard)
    @Patch('profile')
    //@Header('X-Debug-Mode', 'admin-override')
    updateProfile(@Body() reqbody: UpdateUserDto, @Req() req, @Res({ passthrough: true }) res) {
        res.setHeader('X-Debug-Mode', 'admin-override');
        const userId = req.user.sub;
        return this.massService.updateUser(userId, reqbody, req.headers);
    }
}
