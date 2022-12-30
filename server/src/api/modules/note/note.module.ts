import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NoteSchema, Note } from '@database/schemas';

import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { NoteMapperProfile } from './note.mapper';
import { NoteResolver } from './note.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Note.name,
        schema: NoteSchema,
      },
    ]),
  ],
  providers: [NoteMapperProfile, NoteService, NoteResolver],
  controllers: [NoteController],
  exports: [NoteService],
})
export class NoteModule {}
