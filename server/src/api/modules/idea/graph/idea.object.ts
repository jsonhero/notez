import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { AutoMap } from '@automapper/classes';

import { Node } from '@api/graph';

import { MetadataTemplate } from '../../metadata-template/graph';

@ObjectType()
class MetadataGroupFieldSchema {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  type: string;
}

@ObjectType()
class MetadataGroupFieldEntry {
  @Field(() => ID)
  id: string;

  @Field(() => MetadataGroupFieldSchema)
  schema: MetadataGroupFieldSchema;

  @Field({ nullable: true })
  value: string;
}

@ObjectType()
class MetadataGroup {
  @Field()
  context: string;

  @Field(() => MetadataTemplate, {
    nullable: true,
  })
  template: MetadataTemplate | null;

  @Field(() => [MetadataGroupFieldEntry])
  fields: MetadataGroupFieldEntry[];
}

@ObjectType()
class IdeaMetadata {
  @Field(() => [MetadataGroup])
  groups: MetadataGroup[];
}

@ObjectType('Idea', {
  implements: Node,
})
export class IdeaObject implements Node {
  @AutoMap()
  @Field(() => ID)
  id: string;

  @AutoMap()
  @Field({ nullable: true })
  title: string;

  @Field(() => IdeaMetadata)
  metadata: IdeaMetadata;

  @AutoMap()
  @Field(() => GraphQLJSONObject, { nullable: true })
  document: any;

  @AutoMap()
  @Field()
  createdAt: Date;

  @AutoMap()
  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateIdeaInput {
  @Field(() => [ID], {
    nullable: true,
  })
  metadataTemplateIds: string[];
}

@ObjectType()
export class CreateIdeaPayload {
  @Field(() => IdeaObject)
  idea: IdeaObject;
}

@InputType()
export class IdeaInput {
  @Field({ nullable: true })
  title: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  document: any;
}

@InputType()
export class UpdateIdeaInput {
  @Field(() => ID)
  ideaId: string;

  @Field(() => IdeaInput)
  idea: IdeaInput;
}

@ObjectType()
export class UpdateIdeaPayload {
  @Field(() => IdeaObject)
  idea: IdeaObject;
}

@InputType()
export class AddIdeaMetadataFieldInput {
  @Field(() => ID)
  ideaId: string;
}

@ObjectType()
export class AddIdeaMetadataFieldPayload {
  @Field(() => MetadataGroupFieldEntry)
  field: MetadataGroupFieldEntry;
}

@InputType()
class MetadataFieldInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  type: string;

  @Field({
    nullable: true,
  })
  value: string;
}

@InputType()
export class UpdateIdeaMetadataFieldInput {
  @Field(() => ID)
  ideaId: string;

  @Field(() => ID)
  fieldId: string;

  @Field(() => MetadataFieldInput)
  field: MetadataFieldInput;
}

@ObjectType()
export class UpdateIdeaMetadataFieldPayload {
  @Field(() => MetadataGroupFieldEntry)
  field: MetadataGroupFieldEntry;
}

@InputType()
export class DeleteIdeaInput {
  @Field(() => ID)
  ideaId: string;

  @Field({ nullable: true })
  clientMutationId: string;
}

@ObjectType()
export class DeleteIdeaPayload {
  @Field({ nullable: true })
  clientMutationId: string;
}

@InputType()
export class DeleteIdeaMetadataFieldInput {
  @Field(() => ID)
  ideaId: string;

  @Field(() => ID)
  fieldId: string;

  @Field({ nullable: true })
  clientMutationId: string;
}

@ObjectType()
export class DeleteIdeaMetadataFieldPayload {
  @Field({ nullable: true })
  clientMutationId: string;
}

@InputType()
export class IdeaSearchInput {
  @Field({
    nullable: true,
  })
  title: string;

  // @Field({
  //   nullable: true,
  // })
  // orderBy: string;

  @Field(() => [ID], {
    nullable: true,
  })
  metadataTemplateIds: string[];
}
