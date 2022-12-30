import { Module } from '@nestjs/common';

import { NoteModule } from '../note';
import { NodeResolver } from './node.resolver';

@Module({
  imports: [NoteModule],
  providers: [NodeResolver],
  controllers: [],
  exports: [],
})
export class NodeModule {}
