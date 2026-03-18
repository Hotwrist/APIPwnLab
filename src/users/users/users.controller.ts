/* Author/Creator: John Ebinyi Odey
 * Follow me on:
    * Twitter: @i_am_giannis
    * Youtube: @Stodachon
    * Linkedin: John Ebinyi Odey
    * Website: https://www.stodachon.com
*/

import { Controller, Get, Post, Patch, Body, Param, Delete, ParseIntPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Post()
    createUser(@Body() dto: CreateUserDTO) {
        return this.usersService.createUser(dto);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
    ) {
        return this.usersService.updateUser(id, data);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }
}

