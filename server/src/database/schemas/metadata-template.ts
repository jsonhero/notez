import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class MetadataTemplate {
  id: string;

  @Prop()
  title: string;

  @Prop()
  pathId: string;

  @Prop()
  unicodeIcon: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  schema: any;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type MetadataTemplateDocument = mongoose.HydratedDocument<MetadataTemplate>;

export const MetadataTemplateSchema = SchemaFactory.createForClass(MetadataTemplate);
