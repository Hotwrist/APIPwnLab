/* Author/Creator: John Ebinyi Odey
 * Follow me on:
    * Twitter: @i_am_giannis
    * Youtube: @Stodachon
    * Linkedin: John Ebinyi Odey
    * Wesite: https://www.stodachon.com
*/

import { Test, TestingModule } from '@nestjs/testing';
import { IdorService } from './idor.service';

describe('IdorService', () => {
  let service: IdorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdorService],
    }).compile();

    service = module.get<IdorService>(IdorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
