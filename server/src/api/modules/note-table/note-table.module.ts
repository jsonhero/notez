import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NoteTableSchema, NoteTable } from '@database/schemas';

import { NoteTableService } from './note-table.service';
import { NoteTableResolver } from './note-table.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: NoteTable.name,
        schema: NoteTableSchema,
      },
    ]),
  ],
  providers: [NoteTableService, NoteTableResolver],
  exports: [NoteTableService],
})
export class NoteTableModule {}
