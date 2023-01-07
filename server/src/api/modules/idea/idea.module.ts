import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { IdeaSchema, Idea } from '@database/schemas';

import { IdeaService } from './idea.service';
// import { NoteMapperProfile } from './note.mapper';
import { IdeaResolver } from './idea.resolver';
import { MetadataTemplateModule } from '../metadata-template';

@Module({
  imports: [
    MetadataTemplateModule,
    MongooseModule.forFeature([
      {
        name: Idea.name,
        schema: IdeaSchema,
      },
    ]),
  ],
  providers: [IdeaService, IdeaResolver],
  exports: [IdeaService],
})
export class IdeaModule {}
