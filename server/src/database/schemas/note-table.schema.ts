import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class NoteTable {
  @Prop()
  title: string;

  @Prop()
  implementationId: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  schema: any;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type NoteTableDocument = mongoose.HydratedDocument<NoteTable>;

export const NoteTableSchema = SchemaFactory.createForClass(NoteTable);
