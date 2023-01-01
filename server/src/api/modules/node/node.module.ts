import { Module } from '@nestjs/common';

import { NoteModule } from '../note';
import { NoteTableModule } from '../note-table';
import { NodeResolver } from './node.resolver';

@Module({
  imports: [NoteModule, NoteTableModule],
  providers: [NodeResolver],
  controllers: [],
  exports: [],
})
export class NodeModule {}
