/* Author/Creator: John Ebinyi Odey
 * Follow me on:
    * Twitter: @i_am_giannis
    * Youtube: @Stodachon
    * Linkedin: John Ebinyi Odey
    * Wesite: https://www.stodachon.com
*/

import { Controller, Get, Query, Req, UseGuards, Body, Patch, ParseIntPipe } from '@nestjs/common';
import { IdorService } from './idor.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { NoBrowserGuard } from 'src/auth/no-browser.guard';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Controller('idor')
export class IdorController {
    constructor(private idorService: IdorService){}

    @UseGuards(JwtAuthGuard)
    @UseGuards(NoBrowserGuard)
    @Get('profile')
    getProfile(@Query('id') id: number, @Req() req) {
        const userId = req.user.sub;

        return this.idorService.handleProfileRequest(userId, id);
    }

    @UseGuards(JwtAuthGuard)
    @UseGuards(NoBrowserGuard)
    @Get('users')
    getProfileOfUsers(@Req() req) {
        const userId = req.user.sub;
        return this.idorService.getUsersProfile(userId);
    }

    @UseGuards(JwtAuthGuard)
    @UseGuards(NoBrowserGuard)
    @Patch('profile')
    modifyAnotherUserProfile(@Query('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto, @Req() req) {
        const userId = req.user.sub;
        return this.idorService.modifyAnotherUserProfile(userId, id, body);
    }
}
