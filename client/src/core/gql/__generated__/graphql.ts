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

export type AddNoteMetadataFieldInput = {
  noteId: Scalars['ID'];
};

export type AddNoteMetadataFieldPayload = {
  __typename?: 'AddNoteMetadataFieldPayload';
  field: MetadataGroupField;
};

export type CreateNotePayload = {
  __typename?: 'CreateNotePayload';
  note: Note;
};

export type DeleteNoteInput = {
  noteId: Scalars['ID'];
};

export type DeleteNotePayload = {
  __typename?: 'DeleteNotePayload';
  success: Scalars['Boolean'];
};

export type MetadataFieldInput = {
  schema?: InputMaybe<MetadataFieldSchemaInput>;
  value?: InputMaybe<Scalars['String']>;
};

export type MetadataFieldSchemaInput = {
  name: Scalars['String'];
  type: Scalars['String'];
};

export type MetadataGroupField = {
  __typename?: 'MetadataGroupField';
  id: Scalars['ID'];
  schema: MetadataGroupFieldSchema;
  value?: Maybe<Scalars['String']>;
};

export type MetadataGroupFieldSchema = {
  __typename?: 'MetadataGroupFieldSchema';
  name: Scalars['String'];
  type: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addNoteMetadataField: AddNoteMetadataFieldPayload;
  createNote: CreateNotePayload;
  deleteNote: DeleteNotePayload;
  updateNote: UpdateNotePayload;
  updateNoteMetadataField: UpdateNoteMetadataFieldPayload;
};


export type MutationAddNoteMetadataFieldArgs = {
  input: AddNoteMetadataFieldInput;
};


export type MutationDeleteNoteArgs = {
  input: DeleteNoteInput;
};


export type MutationUpdateNoteArgs = {
  input: UpdateNoteInput;
};


export type MutationUpdateNoteMetadataFieldArgs = {
  input: UpdateNoteMetadataFieldInput;
};

export type Node = {
  id: Scalars['ID'];
};

export type Note = Node & {
  __typename?: 'Note';
  createdAt: Scalars['DateTime'];
  document?: Maybe<Scalars['JSONObject']>;
  id: Scalars['ID'];
  metadata: NoteMetadata;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type NoteInput = {
  document?: InputMaybe<Scalars['JSONObject']>;
  title?: InputMaybe<Scalars['String']>;
};

export type NoteMetadata = {
  __typename?: 'NoteMetadata';
  groups: Array<NoteMetadataGroupObject>;
};

export type NoteMetadataGroupObject = {
  __typename?: 'NoteMetadataGroupObject';
  context: Scalars['String'];
  fields: Array<MetadataGroupField>;
};

export type Query = {
  __typename?: 'Query';
  node?: Maybe<Node>;
  nodes: Array<Node>;
  notes: Array<Note>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']>;
};

export type UpdateNoteInput = {
  note: NoteInput;
  noteId: Scalars['ID'];
};

export type UpdateNoteMetadataFieldInput = {
  field: MetadataFieldInput;
  fieldId: Scalars['ID'];
  noteId: Scalars['ID'];
};

export type UpdateNoteMetadataFieldPayload = {
  __typename?: 'UpdateNoteMetadataFieldPayload';
  field: MetadataGroupField;
};

export type UpdateNotePayload = {
  __typename?: 'UpdateNotePayload';
  note: Note;
};

export type WithTypename<T extends { __typename?: any }> = Partial<T> & { __typename: NonNullable<T['__typename']> };

export type GraphCacheKeysConfig = {
  AddNoteMetadataFieldPayload?: (data: WithTypename<AddNoteMetadataFieldPayload>) => null | string,
  CreateNotePayload?: (data: WithTypename<CreateNotePayload>) => null | string,
  DeleteNotePayload?: (data: WithTypename<DeleteNotePayload>) => null | string,
  MetadataGroupField?: (data: WithTypename<MetadataGroupField>) => null | string,
  MetadataGroupFieldSchema?: (data: WithTypename<MetadataGroupFieldSchema>) => null | string,
  Note?: (data: WithTypename<Note>) => null | string,
  NoteMetadata?: (data: WithTypename<NoteMetadata>) => null | string,
  NoteMetadataGroupObject?: (data: WithTypename<NoteMetadataGroupObject>) => null | string,
  UpdateNoteMetadataFieldPayload?: (data: WithTypename<UpdateNoteMetadataFieldPayload>) => null | string,
  UpdateNotePayload?: (data: WithTypename<UpdateNotePayload>) => null | string
}

export type GraphCacheResolvers = {
  Query?: {
    node?: GraphCacheResolver<WithTypename<Query>, QueryNodeArgs, WithTypename<Note> | string>,
    nodes?: GraphCacheResolver<WithTypename<Query>, QueryNodesArgs, Array<WithTypename<Note> | string>>,
    notes?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, Array<WithTypename<Note> | string>>
  },
  AddNoteMetadataFieldPayload?: {
    field?: GraphCacheResolver<WithTypename<AddNoteMetadataFieldPayload>, Record<string, never>, WithTypename<MetadataGroupField> | string>
  },
  CreateNotePayload?: {
    note?: GraphCacheResolver<WithTypename<CreateNotePayload>, Record<string, never>, WithTypename<Note> | string>
  },
  DeleteNotePayload?: {
    success?: GraphCacheResolver<WithTypename<DeleteNotePayload>, Record<string, never>, Scalars['Boolean'] | string>
  },
  MetadataGroupField?: {
    id?: GraphCacheResolver<WithTypename<MetadataGroupField>, Record<string, never>, Scalars['ID'] | string>,
    schema?: GraphCacheResolver<WithTypename<MetadataGroupField>, Record<string, never>, WithTypename<MetadataGroupFieldSchema> | string>,
    value?: GraphCacheResolver<WithTypename<MetadataGroupField>, Record<string, never>, Scalars['String'] | string>
  },
  MetadataGroupFieldSchema?: {
    name?: GraphCacheResolver<WithTypename<MetadataGroupFieldSchema>, Record<string, never>, Scalars['String'] | string>,
    type?: GraphCacheResolver<WithTypename<MetadataGroupFieldSchema>, Record<string, never>, Scalars['String'] | string>
  },
  Note?: {
    createdAt?: GraphCacheResolver<WithTypename<Note>, Record<string, never>, Scalars['DateTime'] | string>,
    document?: GraphCacheResolver<WithTypename<Note>, Record<string, never>, Scalars['JSONObject'] | string>,
    id?: GraphCacheResolver<WithTypename<Note>, Record<string, never>, Scalars['ID'] | string>,
    metadata?: GraphCacheResolver<WithTypename<Note>, Record<string, never>, WithTypename<NoteMetadata> | string>,
    title?: GraphCacheResolver<WithTypename<Note>, Record<string, never>, Scalars['String'] | string>,
    updatedAt?: GraphCacheResolver<WithTypename<Note>, Record<string, never>, Scalars['DateTime'] | string>
  },
  NoteMetadata?: {
    groups?: GraphCacheResolver<WithTypename<NoteMetadata>, Record<string, never>, Array<WithTypename<NoteMetadataGroupObject> | string>>
  },
  NoteMetadataGroupObject?: {
    context?: GraphCacheResolver<WithTypename<NoteMetadataGroupObject>, Record<string, never>, Scalars['String'] | string>,
    fields?: GraphCacheResolver<WithTypename<NoteMetadataGroupObject>, Record<string, never>, Array<WithTypename<MetadataGroupField> | string>>
  },
  UpdateNoteMetadataFieldPayload?: {
    field?: GraphCacheResolver<WithTypename<UpdateNoteMetadataFieldPayload>, Record<string, never>, WithTypename<MetadataGroupField> | string>
  },
  UpdateNotePayload?: {
    note?: GraphCacheResolver<WithTypename<UpdateNotePayload>, Record<string, never>, WithTypename<Note> | string>
  }
};

export type GraphCacheOptimisticUpdaters = {
  addNoteMetadataField?: GraphCacheOptimisticMutationResolver<MutationAddNoteMetadataFieldArgs, WithTypename<AddNoteMetadataFieldPayload>>,
  createNote?: GraphCacheOptimisticMutationResolver<Record<string, never>, WithTypename<CreateNotePayload>>,
  deleteNote?: GraphCacheOptimisticMutationResolver<MutationDeleteNoteArgs, WithTypename<DeleteNotePayload>>,
  updateNote?: GraphCacheOptimisticMutationResolver<MutationUpdateNoteArgs, WithTypename<UpdateNotePayload>>,
  updateNoteMetadataField?: GraphCacheOptimisticMutationResolver<MutationUpdateNoteMetadataFieldArgs, WithTypename<UpdateNoteMetadataFieldPayload>>
};

export type GraphCacheUpdaters = {
  Mutation?: {
    addNoteMetadataField?: GraphCacheUpdateResolver<{ addNoteMetadataField: WithTypename<AddNoteMetadataFieldPayload> }, MutationAddNoteMetadataFieldArgs>,
    createNote?: GraphCacheUpdateResolver<{ createNote: WithTypename<CreateNotePayload> }, Record<string, never>>,
    deleteNote?: GraphCacheUpdateResolver<{ deleteNote: WithTypename<DeleteNotePayload> }, MutationDeleteNoteArgs>,
    updateNote?: GraphCacheUpdateResolver<{ updateNote: WithTypename<UpdateNotePayload> }, MutationUpdateNoteArgs>,
    updateNoteMetadataField?: GraphCacheUpdateResolver<{ updateNoteMetadataField: WithTypename<UpdateNoteMetadataFieldPayload> }, MutationUpdateNoteMetadataFieldArgs>
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