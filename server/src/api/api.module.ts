import { Module } from '@nestjs/common';

import { NoteModule } from './modules/note';
import { NodeModule } from './modules/node';

@Module({
  imports: [NodeModule, NoteModule],
  providers: [],
  exports: [],
})
export class ApiModule {}
