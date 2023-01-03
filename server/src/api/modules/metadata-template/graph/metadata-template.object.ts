import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { AutoMap } from '@automapper/classes';

import { Node } from '@api/graph';

@ObjectType()
export class MetadataTemplateSchemaField {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  type: string;
}

@ObjectType()
export class MetadataTemplateSchema {
  @Field(() => [MetadataTemplateSchemaField])
  fields: MetadataTemplateSchemaField[];
}

@ObjectType({
  implements: Node,
})
export class MetadataTemplate implements Node {
  @AutoMap()
  @Field(() => ID)
  id: string;

  @AutoMap()
  @Field({ nullable: true })
  title: string;

  @Field(() => MetadataTemplateSchema)
  schema: MetadataTemplateSchema;

  @AutoMap()
  @Field()
  createdAt: Date;

  @AutoMap()
  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateMetadataTemplateInput {}

@ObjectType()
export class CreateMetadataTemplatePayload {
  @Field(() => MetadataTemplate)
  template: MetadataTemplate;
}

@InputType()
export class DeleteMetadataTemplateInput {
  @Field(() => ID)
  metadataTemplateId: string;

  @Field({ nullable: true })
  clientMutationId: string;
}

@ObjectType()
export class DeleteMetadataTemplatePayload {
  @Field({ nullable: true })
  clientMutationId: string;
}

@InputType()
export class MetadataTemplateInput {
  @Field()
  title: string;
}

@InputType()
export class UpdateMetadataTemplateInput {
  @Field(() => ID)
  metadataTemplateId: string;

  @Field(() => MetadataTemplateInput)
  template: MetadataTemplateInput;
}

@ObjectType()
export class UpdateMetadataTemplatePayload {
  @Field(() => MetadataTemplate)
  template: MetadataTemplate;
}

@InputType()
export class MetadataTemplateFieldInput {
  @Field()
  name: string;

  @Field()
  type: string;
}

@InputType()
export class UpdateMetadataTemplateFieldInput {
  @Field(() => ID)
  metadataTemplateId: string;

  @Field(() => ID)
  fieldId: string;

  @Field(() => MetadataTemplateFieldInput)
  field: MetadataTemplateFieldInput;
}

@ObjectType()
export class UpdateMetadataTemplateFieldPayload {
  @Field(() => MetadataTemplateSchemaField)
  field: MetadataTemplateSchemaField;
}

@InputType()
export class AddMetadataTemplateFieldInput {
  @Field(() => ID)
  metadataTemplateId: string;
}

@ObjectType()
export class AddMetadataTemplateFieldPayload {
  @Field(() => MetadataTemplateSchemaField)
  field: MetadataTemplateSchemaField;
}
