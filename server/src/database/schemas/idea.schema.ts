import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { MetadataTemplate } from './metadata-template';
import { IdeaReferenceSchema, IdeaReference } from './idea-reference.schema';

// https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design
// https://highlyscalable.wordpress.com/2012/03/01/nosql-data-modeling-techniques/
// https://www.arangodb.com/graph-database/
// https://terminusdb.com/
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
    default: [],
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
  toObject: {
    virtuals: true,
  },
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

  @Prop({
    type: [{ type: IdeaReferenceSchema }],
  })
  references: IdeaReference[];
}

export type IdeaDocument = mongoose.HydratedDocument<Idea>;

export const IdeaSchema = SchemaFactory.createForClass(Idea);

IdeaSchema.virtual('fromReferences', {
  ref: Idea.name,
  localField: '_id',
  foreignField: 'references.idea',
});
