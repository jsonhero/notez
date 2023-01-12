import {
  ObjectType,
  Field,
  ID,
  InputType,
  createUnionType,
} from '@nestjs/graphql';

import {
  MetadataTemplate,
  MetadataTemplateSchemaField,
} from '../../metadata-template/graph';

import { IdeaObject } from './idea.object';

@ObjectType()
export class IdeaReference {
  @Field(() => ID)
  id: string;

  @Field(() => IdeaObject)
  toIdea: IdeaObject;

  // @Field(() => IdeaObject)
  // from: IdeaObject;

  @Field()
  type: string;

  @Field()
  fieldId: string;
}

@InputType()
export class MetadataFieldTextValueInput {
  @Field()
  text: string;
}

@InputType()
export class MetadataFieldNumberValueInput {
  @Field()
  number: number;
}

@InputType()
export class MetadataFieldDateValueInput {
  @Field()
  date: Date;
}

@InputType()
export class MetadataFieldIdeaReferenceValueInput {
  @Field(() => ID)
  ideaId: string;

  @Field()
  type: string;

  @Field({ nullable: true })
  fieldId: string;
}

@ObjectType()
class MetadataFieldTextValue {
  @Field()
  text: string;

  @Field()
  type: string;

  @Field()
  updatedAt: Date;
}

@ObjectType()
class MetadataFieldNumberValue {
  @Field()
  number: number;

  @Field()
  type: string;

  @Field()
  updatedAt: Date;
}

@ObjectType()
class MetadataFieldDateValue {
  @Field()
  date: Date;

  @Field()
  type: string;

  @Field()
  updatedAt: Date;
}

@ObjectType()
class MetadataFieldReferenceValue {
  @Field(() => IdeaReference, { nullable: true })
  reference: IdeaReference;

  @Field()
  type: string;

  @Field()
  updatedAt: Date;
}

export const MetadataFieldValueUnion = createUnionType({
  name: 'MetadataFieldValueUnion',
  resolveType: (input) => {
    if (input.type === 'text') {
      return MetadataFieldTextValue;
    } else if (input.type === 'number') {
      return MetadataFieldNumberValue;
    } else if (input.type === 'date') {
      return MetadataFieldDateValue;
    } else if (input.type === 'reference') {
      return MetadataFieldReferenceValue;
    }

    return null;
  },
  types: () =>
    [
      MetadataFieldTextValue,
      MetadataFieldNumberValue,
      MetadataFieldDateValue,
      MetadataFieldReferenceValue,
    ] as const,
});

@ObjectType()
export class MetadataGroupFieldEntry {
  @Field(() => ID)
  id: string;

  @Field(() => MetadataTemplateSchemaField)
  schema: MetadataTemplateSchemaField;

  @Field(() => MetadataFieldValueUnion, { nullable: true })
  value: typeof MetadataFieldValueUnion;
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
export class IdeaMetadata {
  @Field(() => [MetadataGroup])
  groups: MetadataGroup[];
}

@ObjectType()
export class SchemaExtraReference {
  @Field(() => [MetadataTemplate])
  metadataTemplates: MetadataTemplate[];
}

export const SchemaExtraUnion = createUnionType({
  name: 'SchemaExtraUnion',
  resolveType: (input) => {
    if (input.type === 'reference') {
      return SchemaExtraReference;
    }

    return null;
  },
  types: () => [SchemaExtraReference] as const,
});
