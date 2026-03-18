/* Author/Creator: John Ebinyi Odey
 * Follow me on:
    * Twitter: @i_am_giannis
    * Youtube: @Stodachon
    * Linkedin: John Ebinyi Odey
    * Wesite: https://www.stodachon.com
*/

import { Test, TestingModule } from '@nestjs/testing';
import { MassAssignmentService } from './mass-assignment.service';

describe('MassAssignmentService', () => {
  let service: MassAssignmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MassAssignmentService],
    }).compile();

    service = module.get<MassAssignmentService>(MassAssignmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
