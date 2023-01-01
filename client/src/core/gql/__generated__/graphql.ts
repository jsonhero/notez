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

export type CreateNoteTablePayload = {
  __typename?: 'CreateNoteTablePayload';
  noteTable: NoteTable;
};

export type DeleteNoteInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  noteId: Scalars['ID'];
};

export type DeleteNoteMetadataFieldInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  fieldId: Scalars['ID'];
  noteId: Scalars['ID'];
};

export type DeleteNoteMetadataFieldPayload = {
  __typename?: 'DeleteNoteMetadataFieldPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteNotePayload = {
  __typename?: 'DeleteNotePayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteNoteTableInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  noteTableId: Scalars['ID'];
};

export type DeleteNoteTablePayload = {
  __typename?: 'DeleteNoteTablePayload';
  clientMutationId?: Maybe<Scalars['String']>;
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
  createNoteTable: CreateNoteTablePayload;
  deleteNote: DeleteNotePayload;
  deleteNoteMetadataField: DeleteNoteMetadataFieldPayload;
  deleteNoteTable: DeleteNoteTablePayload;
  updateNote: UpdateNotePayload;
  updateNoteMetadataField: UpdateNoteMetadataFieldPayload;
};


export type MutationAddNoteMetadataFieldArgs = {
  input: AddNoteMetadataFieldInput;
};


export type MutationDeleteNoteArgs = {
  input: DeleteNoteInput;
};


export type MutationDeleteNoteMetadataFieldArgs = {
  input: DeleteNoteMetadataFieldInput;
};


export type MutationDeleteNoteTableArgs = {
  input: DeleteNoteTableInput;
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

export type NoteSearchInput = {
  title: Scalars['String'];
};

export type NoteTable = Node & {
  __typename?: 'NoteTable';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  schema: NoteTableSchema;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type NoteTableSchema = {
  __typename?: 'NoteTableSchema';
  fields: Array<NoteTableSchemaField>;
};

export type NoteTableSchemaField = {
  __typename?: 'NoteTableSchemaField';
  id: Scalars['ID'];
  name: Scalars['String'];
  type: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  node?: Maybe<Node>;
  nodes: Array<Node>;
  noteTables: Array<NoteTable>;
  notes: Array<Note>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryNotesArgs = {
  input?: InputMaybe<NoteSearchInput>;
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
  CreateNoteTablePayload?: (data: WithTypename<CreateNoteTablePayload>) => null | string,
  DeleteNoteMetadataFieldPayload?: (data: WithTypename<DeleteNoteMetadataFieldPayload>) => null | string,
  DeleteNotePayload?: (data: WithTypename<DeleteNotePayload>) => null | string,
  DeleteNoteTablePayload?: (data: WithTypename<DeleteNoteTablePayload>) => null | string,
  MetadataGroupField?: (data: WithTypename<MetadataGroupField>) => null | string,
  MetadataGroupFieldSchema?: (data: WithTypename<MetadataGroupFieldSchema>) => null | string,
  Note?: (data: WithTypename<Note>) => null | string,
  NoteMetadata?: (data: WithTypename<NoteMetadata>) => null | string,
  NoteMetadataGroupObject?: (data: WithTypename<NoteMetadataGroupObject>) => null | string,
  NoteTable?: (data: WithTypename<NoteTable>) => null | string,
  NoteTableSchema?: (data: WithTypename<NoteTableSchema>) => null | string,
  NoteTableSchemaField?: (data: WithTypename<NoteTableSchemaField>) => null | string,
  UpdateNoteMetadataFieldPayload?: (data: WithTypename<UpdateNoteMetadataFieldPayload>) => null | string,
  UpdateNotePayload?: (data: WithTypename<UpdateNotePayload>) => null | string
}

export type GraphCacheResolvers = {
  Query?: {
    node?: GraphCacheResolver<WithTypename<Query>, QueryNodeArgs, WithTypename<Note> | WithTypename<NoteTable> | string>,
    nodes?: GraphCacheResolver<WithTypename<Query>, QueryNodesArgs, Array<WithTypename<Note> | WithTypename<NoteTable> | string>>,
    noteTables?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, Array<WithTypename<NoteTable> | string>>,
    notes?: GraphCacheResolver<WithTypename<Query>, QueryNotesArgs, Array<WithTypename<Note> | string>>
  },
  AddNoteMetadataFieldPayload?: {
    field?: GraphCacheResolver<WithTypename<AddNoteMetadataFieldPayload>, Record<string, never>, WithTypename<MetadataGroupField> | string>
  },
  CreateNotePayload?: {
    note?: GraphCacheResolver<WithTypename<CreateNotePayload>, Record<string, never>, WithTypename<Note> | string>
  },
  CreateNoteTablePayload?: {
    noteTable?: GraphCacheResolver<WithTypename<CreateNoteTablePayload>, Record<string, never>, WithTypename<NoteTable> | string>
  },
  DeleteNoteMetadataFieldPayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<DeleteNoteMetadataFieldPayload>, Record<string, never>, Scalars['String'] | string>
  },
  DeleteNotePayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<DeleteNotePayload>, Record<string, never>, Scalars['String'] | string>
  },
  DeleteNoteTablePayload?: {
    clientMutationId?: GraphCacheResolver<WithTypename<DeleteNoteTablePayload>, Record<string, never>, Scalars['String'] | string>
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
  NoteTable?: {
    createdAt?: GraphCacheResolver<WithTypename<NoteTable>, Record<string, never>, Scalars['DateTime'] | string>,
    id?: GraphCacheResolver<WithTypename<NoteTable>, Record<string, never>, Scalars['ID'] | string>,
    schema?: GraphCacheResolver<WithTypename<NoteTable>, Record<string, never>, WithTypename<NoteTableSchema> | string>,
    title?: GraphCacheResolver<WithTypename<NoteTable>, Record<string, never>, Scalars['String'] | string>,
    updatedAt?: GraphCacheResolver<WithTypename<NoteTable>, Record<string, never>, Scalars['DateTime'] | string>
  },
  NoteTableSchema?: {
    fields?: GraphCacheResolver<WithTypename<NoteTableSchema>, Record<string, never>, Array<WithTypename<NoteTableSchemaField> | string>>
  },
  NoteTableSchemaField?: {
    id?: GraphCacheResolver<WithTypename<NoteTableSchemaField>, Record<string, never>, Scalars['ID'] | string>,
    name?: GraphCacheResolver<WithTypename<NoteTableSchemaField>, Record<string, never>, Scalars['String'] | string>,
    type?: GraphCacheResolver<WithTypename<NoteTableSchemaField>, Record<string, never>, Scalars['String'] | string>
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
  createNoteTable?: GraphCacheOptimisticMutationResolver<Record<string, never>, WithTypename<CreateNoteTablePayload>>,
  deleteNote?: GraphCacheOptimisticMutationResolver<MutationDeleteNoteArgs, WithTypename<DeleteNotePayload>>,
  deleteNoteMetadataField?: GraphCacheOptimisticMutationResolver<MutationDeleteNoteMetadataFieldArgs, WithTypename<DeleteNoteMetadataFieldPayload>>,
  deleteNoteTable?: GraphCacheOptimisticMutationResolver<MutationDeleteNoteTableArgs, WithTypename<DeleteNoteTablePayload>>,
  updateNote?: GraphCacheOptimisticMutationResolver<MutationUpdateNoteArgs, WithTypename<UpdateNotePayload>>,
  updateNoteMetadataField?: GraphCacheOptimisticMutationResolver<MutationUpdateNoteMetadataFieldArgs, WithTypename<UpdateNoteMetadataFieldPayload>>
};

export type GraphCacheUpdaters = {
  Mutation?: {
    addNoteMetadataField?: GraphCacheUpdateResolver<{ addNoteMetadataField: WithTypename<AddNoteMetadataFieldPayload> }, MutationAddNoteMetadataFieldArgs>,
    createNote?: GraphCacheUpdateResolver<{ createNote: WithTypename<CreateNotePayload> }, Record<string, never>>,
    createNoteTable?: GraphCacheUpdateResolver<{ createNoteTable: WithTypename<CreateNoteTablePayload> }, Record<string, never>>,
    deleteNote?: GraphCacheUpdateResolver<{ deleteNote: WithTypename<DeleteNotePayload> }, MutationDeleteNoteArgs>,
    deleteNoteMetadataField?: GraphCacheUpdateResolver<{ deleteNoteMetadataField: WithTypename<DeleteNoteMetadataFieldPayload> }, MutationDeleteNoteMetadataFieldArgs>,
    deleteNoteTable?: GraphCacheUpdateResolver<{ deleteNoteTable: WithTypename<DeleteNoteTablePayload> }, MutationDeleteNoteTableArgs>,
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