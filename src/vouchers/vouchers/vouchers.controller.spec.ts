/* Author/Creator: John Ebinyi Odey
 * Follow me on:
    * Twitter: @i_am_giannis
    * Youtube: @Stodachon
    * Linkedin: John Ebinyi Odey
    * Website: https://www.stodachon.com
*/

import { Test, TestingModule } from '@nestjs/testing';
import { VouchersController } from './vouchers.controller';

describe('VouchersController', () => {
  let controller: VouchersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VouchersController],
    }).compile();

    controller = module.get<VouchersController>(VouchersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
