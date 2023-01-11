import {
  ObjectType,
  Field,
  ID,
  InputType,
  createUnionType,
} from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { AutoMap } from '@automapper/classes';

import { Node } from '@api/graph';

import {
  IdeaMetadata,
  MetadataGroupFieldEntry,
  IdeaReference,
  MetadataFieldDateValueInput,
  MetadataFieldIdeaReferenceValueInput,
  MetadataFieldNumberValueInput,
  MetadataFieldTextValueInput,
} from './idea-metadata.object';

// Union values below
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

  @Field(() => [IdeaReference])
  toReferences: IdeaReference[];
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
export class IdeaReferenceInput {
  @Field(() => ID)
  ideaId: string;

  @Field()
  type: string;

  @Field({ nullable: true })
  fieldId: string;
}

@InputType()
export class IdeaInput {
  @Field({ nullable: true })
  title: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  document: any;

  @Field(() => [IdeaReferenceInput], { nullable: true })
  refAdds: IdeaReferenceInput[];

  @Field(() => [ID], { nullable: true })
  refIdsToDelete: string[];
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
class MetadataFieldValueInput {
  @Field(() => MetadataFieldTextValueInput, { nullable: true })
  textInput: MetadataFieldTextValueInput;

  @Field(() => MetadataFieldNumberValueInput, { nullable: true })
  numberInput: MetadataFieldNumberValueInput;

  @Field(() => MetadataFieldDateValueInput, { nullable: true })
  dateInput: MetadataFieldDateValueInput;

  @Field(() => MetadataFieldIdeaReferenceValueInput, { nullable: true })
  referenceInput: MetadataFieldIdeaReferenceValueInput;
}

@InputType()
class MetadataFieldSchemaInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  type: string;
}

@InputType()
class MetadataFieldInput {
  @Field(() => MetadataFieldSchemaInput, {
    nullable: true,
  })
  schema: MetadataFieldSchemaInput;

  @Field(() => MetadataFieldValueInput, {
    nullable: true,
  })
  value: MetadataFieldValueInput;
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

@InputType()
export class DeleteIdeaMetadataTemplateInput {
  @Field({ nullable: true })
  clientMutationId: string;

  @Field(() => ID)
  metadataTemplateId: string;

  @Field(() => ID)
  ideaId: string;
}

@ObjectType()
export class DeleteIdeaMetadataTemplatePayload {
  @Field({ nullable: true })
  clientMutationId: string;

  @Field(() => IdeaObject)
  idea: IdeaObject;
}

@InputType()
export class AddIdeaMetadataTemplateInput {
  @Field({ nullable: true })
  clientMutationId: string;

  @Field(() => ID)
  metadataTemplateId: string;

  @Field(() => ID)
  ideaId: string;
}

@ObjectType()
export class AddIdeaMetadataTemplatePayload {
  @Field({ nullable: true })
  clientMutationId: string;

  @Field(() => IdeaObject)
  idea: IdeaObject;
}
