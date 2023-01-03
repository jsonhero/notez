import { Module } from '@nestjs/common';

import { IdeaModule } from './modules/idea';
import { NodeModule } from './modules/node';
import { MetadataTemplateModule } from './modules/metadata-template';

@Module({
  imports: [NodeModule, IdeaModule, MetadataTemplateModule],
  providers: [],
  exports: [],
})
export class ApiModule {}
