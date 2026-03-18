/* Author/Creator: John Ebinyi Odey
 * Follow me on:
    * Twitter: @i_am_giannis
    * Youtube: @Stodachon
    * Linkedin: John Ebinyi Odey
    * Wesite: https://www.stodachon.com
*/

import { Test, TestingModule } from '@nestjs/testing';
import { MassAssignmentController } from './mass-assignment.controller';

describe('MassAssignmentController', () => {
  let controller: MassAssignmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MassAssignmentController],
    }).compile();

    controller = module.get<MassAssignmentController>(MassAssignmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
