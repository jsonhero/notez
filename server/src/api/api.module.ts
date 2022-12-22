import { Module } from '@nestjs/common';

import { NoteModule } from './modules';

@Module({
  imports: [NoteModule],
  providers: [],
  exports: [],
})
export class ApiModule {}
