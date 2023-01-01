import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { AutoMap } from '@automapper/classes';

import { Node } from '@api/graph';

@ObjectType('MetadataGroupFieldSchema')
class MetadataGroupFieldSchemaObject {
  @Field()
  name: string;

  @Field()
  type: string;
}

@ObjectType('MetadataGroupField')
class MetadataGroupFieldObject {
  @Field(() => ID)
  id: string;

  @Field(() => MetadataGroupFieldSchemaObject)
  schema: MetadataGroupFieldSchemaObject;

  @Field({ nullable: true })
  value: string;
}

@ObjectType()
class NoteMetadataGroupObject {
  @Field()
  context: string;

  @Field(() => [MetadataGroupFieldObject])
  fields: MetadataGroupFieldObject[];
}

@ObjectType('NoteMetadata')
class NoteMetadataObject {
  @Field(() => [NoteMetadataGroupObject])
  groups: NoteMetadataGroupObject[];
}

@ObjectType('Note', {
  implements: Node,
})
export class NoteObject implements Node {
  @AutoMap()
  @Field(() => ID)
  id: string;

  @AutoMap()
  @Field({ nullable: true })
  title: string;

  @Field(() => NoteMetadataObject)
  metadata: NoteMetadataObject;

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

@ObjectType()
export class CreateNotePayload {
  @Field(() => NoteObject)
  note: NoteObject;
}

@InputType()
export class NoteInput {
  @Field({ nullable: true })
  title: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  document: any;
}

@InputType()
export class UpdateNoteInput {
  @Field(() => ID)
  noteId: string;

  @Field(() => NoteInput)
  note: NoteInput;
}

@ObjectType()
export class UpdateNotePayload {
  @Field(() => NoteObject)
  note: NoteObject;
}

@InputType()
export class AddNoteMetadataFieldInput {
  @Field(() => ID)
  noteId: string;
}

@ObjectType()
export class AddNoteMetadataFieldPayload {
  @Field(() => MetadataGroupFieldObject)
  field: MetadataGroupFieldObject;
}

@InputType()
class MetadataFieldSchemaInput {
  @Field()
  name: string;

  @Field()
  type: string;
}

@InputType()
class MetadataFieldInput {
  @Field(() => MetadataFieldSchemaInput, {
    nullable: true,
  })
  schema: MetadataFieldSchemaInput;

  @Field({
    nullable: true,
  })
  value: string;
}

@InputType()
export class UpdateNoteMetadataFieldInput {
  @Field(() => ID)
  noteId: string;

  @Field(() => ID)
  fieldId: string;

  @Field(() => MetadataFieldInput)
  field: MetadataFieldInput;
}

@ObjectType()
export class UpdateNoteMetadataFieldPayload {
  @Field(() => MetadataGroupFieldObject)
  field: MetadataGroupFieldObject;
}

@InputType()
export class DeleteNoteInput {
  @Field(() => ID)
  noteId: string;

  @Field({ nullable: true })
  clientMutationId: string;
}

@ObjectType()
export class DeleteNotePayload {
  @Field({ nullable: true })
  clientMutationId: string;
}

@InputType()
export class DeleteNoteMetadataFieldInput {
  @Field(() => ID)
  noteId: string;

  @Field(() => ID)
  fieldId: string;

  @Field({ nullable: true })
  clientMutationId: string;
}

@ObjectType()
export class DeleteNoteMetadataFieldPayload {
  @Field({ nullable: true })
  clientMutationId: string;
}

@InputType()
export class NoteSearchInput {
  @Field()
  title: string;
}
