import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { MetadataTemplate } from './metadata-template';

@Schema()
export class IdeaMetadata {
  id: string;

  @Prop()
  pathId: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  values: any;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  schema: any;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: MetadataTemplate.name,
      },
    ],
  })
  templates: MetadataTemplate[];
}

const IdeaMetadataSchema = SchemaFactory.createForClass(IdeaMetadata);

@Schema({
  timestamps: true,
})
export class Idea {
  id: string;

  @Prop()
  title: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  document: any;

  @Prop({
    type: IdeaMetadataSchema,
  })
  metadata: IdeaMetadata;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type IdeaDocument = mongoose.HydratedDocument<Idea>;

export const IdeaSchema = SchemaFactory.createForClass(Idea);
