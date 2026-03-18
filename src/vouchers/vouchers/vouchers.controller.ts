/* Author/Creator: John Ebinyi Odey
 * Follow me on:
    * Twitter: @i_am_giannis
    * Youtube: @Stodachon
    * Linkedin: John Ebinyi Odey
    * Website: https://www.stodachon.com
*/

import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Voucher } from './entities/voucher.entity';

@Controller('internal/vouchers')
export class VouchersController {
    constructor(
        @InjectRepository(Voucher)
        private voucherRepo: Repository<Voucher>
    ){}

    @Get("history")
    async getVoucherHistory() {
        return await this.voucherRepo.find();
    }
}
