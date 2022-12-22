import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { NoteTable } from './note-table.schema';

@Schema()
export class NoteMetadata {
  @Prop({ type: mongoose.Schema.Types.Mixed })
  values: any;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  schema: any;

  @Prop({
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: NoteTable.name,
    }]
  })
  implements: NoteTable[];
}

const NoteMetadataSchema = SchemaFactory.createForClass(NoteMetadata);

@Schema({
  timestamps: true,
})
export class Note {
  @Prop()
  title: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  document: any;

  @Prop({
    type: NoteMetadataSchema,
  })
  metadata: NoteMetadata;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type NoteDocument = mongoose.HydratedDocument<Note>;

export const NoteSchema = SchemaFactory.createForClass(Note);
