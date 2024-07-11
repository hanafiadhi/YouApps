import { Module } from '@nestjs/common';
import { SeedService } from './volunter.seed';

@Module({
  imports: [],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
