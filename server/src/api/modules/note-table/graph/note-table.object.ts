import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { AutoMap } from '@automapper/classes';

import { Node } from '@api/graph';

@ObjectType('NoteTableSchemaField')
export class NoteTableSchemaFieldObject {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  type: string;
}

@ObjectType('NoteTableSchema')
export class NoteTableSchemaObject {
  @Field(() => [NoteTableSchemaFieldObject])
  fields: NoteTableSchemaFieldObject[];
}

@ObjectType('NoteTable', {
  implements: Node,
})
export class NoteTableObject implements Node {
  @AutoMap()
  @Field(() => ID)
  id: string;

  @AutoMap()
  @Field({ nullable: true })
  title: string;

  @Field(() => NoteTableSchemaObject)
  schema: NoteTableSchemaObject;

  @AutoMap()
  @Field()
  createdAt: Date;

  @AutoMap()
  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateNoteTableInput {}

@ObjectType()
export class CreateNoteTablePayload {
  @Field(() => NoteTableObject)
  noteTable: NoteTableObject;
}

@InputType()
export class DeleteNoteTableInput {
  @Field(() => ID)
  noteTableId: string;

  @Field({ nullable: true })
  clientMutationId: string;
}

@ObjectType()
export class DeleteNoteTablePayload {
  @Field({ nullable: true })
  clientMutationId: string;
}
