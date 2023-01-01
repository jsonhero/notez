import { Module } from '@nestjs/common';

import { NoteModule } from './modules/note';
import { NodeModule } from './modules/node';
import { NoteTableModule } from './modules/note-table';

@Module({
  imports: [NodeModule, NoteModule, NoteTableModule],
  providers: [],
  exports: [],
})
export class ApiModule {}
