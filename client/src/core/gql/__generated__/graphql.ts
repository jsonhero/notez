import { Resolver as GraphCacheResolver, UpdateResolver as GraphCacheUpdateResolver, OptimisticMutationResolver as GraphCacheOptimisticMutationResolver, StorageAdapter as GraphCacheStorageAdapter } from '@urql/exchange-graphcache';
import { IntrospectionData } from '@urql/exchange-graphcache/dist/types/ast';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSONObject: any;
};

export type AddIdeaMetadataFieldInput = {
  ideaId: Scalars['ID'];
};

export type AddIdeaMetadataFieldPayload = {
  __typename?: 'AddIdeaMetadataFieldPayload';
  field: MetadataGroupFieldEntry;
};

export type AddIdeaMetadataTemplateInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  ideaId: Scalars['ID'];
  metadataTemplateId: Scalars['ID'];
};

export type AddIdeaMetadataTemplatePayload = {
  __typename?: 'AddIdeaMetadataTemplatePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  idea: Idea;
};

export type AddMetadataTemplateFieldInput = {
  metadataTemplateId: Scalars['ID'];
};

export type AddMetadataTemplateFieldPayload = {
  __typename?: 'AddMetadataTemplateFieldPayload';
  field: MetadataTemplateSchemaField;
};

export type CreateIdeaInput = {
  metadataTemplateIds?: InputMaybe<Array<Scalars['ID']>>;
};

export type CreateIdeaPayload = {
  __typename?: 'CreateIdeaPayload';
  idea: Idea;
};

export type CreateMetadataTemplatePayload = {
  __typename?: 'CreateMetadataTemplatePayload';
  template: MetadataTemplate;
};

export type DeleteIdeaInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  ideaId: Scalars['ID'];
};

export type DeleteIdeaMetadataFieldInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  fieldId: Scalars['ID'];
  ideaId: Scalars['ID'];
};

export type DeleteIdeaMetadataFieldPayload = {
  __typename?: 'DeleteIdeaMetadataFieldPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteIdeaMetadataTemplateInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  ideaId: Scalars['ID'];
  metadataTemplateId: Scalars['ID'];
};

export type DeleteIdeaMetadataTemplatePayload = {
  __typename?: 'DeleteIdeaMetadataTemplatePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  idea: Idea;
};

export type DeleteIdeaPayload = {
  __typename?: 'DeleteIdeaPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteMetadataTemplateFieldInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  fieldId: Scalars['ID'];
  metadataTemplateId: Scalars['ID'];
};

export type DeleteMetadataTemplateFieldPayload = {
  __typename?: 'DeleteMetadataTemplateFieldPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteMetadataTemplateInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  metadataTemplateId: Scalars['ID'];
};

export type DeleteMetadataTemplatePayload = {
  __typename?: 'DeleteMetadataTemplatePayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type Idea = Node & {
  __typename?: 'Idea';
  createdAt: Scalars['DateTime'];
  document?: Maybe<Scalars['JSONObject']>;
  id: Scalars['ID'];
  metadata: IdeaMetadata;
  title?: Maybe<Scalars['String']>;
  toReferences: Array<IdeaReference>;
  updatedAt: Scalars['DateTime'];
};

export type IdeaInput = {
  document?: InputMaybe<Scalars['JSONObject']>;
  refAdds?: InputMaybe<Array<IdeaReferenceInput>>;
  refIdsToDelete?: InputMaybe<Array<Scalars['ID']>>;
  title?: InputMaybe<Scalars['String']>;
};

export type IdeaMetadata = {
  __typename?: 'IdeaMetadata';
  groups: Array<MetadataGroup>;
};

export type IdeaReference = {
  __typename?: 'IdeaReference';
  fieldId: Scalars['String'];
  id: Scalars['ID'];
  toIdea: Idea;
  type: Scalars['String'];
};

export type IdeaReferenceInput = {
  fieldId?: InputMaybe<Scalars['String']>;
  ideaId: Scalars['ID'];
  type: Scalars['String'];
};

export type IdeaSearchInput = {
  metadataTemplateIds?: InputMaybe<Array<Scalars['ID']>>;
  title?: InputMaybe<Scalars['String']>;
};

export type MetadataFieldDateValue = {
  __typename?: 'MetadataFieldDateValue';
  date: Scalars['DateTime'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type MetadataFieldDateValueInput = {
  date: Scalars['DateTime'];
};

export type MetadataFieldIdeaReferenceValueInput = {
  fieldId?: InputMaybe<Scalars['String']>;
  ideaId: Scalars['ID'];
  type: Scalars['String'];
};

export type MetadataFieldInput = {
  schema?: InputMaybe<MetadataFieldSchemaInput>;
  value?: InputMaybe<MetadataFieldValueInput>;
};

export type MetadataFieldNumberValue = {
  __typename?: 'MetadataFieldNumberValue';
  number: Scalars['Float'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type MetadataFieldNumberValueInput = {
  number: Scalars['Float'];
};

export type MetadataFieldReferenceValue = {
  __typename?: 'MetadataFieldReferenceValue';
  reference: IdeaReference;
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type MetadataFieldSchemaInput = {
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type MetadataFieldTextValue = {
  __typename?: 'MetadataFieldTextValue';
  text: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type MetadataFieldTextValueInput = {
  text: Scalars['String'];
};

export type MetadataFieldValueInput = {
  dateInput?: InputMaybe<MetadataFieldDateValueInput>;
  numberInput?: InputMaybe<MetadataFieldNumberValueInput>;
  referenceInput?: InputMaybe<MetadataFieldIdeaReferenceValueInput>;
  textInput?: InputMaybe<MetadataFieldTextValueInput>;
};

export type MetadataFieldValueUnion = MetadataFieldDateValue | MetadataFieldNumberValue | MetadataFieldReferenceValue | MetadataFieldTextValue;

export type MetadataGroup = {
  __typename?: 'MetadataGroup';
  context: Scalars['String'];
  fields: Array<MetadataGroupFieldEntry>;
  template?: Maybe<MetadataTemplate>;
};

export type MetadataGroupFieldEntry = {
  __typename?: 'MetadataGroupFieldEntry';
  id: Scalars['ID'];
  schema: MetadataTemplateSchemaField;
  value?: Maybe<MetadataFieldValueUnion>;
};

export type MetadataTemplate = Node & {
  __typename?: 'MetadataTemplate';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  schema: MetadataTemplateSchema;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type MetadataTemplateFieldInput = {
  name: Scalars['String'];
  type: Scalars['String'];
};

export type MetadataTemplateInput = {
  title: Scalars['String'];
};

export type MetadataTemplateSchema = {
  __typename?: 'MetadataTemplateSchema';
  fields: Array<MetadataTemplateSchemaField>;
};

export type MetadataTemplateSchemaField = {
  __typename?: 'MetadataTemplateSchemaField';
  id: Scalars['ID'];
  name: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type MetadataTemplateSearchInput = {
  title?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addIdeaMetadataField: AddIdeaMetadataFieldPayload;
  addIdeaMetadataTemplate: AddIdeaMetadataTemplatePayload;
  addMetadataTemplateField: AddMetadataTemplateFieldPayload;
  createIdea: CreateIdeaPayload;
  createMetadataTemplate: CreateMetadataTemplatePayload;
  deleteIdea: DeleteIdeaPayload;
  deleteIdeaMetadataField: DeleteIdeaMetadataFieldPayload;
  deleteIdeaMetadataTemplate: DeleteIdeaMetadataTemplatePayload;
  deleteMetadataTemplate: DeleteMetadataTemplatePayload;
  deleteMetadataTemplateField: DeleteMetadataTemplateFieldPayload;
  updateIdea: UpdateIdeaPayload;
  updateIdeaMetadataField: UpdateIdeaMetadataFieldPayload;
  updateMetadataTemplate: UpdateMetadataTemplatePayload;
  updateMetadataTemplateField: UpdateMetadataTemplateFieldPayload;
};


export type MutationAddIdeaMetadataFieldArgs = {
  input: AddIdeaMetadataFieldInput;
};


export type MutationAddIdeaMetadataTemplateArgs = {
  input: AddIdeaMetadataTemplateInput;
};


export type MutationAddMetadataTemplateFieldArgs = {
  input: AddMetadataTemplateFieldInput;
};


export type MutationCreateIdeaArgs = {
  input?: InputMaybe<CreateIdeaInput>;
};


export type MutationDeleteIdeaArgs = {
  input: DeleteIdeaInput;
};


export type MutationDeleteIdeaMetadataFieldArgs = {
  input: DeleteIdeaMetadataFieldInput;
};


export type MutationDeleteIdeaMetadataTemplateArgs = {
  input: DeleteIdeaMetadataTemplateInput;
};


export type MutationDeleteMetadataTemplateArgs = {
  input: DeleteMetadataTemplateInput;
};


export type MutationDeleteMetadataTemplateFieldArgs = {
  input: DeleteMetadataTemplateFieldInput;
};


export type MutationUpdateIdeaArgs = {
  input: UpdateIdeaInput;
};


export type MutationUpdateIdeaMetadataFieldArgs = {
  input: UpdateIdeaMetadataFieldInput;
};


export type MutationUpdateMetadataTemplateArgs = {
  input: UpdateMetadataTemplateInput;
};


export type MutationUpdateMetadataTemplateFieldArgs = {
  input: UpdateMetadataTemplateFieldInput;
};

export type Node = {
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  ideas: Array<Idea>;
  metadataTemplates: Array<MetadataTemplate>;
  node?: Maybe<Node>;
  nodes: Array<Node>;
};


export type QueryIdeasArgs = {
  input?: InputMaybe<IdeaSearchInput>;
};


export type QueryMetadataTemplatesArgs = {
  input?: InputMaybe<MetadataTemplateSearchInput>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']>;
};

export type UpdateIdeaInput = {
  idea: IdeaInput;
  ideaId: Scalars['ID'];
};

export type UpdateIdeaMetadataFieldInput = {
  field: MetadataFieldInput;
  fieldId: Scalars['ID'];
  ideaId: Scalars['ID'];
};

export type UpdateIdeaMetadataFieldPayload = {
  __typename?: 'UpdateIdeaMetadataFieldPayload';
  field: MetadataGroupFieldEntry;
};

export type UpdateIdeaPayload = {
  __typename?: 'UpdateIdeaPayload';
  idea: Idea;
};

export type UpdateMetadataTemplateFieldInput = {
  field: MetadataTemplateFieldInput;
  fieldId: Scalars['ID'];
  metadataTemplateId: Scalars['ID'];
};

export type UpdateMetadataTemplateFieldPayload = {
  __typename?: 'UpdateMetadataTemplateFieldPayload';
  field: MetadataTemplateSchemaField;
};

export type UpdateMetadataTemplateInput = {
  metadataTemplateId: Scalars['ID'];
  template: MetadataTemplateInput;
};

export type UpdateMetadataTemplatePayload = {
  __typename?: 'UpdateMetadataTemplatePayload';
  template: MetadataTemplate;
};

export type WithTypename<T extends { __typename?: any }> = Partial<T> & { __typename: NonNullable<T['__typename']> };

export type GraphCacheKeysConfig = {
  AddIdeaMetadataFieldPayload?: (data: WithTypename<AddIdeaMetadataFieldPayload>) => null | string,
  AddIdeaMetadataTemplatePayload?: (data: WithTypename<AddIdeaMetadataTemplatePayload>) => null | string,
  AddMetadataTemplateFieldPayload?: (data: WithTypename<AddMetadataTemplateFieldPayload>) => null | string,
  CreateIdeaPayload?: (data: WithTypename<CreateIdeaPayload>) => null | string,
  CreateMetadataTemplatePayload?: (data: WithTypename<CreateMetadataTemplatePayload>) => null | string,
  DeleteIdeaMetadataFieldPayload?: (data: WithTypename<DeleteIdeaMetadataFieldPayload>) => null | string,
  DeleteIdeaMetadataTemplatePayload?: (data: WithTypename<DeleteIdeaMetadataTemplatePayload>) => null | string,
  DeleteIdeaPayload?: (data: WithTypename<DeleteIdeaPayload>) => null | string,
  DeleteMetadataTemplateFieldPayload?: (data: WithTypename<DeleteMetadataTemplateFieldPayload>) => null | string,
  DeleteMetadataTemplatePayload?: (data: WithTypename<DeleteMetadataTemplatePayload>) => null | string,
  Idea?: (data: WithTypename<Idea>) => null | string,
  IdeaMetadata?: (data: WithTypename<IdeaMetadata>) => null | string,
  IdeaReference?: (data: WithTypename<IdeaReference>) => null | string,
  MetadataFieldDateValue?: (data: WithTypename<MetadataFieldDateValue>) => null | string,
  MetadataFieldNumberValue?: (data: WithTypename<MetadataFieldNumberValue>) => null | string,
  MetadataFieldReferenceValue?: (data: WithTypename<MetadataFieldReferenceValue>) => null | string,
  MetadataFieldTextValue?: (data: WithTypename<MetadataFieldTextValue>) => null | string,
  MetadataGroup?: (data: WithTypename<MetadataGroup>) => null | string,
  MetadataGroupFieldEntry?: (data: WithTypename<MetadataGroupFieldEntry>) => null | string,
  MetadataTemplate?: (data: WithTypename<MetadataTemplate>) => null | string,
  MetadataTemplateSchema?: (data: WithTypename<MetadataTemplateSchema>) => null | string,
  MetadataTemplateSchemaField?: (data: WithTypename<MetadataTemplateSchemaField>) => null | string,
  UpdateIdeaMetadataFieldPayload?: (data: WithTypename<UpdateIdeaMetadataFieldPayload>) => null | string,
  UpdateIdeaPayload?: (data: WithTypename<UpdateIdeaPayload>) => null | string,
  UpdateMetadataTemplateFieldPayload?: (data: WithTypename<UpdateMetadataTemplateFieldPayload>) => null | string,
  UpdateMetadataTemplatePayload?: (data: WithTypename<UpdateMetadataTemplatePayload>) => null | string
}

export type GraphCacheResolvers = {
  Query?: {
    ideas?: GraphCacheResolver<WithTypename<Query>, QueryIdeasArgs, Array<WithTypename<Idea> | string>>,
    metadataTemplates?: GraphCacheResolver<WithTypename<Query>, QueryMetadataTemplatesArgs, Array<WithTypename<MetadataTemplate> | string>>,
    node?: GraphCacheResolver<WithTypename<Query>, QueryNodeArgs, WithTypename<Idea> | WithTypename<MetadataTemplate> | string>,
    nodes?: GraphCacheResolver<WithTypename<Query>, QueryNodesArgs, Array<WithTypename<Idea> | WithTypename<MetadataTemplate> | string>>
  },
  AddIdeaMetadataFieldPayload?: {
    field?: GraphCacheResolver<WithTypename<AddIdeaMetadataFieldPayload>, Record<string, never>, WithTypename<MetadataGroupFieldEntry> | string>
  },
  AddIdeaMetadataTemplatePayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<AddIdeaMetadataTemplatePayload>, Record<string, never>, Scalars['String'] | string>,
    idea?: GraphCacheResolver<WithTypename<AddIdeaMetadataTemplatePayload>, Record<string, never>, WithTypename<Idea> | string>
  },
  AddMetadataTemplateFieldPayload?: {
    field?: GraphCacheResolver<WithTypename<AddMetadataTemplateFieldPayload>, Record<string, never>, WithTypename<MetadataTemplateSchemaField> | string>
  },
  CreateIdeaPayload?: {
    idea?: GraphCacheResolver<WithTypename<CreateIdeaPayload>, Record<string, never>, WithTypename<Idea> | string>
  },
  CreateMetadataTemplatePayload?: {
    template?: GraphCacheResolver<WithTypename<CreateMetadataTemplatePayload>, Record<string, never>, WithTypename<MetadataTemplate> | string>
  },
  DeleteIdeaMetadataFieldPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<DeleteIdeaMetadataFieldPayload>, Record<string, never>, Scalars['String'] | string>
  },
  DeleteIdeaMetadataTemplatePayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<DeleteIdeaMetadataTemplatePayload>, Record<string, never>, Scalars['String'] | string>,
    idea?: GraphCacheResolver<WithTypename<DeleteIdeaMetadataTemplatePayload>, Record<string, never>, WithTypename<Idea> | string>
  },
  DeleteIdeaPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<DeleteIdeaPayload>, Record<string, never>, Scalars['String'] | string>
  },
  DeleteMetadataTemplateFieldPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<DeleteMetadataTemplateFieldPayload>, Record<string, never>, Scalars['String'] | string>
  },
  DeleteMetadataTemplatePayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<DeleteMetadataTemplatePayload>, Record<string, never>, Scalars['String'] | string>
  },
  Idea?: {
    createdAt?: GraphCacheResolver<WithTypename<Idea>, Record<string, never>, Scalars['DateTime'] | string>,
    document?: GraphCacheResolver<WithTypename<Idea>, Record<string, never>, Scalars['JSONObject'] | string>,
    id?: GraphCacheResolver<WithTypename<Idea>, Record<string, never>, Scalars['ID'] | string>,
    metadata?: GraphCacheResolver<WithTypename<Idea>, Record<string, never>, WithTypename<IdeaMetadata> | string>,
    title?: GraphCacheResolver<WithTypename<Idea>, Record<string, never>, Scalars['String'] | string>,
    toReferences?: GraphCacheResolver<WithTypename<Idea>, Record<string, never>, Array<WithTypename<IdeaReference> | string>>,
    updatedAt?: GraphCacheResolver<WithTypename<Idea>, Record<string, never>, Scalars['DateTime'] | string>
  },
  IdeaMetadata?: {
    groups?: GraphCacheResolver<WithTypename<IdeaMetadata>, Record<string, never>, Array<WithTypename<MetadataGroup> | string>>
  },
  IdeaReference?: {
    fieldId?: GraphCacheResolver<WithTypename<IdeaReference>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<IdeaReference>, Record<string, never>, Scalars['ID'] | string>,
    toIdea?: GraphCacheResolver<WithTypename<IdeaReference>, Record<string, never>, WithTypename<Idea> | string>,
    type?: GraphCacheResolver<WithTypename<IdeaReference>, Record<string, never>, Scalars['String'] | string>
  },
  MetadataFieldDateValue?: {
    date?: GraphCacheResolver<WithTypename<MetadataFieldDateValue>, Record<string, never>, Scalars['DateTime'] | string>,
    type?: GraphCacheResolver<WithTypename<MetadataFieldDateValue>, Record<string, never>, Scalars['String'] | string>,
    updatedAt?: GraphCacheResolver<WithTypename<MetadataFieldDateValue>, Record<string, never>, Scalars['DateTime'] | string>
  },
  MetadataFieldNumberValue?: {
    number?: GraphCacheResolver<WithTypename<MetadataFieldNumberValue>, Record<string, never>, Scalars['Float'] | string>,
    type?: GraphCacheResolver<WithTypename<MetadataFieldNumberValue>, Record<string, never>, Scalars['String'] | string>,
    updatedAt?: GraphCacheResolver<WithTypename<MetadataFieldNumberValue>, Record<string, never>, Scalars['DateTime'] | string>
  },
  MetadataFieldReferenceValue?: {
    reference?: GraphCacheResolver<WithTypename<MetadataFieldReferenceValue>, Record<string, never>, WithTypename<IdeaReference> | string>,
    type?: GraphCacheResolver<WithTypename<MetadataFieldReferenceValue>, Record<string, never>, Scalars['String'] | string>,
    updatedAt?: GraphCacheResolver<WithTypename<MetadataFieldReferenceValue>, Record<string, never>, Scalars['DateTime'] | string>
  },
  MetadataFieldTextValue?: {
    text?: GraphCacheResolver<WithTypename<MetadataFieldTextValue>, Record<string, never>, Scalars['String'] | string>,
    type?: GraphCacheResolver<WithTypename<MetadataFieldTextValue>, Record<string, never>, Scalars['String'] | string>,
    updatedAt?: GraphCacheResolver<WithTypename<MetadataFieldTextValue>, Record<string, never>, Scalars['DateTime'] | string>
  },
  MetadataGroup?: {
    context?: GraphCacheResolver<WithTypename<MetadataGroup>, Record<string, never>, Scalars['String'] | string>,
    fields?: GraphCacheResolver<WithTypename<MetadataGroup>, Record<string, never>, Array<WithTypename<MetadataGroupFieldEntry> | string>>,
    template?: GraphCacheResolver<WithTypename<MetadataGroup>, Record<string, never>, WithTypename<MetadataTemplate> | string>
  },
  MetadataGroupFieldEntry?: {
    id?: GraphCacheResolver<WithTypename<MetadataGroupFieldEntry>, Record<string, never>, Scalars['ID'] | string>,
    schema?: GraphCacheResolver<WithTypename<MetadataGroupFieldEntry>, Record<string, never>, WithTypename<MetadataTemplateSchemaField> | string>,
    value?: GraphCacheResolver<WithTypename<MetadataGroupFieldEntry>, Record<string, never>, WithTypename<MetadataFieldValueUnion> | string>
  },
  MetadataTemplate?: {
    createdAt?: GraphCacheResolver<WithTypename<MetadataTemplate>, Record<string, never>, Scalars['DateTime'] | string>,
    id?: GraphCacheResolver<WithTypename<MetadataTemplate>, Record<string, never>, Scalars['ID'] | string>,
    schema?: GraphCacheResolver<WithTypename<MetadataTemplate>, Record<string, never>, WithTypename<MetadataTemplateSchema> | string>,
    title?: GraphCacheResolver<WithTypename<MetadataTemplate>, Record<string, never>, Scalars['String'] | string>,
    updatedAt?: GraphCacheResolver<WithTypename<MetadataTemplate>, Record<string, never>, Scalars['DateTime'] | string>
  },
  MetadataTemplateSchema?: {
    fields?: GraphCacheResolver<WithTypename<MetadataTemplateSchema>, Record<string, never>, Array<WithTypename<MetadataTemplateSchemaField> | string>>
  },
  MetadataTemplateSchemaField?: {
    id?: GraphCacheResolver<WithTypename<MetadataTemplateSchemaField>, Record<string, never>, Scalars['ID'] | string>,
    name?: GraphCacheResolver<WithTypename<MetadataTemplateSchemaField>, Record<string, never>, Scalars['String'] | string>,
    type?: GraphCacheResolver<WithTypename<MetadataTemplateSchemaField>, Record<string, never>, Scalars['String'] | string>,
    updatedAt?: GraphCacheResolver<WithTypename<MetadataTemplateSchemaField>, Record<string, never>, Scalars['DateTime'] | string>
  },
  UpdateIdeaMetadataFieldPayload?: {
    field?: GraphCacheResolver<WithTypename<UpdateIdeaMetadataFieldPayload>, Record<string, never>, WithTypename<MetadataGroupFieldEntry> | string>
  },
  UpdateIdeaPayload?: {
    idea?: GraphCacheResolver<WithTypename<UpdateIdeaPayload>, Record<string, never>, WithTypename<Idea> | string>
  },
  UpdateMetadataTemplateFieldPayload?: {
    field?: GraphCacheResolver<WithTypename<UpdateMetadataTemplateFieldPayload>, Record<string, never>, WithTypename<MetadataTemplateSchemaField> | string>
  },
  UpdateMetadataTemplatePayload?: {
    template?: GraphCacheResolver<WithTypename<UpdateMetadataTemplatePayload>, Record<string, never>, WithTypename<MetadataTemplate> | string>
  }
};

export type GraphCacheOptimisticUpdaters = {
  addIdeaMetadataField?: GraphCacheOptimisticMutationResolver<MutationAddIdeaMetadataFieldArgs, WithTypename<AddIdeaMetadataFieldPayload>>,
  addIdeaMetadataTemplate?: GraphCacheOptimisticMutationResolver<MutationAddIdeaMetadataTemplateArgs, WithTypename<AddIdeaMetadataTemplatePayload>>,
  addMetadataTemplateField?: GraphCacheOptimisticMutationResolver<MutationAddMetadataTemplateFieldArgs, WithTypename<AddMetadataTemplateFieldPayload>>,
  createIdea?: GraphCacheOptimisticMutationResolver<MutationCreateIdeaArgs, WithTypename<CreateIdeaPayload>>,
  createMetadataTemplate?: GraphCacheOptimisticMutationResolver<Record<string, never>, WithTypename<CreateMetadataTemplatePayload>>,
  deleteIdea?: GraphCacheOptimisticMutationResolver<MutationDeleteIdeaArgs, WithTypename<DeleteIdeaPayload>>,
  deleteIdeaMetadataField?: GraphCacheOptimisticMutationResolver<MutationDeleteIdeaMetadataFieldArgs, WithTypename<DeleteIdeaMetadataFieldPayload>>,
  deleteIdeaMetadataTemplate?: GraphCacheOptimisticMutationResolver<MutationDeleteIdeaMetadataTemplateArgs, WithTypename<DeleteIdeaMetadataTemplatePayload>>,
  deleteMetadataTemplate?: GraphCacheOptimisticMutationResolver<MutationDeleteMetadataTemplateArgs, WithTypename<DeleteMetadataTemplatePayload>>,
  deleteMetadataTemplateField?: GraphCacheOptimisticMutationResolver<MutationDeleteMetadataTemplateFieldArgs, WithTypename<DeleteMetadataTemplateFieldPayload>>,
  updateIdea?: GraphCacheOptimisticMutationResolver<MutationUpdateIdeaArgs, WithTypename<UpdateIdeaPayload>>,
  updateIdeaMetadataField?: GraphCacheOptimisticMutationResolver<MutationUpdateIdeaMetadataFieldArgs, WithTypename<UpdateIdeaMetadataFieldPayload>>,
  updateMetadataTemplate?: GraphCacheOptimisticMutationResolver<MutationUpdateMetadataTemplateArgs, WithTypename<UpdateMetadataTemplatePayload>>,
  updateMetadataTemplateField?: GraphCacheOptimisticMutationResolver<MutationUpdateMetadataTemplateFieldArgs, WithTypename<UpdateMetadataTemplateFieldPayload>>
};

export type GraphCacheUpdaters = {
  Mutation?: {
    addIdeaMetadataField?: GraphCacheUpdateResolver<{ addIdeaMetadataField: WithTypename<AddIdeaMetadataFieldPayload> }, MutationAddIdeaMetadataFieldArgs>,
    addIdeaMetadataTemplate?: GraphCacheUpdateResolver<{ addIdeaMetadataTemplate: WithTypename<AddIdeaMetadataTemplatePayload> }, MutationAddIdeaMetadataTemplateArgs>,
    addMetadataTemplateField?: GraphCacheUpdateResolver<{ addMetadataTemplateField: WithTypename<AddMetadataTemplateFieldPayload> }, MutationAddMetadataTemplateFieldArgs>,
    createIdea?: GraphCacheUpdateResolver<{ createIdea: WithTypename<CreateIdeaPayload> }, MutationCreateIdeaArgs>,
    createMetadataTemplate?: GraphCacheUpdateResolver<{ createMetadataTemplate: WithTypename<CreateMetadataTemplatePayload> }, Record<string, never>>,
    deleteIdea?: GraphCacheUpdateResolver<{ deleteIdea: WithTypename<DeleteIdeaPayload> }, MutationDeleteIdeaArgs>,
    deleteIdeaMetadataField?: GraphCacheUpdateResolver<{ deleteIdeaMetadataField: WithTypename<DeleteIdeaMetadataFieldPayload> }, MutationDeleteIdeaMetadataFieldArgs>,
    deleteIdeaMetadataTemplate?: GraphCacheUpdateResolver<{ deleteIdeaMetadataTemplate: WithTypename<DeleteIdeaMetadataTemplatePayload> }, MutationDeleteIdeaMetadataTemplateArgs>,
    deleteMetadataTemplate?: GraphCacheUpdateResolver<{ deleteMetadataTemplate: WithTypename<DeleteMetadataTemplatePayload> }, MutationDeleteMetadataTemplateArgs>,
    deleteMetadataTemplateField?: GraphCacheUpdateResolver<{ deleteMetadataTemplateField: WithTypename<DeleteMetadataTemplateFieldPayload> }, MutationDeleteMetadataTemplateFieldArgs>,
    updateIdea?: GraphCacheUpdateResolver<{ updateIdea: WithTypename<UpdateIdeaPayload> }, MutationUpdateIdeaArgs>,
    updateIdeaMetadataField?: GraphCacheUpdateResolver<{ updateIdeaMetadataField: WithTypename<UpdateIdeaMetadataFieldPayload> }, MutationUpdateIdeaMetadataFieldArgs>,
    updateMetadataTemplate?: GraphCacheUpdateResolver<{ updateMetadataTemplate: WithTypename<UpdateMetadataTemplatePayload> }, MutationUpdateMetadataTemplateArgs>,
    updateMetadataTemplateField?: GraphCacheUpdateResolver<{ updateMetadataTemplateField: WithTypename<UpdateMetadataTemplateFieldPayload> }, MutationUpdateMetadataTemplateFieldArgs>
  },
  Subscription?: {},
};

export type GraphCacheConfig = {
  schema?: IntrospectionData,
  updates?: GraphCacheUpdaters,
  keys?: GraphCacheKeysConfig,
  optimistic?: GraphCacheOptimisticUpdaters,
  resolvers?: GraphCacheResolvers,
  storage?: GraphCacheStorageAdapter
};