import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Idea } from './idea.schema';

@Schema()
export class IdeaReference {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Idea',
  })
  idea: Idea;

  @Prop()
  fieldId: string; // only available for metadata

  @Prop()
  type: string; // metadata or note
}

export const IdeaReferenceSchema = SchemaFactory.createForClass(IdeaReference);

