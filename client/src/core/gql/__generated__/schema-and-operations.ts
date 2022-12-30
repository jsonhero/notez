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

export type AppNoteMetdataFieldFragment = { __typename?: 'MetadataGroupField', id: string, value?: string | null, schema: { __typename?: 'MetadataGroupFieldSchema', name: string, type: string } };

export type AppNoteFragment = { __typename?: 'Note', id: string, title?: string | null, document?: any | null, metadata: { __typename?: 'NoteMetadata', groups: Array<{ __typename?: 'NoteMetadataGroupObject', context: string, fields: Array<{ __typename?: 'MetadataGroupField', id: string, value?: string | null, schema: { __typename?: 'MetadataGroupFieldSchema', name: string, type: string } }> }> } };

export type AddNoteMetadataFieldMutationVariables = Exact<{
  input: AddNoteMetadataFieldInput;
}>;


export type AddNoteMetadataFieldMutation = { __typename?: 'Mutation', addNoteMetadataField: { __typename?: 'AddNoteMetadataFieldPayload', field: { __typename?: 'MetadataGroupField', id: string, value?: string | null, schema: { __typename?: 'MetadataGroupFieldSchema', name: string, type: string } } } };

export type CreateNoteMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateNoteMutation = { __typename?: 'Mutation', createNote: { __typename?: 'CreateNotePayload', note: { __typename?: 'Note', id: string, title?: string | null, document?: any | null, metadata: { __typename?: 'NoteMetadata', groups: Array<{ __typename?: 'NoteMetadataGroupObject', context: string, fields: Array<{ __typename?: 'MetadataGroupField', id: string, value?: string | null, schema: { __typename?: 'MetadataGroupFieldSchema', name: string, type: string } }> }> } } } };

export type DeleteNoteMutationVariables = Exact<{
  input: DeleteNoteInput;
}>;


export type DeleteNoteMutation = { __typename?: 'Mutation', deleteNote: { __typename?: 'DeleteNotePayload', success: boolean } };

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


export type GetNoteByIdQuery = { __typename?: 'Query', node?: { __typename?: 'Note', id: string, title?: string | null, document?: any | null, metadata: { __typename?: 'NoteMetadata', groups: Array<{ __typename?: 'NoteMetadataGroupObject', context: string, fields: Array<{ __typename?: 'MetadataGroupField', id: string, value?: string | null, schema: { __typename?: 'MetadataGroupFieldSchema', name: string, type: string } }> }> } } | null };

export type GetNotesQueryVariables = Exact<{ [key: string]: never; }>;


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
export const DeleteNoteDocument = gql`
    mutation deleteNote($input: DeleteNoteInput!) {
  deleteNote(input: $input) {
    success
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
export const GetNotesDocument = gql`
    query getNotes {
  notes {
    ...AppNote
  }
}
    ${AppNoteFragmentDoc}`;

export function useGetNotesQuery(options?: Omit<Urql.UseQueryArgs<GetNotesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetNotesQuery, GetNotesQueryVariables>({ query: GetNotesDocument, ...options });
};