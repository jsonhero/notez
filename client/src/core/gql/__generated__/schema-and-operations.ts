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

export type AppIdeaMetadataFieldFragment = { __typename?: 'MetadataGroupFieldEntry', id: string, value?: string | null, schema: { __typename?: 'MetadataGroupFieldSchema', id: string, name: string, type: string } };

export type AppIdeaFragment = { __typename: 'Idea', id: string, title?: string | null, document?: any | null, metadata: { __typename?: 'IdeaMetadata', groups: Array<{ __typename?: 'MetadataGroup', context: string, template?: { __typename?: 'MetadataTemplate', id: string, title?: string | null } | null, fields: Array<{ __typename?: 'MetadataGroupFieldEntry', id: string, value?: string | null, schema: { __typename?: 'MetadataGroupFieldSchema', id: string, name: string, type: string } }> }> } };

export type AppIdeaMetadataGroupFragment = { __typename?: 'MetadataGroup', context: string, template?: { __typename?: 'MetadataTemplate', id: string, title?: string | null } | null, fields: Array<{ __typename?: 'MetadataGroupFieldEntry', id: string, value?: string | null, schema: { __typename?: 'MetadataGroupFieldSchema', id: string, name: string, type: string } }> };

export type AppMetadataTemplateSchemaFieldFragment = { __typename?: 'MetadataTemplateSchemaField', id: string, name: string, type: string };

export type AppMetadataTemplateFragment = { __typename: 'MetadataTemplate', id: string, title?: string | null, schema: { __typename?: 'MetadataTemplateSchema', fields: Array<{ __typename?: 'MetadataTemplateSchemaField', id: string, name: string, type: string }> } };

export type AddIdeaMetadataFieldMutationVariables = Exact<{
  input: AddIdeaMetadataFieldInput;
}>;


export type AddIdeaMetadataFieldMutation = { __typename?: 'Mutation', addIdeaMetadataField: { __typename?: 'AddIdeaMetadataFieldPayload', field: { __typename?: 'MetadataGroupFieldEntry', id: string, value?: string | null, schema: { __typename?: 'MetadataGroupFieldSchema', id: string, name: string, type: string } } } };

export type AddMetadataTemplateFieldMutationVariables = Exact<{
  input: AddMetadataTemplateFieldInput;
}>;


export type AddMetadataTemplateFieldMutation = { __typename?: 'Mutation', addMetadataTemplateField: { __typename?: 'AddMetadataTemplateFieldPayload', field: { __typename?: 'MetadataTemplateSchemaField', id: string, name: string, type: string } } };

export type CreateIdeaMutationVariables = Exact<{
  input?: InputMaybe<CreateIdeaInput>;
}>;


export type CreateIdeaMutation = { __typename?: 'Mutation', createIdea: { __typename?: 'CreateIdeaPayload', idea: { __typename: 'Idea', id: string, title?: string | null, document?: any | null, metadata: { __typename?: 'IdeaMetadata', groups: Array<{ __typename?: 'MetadataGroup', context: string, template?: { __typename?: 'MetadataTemplate', id: string, title?: string | null } | null, fields: Array<{ __typename?: 'MetadataGroupFieldEntry', id: string, value?: string | null, schema: { __typename?: 'MetadataGroupFieldSchema', id: string, name: string, type: string } }> }> } } } };

export type CreateMetadataTemplateMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateMetadataTemplateMutation = { __typename?: 'Mutation', createMetadataTemplate: { __typename?: 'CreateMetadataTemplatePayload', template: { __typename: 'MetadataTemplate', id: string, title?: string | null, schema: { __typename?: 'MetadataTemplateSchema', fields: Array<{ __typename?: 'MetadataTemplateSchemaField', id: string, name: string, type: string }> } } } };

export type DeleteIdeaMutationVariables = Exact<{
  input: DeleteIdeaInput;
}>;


export type DeleteIdeaMutation = { __typename?: 'Mutation', deleteIdea: { __typename?: 'DeleteIdeaPayload', clientMutationId?: string | null } };

export type DeleteIdeaMetadataFieldMutationVariables = Exact<{
  input: DeleteIdeaMetadataFieldInput;
}>;


export type DeleteIdeaMetadataFieldMutation = { __typename?: 'Mutation', deleteIdeaMetadataField: { __typename?: 'DeleteIdeaMetadataFieldPayload', clientMutationId?: string | null } };

export type DeleteMetadataTemplateMutationVariables = Exact<{
  input: DeleteMetadataTemplateInput;
}>;


export type DeleteMetadataTemplateMutation = { __typename?: 'Mutation', deleteMetadataTemplate: { __typename?: 'DeleteMetadataTemplatePayload', clientMutationId?: string | null } };

export type UpdateIdeaMutationVariables = Exact<{
  input: UpdateIdeaInput;
}>;


export type UpdateIdeaMutation = { __typename?: 'Mutation', updateIdea: { __typename?: 'UpdateIdeaPayload', idea: { __typename: 'Idea', id: string, title?: string | null, document?: any | null, metadata: { __typename?: 'IdeaMetadata', groups: Array<{ __typename?: 'MetadataGroup', context: string, template?: { __typename?: 'MetadataTemplate', id: string, title?: string | null } | null, fields: Array<{ __typename?: 'MetadataGroupFieldEntry', id: string, value?: string | null, schema: { __typename?: 'MetadataGroupFieldSchema', id: string, name: string, type: string } }> }> } } } };

export type UpdateIdeaMetadataFieldMutationVariables = Exact<{
  input: UpdateIdeaMetadataFieldInput;
}>;


export type UpdateIdeaMetadataFieldMutation = { __typename?: 'Mutation', updateIdeaMetadataField: { __typename?: 'UpdateIdeaMetadataFieldPayload', field: { __typename?: 'MetadataGroupFieldEntry', id: string, value?: string | null, schema: { __typename?: 'MetadataGroupFieldSchema', id: string, name: string, type: string } } } };

export type UpdateMetadataTemplateFieldMutationVariables = Exact<{
  input: UpdateMetadataTemplateFieldInput;
}>;


export type UpdateMetadataTemplateFieldMutation = { __typename?: 'Mutation', updateMetadataTemplateField: { __typename?: 'UpdateMetadataTemplateFieldPayload', field: { __typename?: 'MetadataTemplateSchemaField', id: string, name: string, type: string } } };

export type UpdateMetadataTemplateMutationVariables = Exact<{
  input: UpdateMetadataTemplateInput;
}>;


export type UpdateMetadataTemplateMutation = { __typename?: 'Mutation', updateMetadataTemplate: { __typename?: 'UpdateMetadataTemplatePayload', template: { __typename: 'MetadataTemplate', id: string, title?: string | null, schema: { __typename?: 'MetadataTemplateSchema', fields: Array<{ __typename?: 'MetadataTemplateSchemaField', id: string, name: string, type: string }> } } } };

export type GetIdeasQueryVariables = Exact<{
  input?: InputMaybe<IdeaSearchInput>;
}>;


export type GetIdeasQuery = { __typename?: 'Query', ideas: Array<{ __typename: 'Idea', id: string, title?: string | null, document?: any | null, metadata: { __typename?: 'IdeaMetadata', groups: Array<{ __typename?: 'MetadataGroup', context: string, template?: { __typename?: 'MetadataTemplate', id: string, title?: string | null } | null, fields: Array<{ __typename?: 'MetadataGroupFieldEntry', id: string, value?: string | null, schema: { __typename?: 'MetadataGroupFieldSchema', id: string, name: string, type: string } }> }> } }> };

export type GetMetadataTemplatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMetadataTemplatesQuery = { __typename?: 'Query', metadataTemplates: Array<{ __typename: 'MetadataTemplate', id: string, title?: string | null, schema: { __typename?: 'MetadataTemplateSchema', fields: Array<{ __typename?: 'MetadataTemplateSchemaField', id: string, name: string, type: string }> } }> };

export type GetNodeQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetNodeQuery = { __typename?: 'Query', node?: { __typename: 'Idea', id: string, title?: string | null, document?: any | null, metadata: { __typename?: 'IdeaMetadata', groups: Array<{ __typename?: 'MetadataGroup', context: string, template?: { __typename?: 'MetadataTemplate', id: string, title?: string | null } | null, fields: Array<{ __typename?: 'MetadataGroupFieldEntry', id: string, value?: string | null, schema: { __typename?: 'MetadataGroupFieldSchema', id: string, name: string, type: string } }> }> } } | { __typename: 'MetadataTemplate', id: string, title?: string | null, schema: { __typename?: 'MetadataTemplateSchema', fields: Array<{ __typename?: 'MetadataTemplateSchemaField', id: string, name: string, type: string }> } } | null };

export const AppIdeaMetadataFieldFragmentDoc = gql`
    fragment AppIdeaMetadataField on MetadataGroupFieldEntry {
  id
  schema {
    id
    name
    type
  }
  value
}
    `;
export const AppIdeaMetadataGroupFragmentDoc = gql`
    fragment AppIdeaMetadataGroup on MetadataGroup {
  context
  template {
    id
    title
  }
  fields {
    id
    schema {
      id
      name
      type
    }
    value
  }
}
    `;
export const AppIdeaFragmentDoc = gql`
    fragment AppIdea on Idea {
  id
  title
  document
  metadata {
    groups {
      ...AppIdeaMetadataGroup
    }
  }
  __typename
}
    ${AppIdeaMetadataGroupFragmentDoc}`;
export const AppMetadataTemplateSchemaFieldFragmentDoc = gql`
    fragment AppMetadataTemplateSchemaField on MetadataTemplateSchemaField {
  id
  name
  type
}
    `;
export const AppMetadataTemplateFragmentDoc = gql`
    fragment AppMetadataTemplate on MetadataTemplate {
  id
  title
  schema {
    fields {
      id
      name
      type
    }
  }
  __typename
}
    `;
export const AddIdeaMetadataFieldDocument = gql`
    mutation addIdeaMetadataField($input: AddIdeaMetadataFieldInput!) {
  addIdeaMetadataField(input: $input) {
    field {
      ...AppIdeaMetadataField
    }
  }
}
    ${AppIdeaMetadataFieldFragmentDoc}`;

export function useAddIdeaMetadataFieldMutation() {
  return Urql.useMutation<AddIdeaMetadataFieldMutation, AddIdeaMetadataFieldMutationVariables>(AddIdeaMetadataFieldDocument);
};
export const AddMetadataTemplateFieldDocument = gql`
    mutation addMetadataTemplateField($input: AddMetadataTemplateFieldInput!) {
  addMetadataTemplateField(input: $input) {
    field {
      ...AppMetadataTemplateSchemaField
    }
  }
}
    ${AppMetadataTemplateSchemaFieldFragmentDoc}`;

export function useAddMetadataTemplateFieldMutation() {
  return Urql.useMutation<AddMetadataTemplateFieldMutation, AddMetadataTemplateFieldMutationVariables>(AddMetadataTemplateFieldDocument);
};
export const CreateIdeaDocument = gql`
    mutation createIdea($input: CreateIdeaInput) {
  createIdea(input: $input) {
    idea {
      ...AppIdea
    }
  }
}
    ${AppIdeaFragmentDoc}`;

export function useCreateIdeaMutation() {
  return Urql.useMutation<CreateIdeaMutation, CreateIdeaMutationVariables>(CreateIdeaDocument);
};
export const CreateMetadataTemplateDocument = gql`
    mutation createMetadataTemplate {
  createMetadataTemplate {
    template {
      ...AppMetadataTemplate
    }
  }
}
    ${AppMetadataTemplateFragmentDoc}`;

export function useCreateMetadataTemplateMutation() {
  return Urql.useMutation<CreateMetadataTemplateMutation, CreateMetadataTemplateMutationVariables>(CreateMetadataTemplateDocument);
};
export const DeleteIdeaDocument = gql`
    mutation deleteIdea($input: DeleteIdeaInput!) {
  deleteIdea(input: $input) {
    clientMutationId
  }
}
    `;

export function useDeleteIdeaMutation() {
  return Urql.useMutation<DeleteIdeaMutation, DeleteIdeaMutationVariables>(DeleteIdeaDocument);
};
export const DeleteIdeaMetadataFieldDocument = gql`
    mutation deleteIdeaMetadataField($input: DeleteIdeaMetadataFieldInput!) {
  deleteIdeaMetadataField(input: $input) {
    clientMutationId
  }
}
    `;

export function useDeleteIdeaMetadataFieldMutation() {
  return Urql.useMutation<DeleteIdeaMetadataFieldMutation, DeleteIdeaMetadataFieldMutationVariables>(DeleteIdeaMetadataFieldDocument);
};
export const DeleteMetadataTemplateDocument = gql`
    mutation deleteMetadataTemplate($input: DeleteMetadataTemplateInput!) {
  deleteMetadataTemplate(input: $input) {
    clientMutationId
  }
}
    `;

export function useDeleteMetadataTemplateMutation() {
  return Urql.useMutation<DeleteMetadataTemplateMutation, DeleteMetadataTemplateMutationVariables>(DeleteMetadataTemplateDocument);
};
export const UpdateIdeaDocument = gql`
    mutation updateIdea($input: UpdateIdeaInput!) {
  updateIdea(input: $input) {
    idea {
      ...AppIdea
    }
  }
}
    ${AppIdeaFragmentDoc}`;

export function useUpdateIdeaMutation() {
  return Urql.useMutation<UpdateIdeaMutation, UpdateIdeaMutationVariables>(UpdateIdeaDocument);
};
export const UpdateIdeaMetadataFieldDocument = gql`
    mutation updateIdeaMetadataField($input: UpdateIdeaMetadataFieldInput!) {
  updateIdeaMetadataField(input: $input) {
    field {
      ...AppIdeaMetadataField
    }
  }
}
    ${AppIdeaMetadataFieldFragmentDoc}`;

export function useUpdateIdeaMetadataFieldMutation() {
  return Urql.useMutation<UpdateIdeaMetadataFieldMutation, UpdateIdeaMetadataFieldMutationVariables>(UpdateIdeaMetadataFieldDocument);
};
export const UpdateMetadataTemplateFieldDocument = gql`
    mutation updateMetadataTemplateField($input: UpdateMetadataTemplateFieldInput!) {
  updateMetadataTemplateField(input: $input) {
    field {
      ...AppMetadataTemplateSchemaField
    }
  }
}
    ${AppMetadataTemplateSchemaFieldFragmentDoc}`;

export function useUpdateMetadataTemplateFieldMutation() {
  return Urql.useMutation<UpdateMetadataTemplateFieldMutation, UpdateMetadataTemplateFieldMutationVariables>(UpdateMetadataTemplateFieldDocument);
};
export const UpdateMetadataTemplateDocument = gql`
    mutation updateMetadataTemplate($input: UpdateMetadataTemplateInput!) {
  updateMetadataTemplate(input: $input) {
    template {
      ...AppMetadataTemplate
    }
  }
}
    ${AppMetadataTemplateFragmentDoc}`;

export function useUpdateMetadataTemplateMutation() {
  return Urql.useMutation<UpdateMetadataTemplateMutation, UpdateMetadataTemplateMutationVariables>(UpdateMetadataTemplateDocument);
};
export const GetIdeasDocument = gql`
    query getIdeas($input: IdeaSearchInput) {
  ideas(input: $input) {
    ...AppIdea
  }
}
    ${AppIdeaFragmentDoc}`;

export function useGetIdeasQuery(options?: Omit<Urql.UseQueryArgs<GetIdeasQueryVariables>, 'query'>) {
  return Urql.useQuery<GetIdeasQuery, GetIdeasQueryVariables>({ query: GetIdeasDocument, ...options });
};
export const GetMetadataTemplatesDocument = gql`
    query getMetadataTemplates {
  metadataTemplates {
    ...AppMetadataTemplate
  }
}
    ${AppMetadataTemplateFragmentDoc}`;

export function useGetMetadataTemplatesQuery(options?: Omit<Urql.UseQueryArgs<GetMetadataTemplatesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetMetadataTemplatesQuery, GetMetadataTemplatesQueryVariables>({ query: GetMetadataTemplatesDocument, ...options });
};
export const GetNodeDocument = gql`
    query getNode($id: ID!) {
  node(id: $id) {
    ... on Idea {
      ...AppIdea
    }
    ... on MetadataTemplate {
      ...AppMetadataTemplate
    }
  }
}
    ${AppIdeaFragmentDoc}
${AppMetadataTemplateFragmentDoc}`;

export function useGetNodeQuery(options: Omit<Urql.UseQueryArgs<GetNodeQueryVariables>, 'query'>) {
  return Urql.useQuery<GetNodeQuery, GetNodeQueryVariables>({ query: GetNodeDocument, ...options });
};