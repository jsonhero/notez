import { Module } from '@nestjs/common';

import { IdeaModule } from '../idea';
import { MetadataTemplateModule } from '../metadata-template';
import { NodeResolver } from './node.resolver';

@Module({
  imports: [IdeaModule, MetadataTemplateModule],
  providers: [NodeResolver],
  controllers: [],
  exports: [],
})
export class NodeModule {}
