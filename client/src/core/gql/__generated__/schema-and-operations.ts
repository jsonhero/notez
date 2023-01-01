import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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

export type AppNoteMetdataFieldFragment = { __typename?: 'MetadataGroupField', id: string, value?: string | null, schema: { __typename?: 'MetadataGroupFieldSchema', name: string, type: string } };

export type AppNoteFragment = { __typename?: 'Note', id: string, title?: string | null, document?: any | null, metadata: { __typename?: 'NoteMetadata', groups: Array<{ __typename?: 'NoteMetadataGroupObject', context: string, fields: Array<{ __typename?: 'MetadataGroupField', id: string, value?: string | null, schema: { __typename?: 'MetadataGroupFieldSchema', name: string, type: string } }> }> } };

export type AppNoteTableFragment = { __typename?: 'NoteTable', id: string, title?: string | null, schema: { __typename?: 'NoteTableSchema', fields: Array<{ __typename?: 'NoteTableSchemaField', id: string, name: string, type: string }> } };

export type AddNoteMetadataFieldMutationVariables = Exact<{
  input: AddNoteMetadataFieldInput;
}>;


export type AddNoteMetadataFieldMutation = { __typename?: 'Mutation', addNoteMetadataField: { __typename?: 'AddNoteMetadataFieldPayload', field: { __typename?: 'MetadataGroupField', id: string, value?: string | null, schema: { __typename?: 'MetadataGroupFieldSchema', name: string, type: string } } } };

export type CreateNoteMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateNoteMutation = { __typename?: 'Mutation', createNote: { __typename?: 'CreateNotePayload', note: { __typename?: 'Note', id: string, title?: string | null, document?: any | null, metadata: { __typename?: 'NoteMetadata', groups: Array<{ __typename?: 'NoteMetadataGroupObject', context: string, fields: Array<{ __typename?: 'MetadataGroupField', id: string, value?: string | null, schema: { __typename?: 'MetadataGroupFieldSchema', name: string, type: string } }> }> } } } };

export type CreateNoteTableMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateNoteTableMutation = { __typename?: 'Mutation', createNoteTable: { __typename?: 'CreateNoteTablePayload', noteTable: { __typename?: 'NoteTable', id: string, title?: string | null, schema: { __typename?: 'NoteTableSchema', fields: Array<{ __typename?: 'NoteTableSchemaField', id: string, name: string, type: string }> } } } };

export type DeleteNoteMetadataFieldMutationVariables = Exact<{
  input: DeleteNoteMetadataFieldInput;
}>;


export type DeleteNoteMetadataFieldMutation = { __typename?: 'Mutation', deleteNoteMetadataField: { __typename?: 'DeleteNoteMetadataFieldPayload', clientMutationId?: string | null } };

export type DeleteNoteTableMutationVariables = Exact<{
  input: DeleteNoteTableInput;
}>;


export type DeleteNoteTableMutation = { __typename?: 'Mutation', deleteNoteTable: { __typename?: 'DeleteNoteTablePayload', clientMutationId?: string | null } };

export type DeleteNoteMutationVariables = Exact<{
  input: DeleteNoteInput;
}>;


export type DeleteNoteMutation = { __typename?: 'Mutation', deleteNote: { __typename?: 'DeleteNotePayload', clientMutationId?: string | null } };

export type UpdateNoteMetadataFieldMutationVariables = Exact<{
  input: UpdateNoteMetadataFieldInput;
}>;


export type UpdateNoteMetadataFieldMutation = { __typename?: 'Mutation', updateNoteMetadataField: { __typename?: 'UpdateNoteMetadataFieldPayload', field: { __typename?: 'MetadataGroupField', id: string, value?: string | null, schema: { __typename?: 'MetadataGroupFieldSchema', name: string, type: string } } } };

export type UpdateNoteMutationVariables = Exact<{
  input: UpdateNoteInput;
}>;


export type UpdateNoteMutation = { __typename?: 'Mutation', updateNote: { __typename?: 'UpdateNotePayload', note: { __typename?: 'Note', id: string, title?: string | null, document?: any | null, metadata: { __typename?: 'NoteMetadata', groups: Array<{ __typename?: 'NoteMetadataGroupObject', context: string, fields: Array<{ __typename?: 'MetadataGroupField', id: string, value?: string | null, schema: { __typename?: 'MetadataGroupFieldSchema', name: string, type: string } }> }> } } } };

export type GetNoteByIdQueryVariables = Exact<{
  noteId: Scalars['ID'];
}>;


export type GetNoteByIdQuery = { __typename?: 'Query', node?: { __typename?: 'Note', id: string, title?: string | null, document?: any | null, metadata: { __typename?: 'NoteMetadata', groups: Array<{ __typename?: 'NoteMetadataGroupObject', context: string, fields: Array<{ __typename?: 'MetadataGroupField', id: string, value?: string | null, schema: { __typename?: 'MetadataGroupFieldSchema', name: string, type: string } }> }> } } | { __typename?: 'NoteTable' } | null };

export type GetNoteTablesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNoteTablesQuery = { __typename?: 'Query', noteTables: Array<{ __typename?: 'NoteTable', id: string, title?: string | null, schema: { __typename?: 'NoteTableSchema', fields: Array<{ __typename?: 'NoteTableSchemaField', id: string, name: string, type: string }> } }> };

export type GetNotesQueryVariables = Exact<{
  input?: InputMaybe<NoteSearchInput>;
}>;


export type GetNotesQuery = { __typename?: 'Query', notes: Array<{ __typename?: 'Note', id: string, title?: string | null, document?: any | null, metadata: { __typename?: 'NoteMetadata', groups: Array<{ __typename?: 'NoteMetadataGroupObject', context: string, fields: Array<{ __typename?: 'MetadataGroupField', id: string, value?: string | null, schema: { __typename?: 'MetadataGroupFieldSchema', name: string, type: string } }> }> } }> };

export const AppNoteMetdataFieldFragmentDoc = gql`
    fragment AppNoteMetdataField on MetadataGroupField {
  id
  schema {
    name
    type
  }
  value
}
    `;
export const AppNoteFragmentDoc = gql`
    fragment AppNote on Note {
  id
  title
  document
  metadata {
    groups {
      context
      fields {
        id
        schema {
          name
          type
        }
        value
      }
    }
  }
}
    `;
export const AppNoteTableFragmentDoc = gql`
    fragment AppNoteTable on NoteTable {
  id
  title
  schema {
    fields {
      id
      name
      type
    }
  }
}
    `;
export const AddNoteMetadataFieldDocument = gql`
    mutation addNoteMetadataField($input: AddNoteMetadataFieldInput!) {
  addNoteMetadataField(input: $input) {
    field {
      ...AppNoteMetdataField
    }
  }
}
    ${AppNoteMetdataFieldFragmentDoc}`;

export function useAddNoteMetadataFieldMutation() {
  return Urql.useMutation<AddNoteMetadataFieldMutation, AddNoteMetadataFieldMutationVariables>(AddNoteMetadataFieldDocument);
};
export const CreateNoteDocument = gql`
    mutation createNote {
  createNote {
    note {
      ...AppNote
    }
  }
}
    ${AppNoteFragmentDoc}`;

export function useCreateNoteMutation() {
  return Urql.useMutation<CreateNoteMutation, CreateNoteMutationVariables>(CreateNoteDocument);
};
export const CreateNoteTableDocument = gql`
    mutation createNoteTable {
  createNoteTable {
    noteTable {
      ...AppNoteTable
    }
  }
}
    ${AppNoteTableFragmentDoc}`;

export function useCreateNoteTableMutation() {
  return Urql.useMutation<CreateNoteTableMutation, CreateNoteTableMutationVariables>(CreateNoteTableDocument);
};
export const DeleteNoteMetadataFieldDocument = gql`
    mutation deleteNoteMetadataField($input: DeleteNoteMetadataFieldInput!) {
  deleteNoteMetadataField(input: $input) {
    clientMutationId
  }
}
    `;

export function useDeleteNoteMetadataFieldMutation() {
  return Urql.useMutation<DeleteNoteMetadataFieldMutation, DeleteNoteMetadataFieldMutationVariables>(DeleteNoteMetadataFieldDocument);
};
export const DeleteNoteTableDocument = gql`
    mutation deleteNoteTable($input: DeleteNoteTableInput!) {
  deleteNoteTable(input: $input) {
    clientMutationId
  }
}
    `;

export function useDeleteNoteTableMutation() {
  return Urql.useMutation<DeleteNoteTableMutation, DeleteNoteTableMutationVariables>(DeleteNoteTableDocument);
};
export const DeleteNoteDocument = gql`
    mutation deleteNote($input: DeleteNoteInput!) {
  deleteNote(input: $input) {
    clientMutationId
  }
}
    `;

export function useDeleteNoteMutation() {
  return Urql.useMutation<DeleteNoteMutation, DeleteNoteMutationVariables>(DeleteNoteDocument);
};
export const UpdateNoteMetadataFieldDocument = gql`
    mutation updateNoteMetadataField($input: UpdateNoteMetadataFieldInput!) {
  updateNoteMetadataField(input: $input) {
    field {
      ...AppNoteMetdataField
    }
  }
}
    ${AppNoteMetdataFieldFragmentDoc}`;

export function useUpdateNoteMetadataFieldMutation() {
  return Urql.useMutation<UpdateNoteMetadataFieldMutation, UpdateNoteMetadataFieldMutationVariables>(UpdateNoteMetadataFieldDocument);
};
export const UpdateNoteDocument = gql`
    mutation updateNote($input: UpdateNoteInput!) {
  updateNote(input: $input) {
    note {
      ...AppNote
    }
  }
}
    ${AppNoteFragmentDoc}`;

export function useUpdateNoteMutation() {
  return Urql.useMutation<UpdateNoteMutation, UpdateNoteMutationVariables>(UpdateNoteDocument);
};
export const GetNoteByIdDocument = gql`
    query getNoteById($noteId: ID!) {
  node(id: $noteId) {
    ... on Note {
      ...AppNote
    }
  }
}
    ${AppNoteFragmentDoc}`;

export function useGetNoteByIdQuery(options: Omit<Urql.UseQueryArgs<GetNoteByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetNoteByIdQuery, GetNoteByIdQueryVariables>({ query: GetNoteByIdDocument, ...options });
};
export const GetNoteTablesDocument = gql`
    query getNoteTables {
  noteTables {
    ...AppNoteTable
  }
}
    ${AppNoteTableFragmentDoc}`;

export function useGetNoteTablesQuery(options?: Omit<Urql.UseQueryArgs<GetNoteTablesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetNoteTablesQuery, GetNoteTablesQueryVariables>({ query: GetNoteTablesDocument, ...options });
};
export const GetNotesDocument = gql`
    query getNotes($input: NoteSearchInput) {
  notes(input: $input) {
    ...AppNote
  }
}
    ${AppNoteFragmentDoc}`;

export function useGetNotesQuery(options?: Omit<Urql.UseQueryArgs<GetNotesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetNotesQuery, GetNotesQueryVariables>({ query: GetNotesDocument, ...options });
};