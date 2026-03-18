/* Author/Creator: John Ebinyi Odey
 * Follow me on:
    * Twitter: @i_am_giannis
    * Youtube: @Stodachon
    * Linkedin: John Ebinyi Odey
    * Wesite: https://www.stodachon.com
*/

import { Test, TestingModule } from '@nestjs/testing';
import { IdorController } from './idor.controller';

describe('IdorController', () => {
  let controller: IdorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdorController],
    }).compile();

    controller = module.get<IdorController>(IdorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
