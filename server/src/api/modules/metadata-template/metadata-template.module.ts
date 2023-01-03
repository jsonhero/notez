import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MetadataTemplateSchema, MetadataTemplate } from '@database/schemas';

import { MetadataTemplateService } from './metadata-template.service';
import { MetadataTemplateResolver } from './metadata-template.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MetadataTemplate.name,
        schema: MetadataTemplateSchema,
      },
    ]),
  ],
  providers: [MetadataTemplateService, MetadataTemplateResolver],
  exports: [MetadataTemplateService],
})
export class MetadataTemplateModule {}
