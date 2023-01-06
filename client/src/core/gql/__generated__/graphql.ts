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
  updatedAt: Scalars['DateTime'];
};

export type IdeaInput = {
  document?: InputMaybe<Scalars['JSONObject']>;
  title?: InputMaybe<Scalars['String']>;
};

export type IdeaMetadata = {
  __typename?: 'IdeaMetadata';
  groups: Array<MetadataGroup>;
};

export type IdeaSearchInput = {
  metadataTemplateIds?: InputMaybe<Array<Scalars['ID']>>;
  title?: InputMaybe<Scalars['String']>;
};

export type MetadataFieldInput = {
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type MetadataGroup = {
  __typename?: 'MetadataGroup';
  context: Scalars['String'];
  fields: Array<MetadataGroupFieldEntry>;
  template?: Maybe<MetadataTemplate>;
};

export type MetadataGroupFieldEntry = {
  __typename?: 'MetadataGroupFieldEntry';
  id: Scalars['ID'];
  schema: MetadataGroupFieldSchema;
  value?: Maybe<Scalars['String']>;
};

export type MetadataGroupFieldSchema = {
  __typename?: 'MetadataGroupFieldSchema';
  id: Scalars['ID'];
  name: Scalars['String'];
  type: Scalars['String'];
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
};

export type Mutation = {
  __typename?: 'Mutation';
  addIdeaMetadataField: AddIdeaMetadataFieldPayload;
  addMetadataTemplateField: AddMetadataTemplateFieldPayload;
  createIdea: CreateIdeaPayload;
  createMetadataTemplate: CreateMetadataTemplatePayload;
  deleteIdea: DeleteIdeaPayload;
  deleteIdeaMetadataField: DeleteIdeaMetadataFieldPayload;
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
  AddMetadataTemplateFieldPayload?: (data: WithTypename<AddMetadataTemplateFieldPayload>) => null | string,
  CreateIdeaPayload?: (data: WithTypename<CreateIdeaPayload>) => null | string,
  CreateMetadataTemplatePayload?: (data: WithTypename<CreateMetadataTemplatePayload>) => null | string,
  DeleteIdeaMetadataFieldPayload?: (data: WithTypename<DeleteIdeaMetadataFieldPayload>) => null | string,
  DeleteIdeaPayload?: (data: WithTypename<DeleteIdeaPayload>) => null | string,
  DeleteMetadataTemplateFieldPayload?: (data: WithTypename<DeleteMetadataTemplateFieldPayload>) => null | string,
  DeleteMetadataTemplatePayload?: (data: WithTypename<DeleteMetadataTemplatePayload>) => null | string,
  Idea?: (data: WithTypename<Idea>) => null | string,
  IdeaMetadata?: (data: WithTypename<IdeaMetadata>) => null | string,
  MetadataGroup?: (data: WithTypename<MetadataGroup>) => null | string,
  MetadataGroupFieldEntry?: (data: WithTypename<MetadataGroupFieldEntry>) => null | string,
  MetadataGroupFieldSchema?: (data: WithTypename<MetadataGroupFieldSchema>) => null | string,
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
    metadataTemplates?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, Array<WithTypename<MetadataTemplate> | string>>,
    node?: GraphCacheResolver<WithTypename<Query>, QueryNodeArgs, WithTypename<Idea> | WithTypename<MetadataTemplate> | string>,
    nodes?: GraphCacheResolver<WithTypename<Query>, QueryNodesArgs, Array<WithTypename<Idea> | WithTypename<MetadataTemplate> | string>>
  },
  AddIdeaMetadataFieldPayload?: {
    field?: GraphCacheResolver<WithTypename<AddIdeaMetadataFieldPayload>, Record<string, never>, WithTypename<MetadataGroupFieldEntry> | string>
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
    updatedAt?: GraphCacheResolver<WithTypename<Idea>, Record<string, never>, Scalars['DateTime'] | string>
  },
  IdeaMetadata?: {
    groups?: GraphCacheResolver<WithTypename<IdeaMetadata>, Record<string, never>, Array<WithTypename<MetadataGroup> | string>>
  },
  MetadataGroup?: {
    context?: GraphCacheResolver<WithTypename<MetadataGroup>, Record<string, never>, Scalars['String'] | string>,
    fields?: GraphCacheResolver<WithTypename<MetadataGroup>, Record<string, never>, Array<WithTypename<MetadataGroupFieldEntry> | string>>,
    template?: GraphCacheResolver<WithTypename<MetadataGroup>, Record<string, never>, WithTypename<MetadataTemplate> | string>
  },
  MetadataGroupFieldEntry?: {
    id?: GraphCacheResolver<WithTypename<MetadataGroupFieldEntry>, Record<string, never>, Scalars['ID'] | string>,
    schema?: GraphCacheResolver<WithTypename<MetadataGroupFieldEntry>, Record<string, never>, WithTypename<MetadataGroupFieldSchema> | string>,
    value?: GraphCacheResolver<WithTypename<MetadataGroupFieldEntry>, Record<string, never>, Scalars['String'] | string>
  },
  MetadataGroupFieldSchema?: {
    id?: GraphCacheResolver<WithTypename<MetadataGroupFieldSchema>, Record<string, never>, Scalars['ID'] | string>,
    name?: GraphCacheResolver<WithTypename<MetadataGroupFieldSchema>, Record<string, never>, Scalars['String'] | string>,
    type?: GraphCacheResolver<WithTypename<MetadataGroupFieldSchema>, Record<string, never>, Scalars['String'] | string>
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
    type?: GraphCacheResolver<WithTypename<MetadataTemplateSchemaField>, Record<string, never>, Scalars['String'] | string>
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
  addMetadataTemplateField?: GraphCacheOptimisticMutationResolver<MutationAddMetadataTemplateFieldArgs, WithTypename<AddMetadataTemplateFieldPayload>>,
  createIdea?: GraphCacheOptimisticMutationResolver<MutationCreateIdeaArgs, WithTypename<CreateIdeaPayload>>,
  createMetadataTemplate?: GraphCacheOptimisticMutationResolver<Record<string, never>, WithTypename<CreateMetadataTemplatePayload>>,
  deleteIdea?: GraphCacheOptimisticMutationResolver<MutationDeleteIdeaArgs, WithTypename<DeleteIdeaPayload>>,
  deleteIdeaMetadataField?: GraphCacheOptimisticMutationResolver<MutationDeleteIdeaMetadataFieldArgs, WithTypename<DeleteIdeaMetadataFieldPayload>>,
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
    addMetadataTemplateField?: GraphCacheUpdateResolver<{ addMetadataTemplateField: WithTypename<AddMetadataTemplateFieldPayload> }, MutationAddMetadataTemplateFieldArgs>,
    createIdea?: GraphCacheUpdateResolver<{ createIdea: WithTypename<CreateIdeaPayload> }, MutationCreateIdeaArgs>,
    createMetadataTemplate?: GraphCacheUpdateResolver<{ createMetadataTemplate: WithTypename<CreateMetadataTemplatePayload> }, Record<string, never>>,
    deleteIdea?: GraphCacheUpdateResolver<{ deleteIdea: WithTypename<DeleteIdeaPayload> }, MutationDeleteIdeaArgs>,
    deleteIdeaMetadataField?: GraphCacheUpdateResolver<{ deleteIdeaMetadataField: WithTypename<DeleteIdeaMetadataFieldPayload> }, MutationDeleteIdeaMetadataFieldArgs>,
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