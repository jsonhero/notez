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
  fromReferences: Array<IdeaReference>;
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
  reference?: Maybe<IdeaReference>;
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

export type MetadataSchemaExtraInput = {
  referenceInput?: InputMaybe<SchemaExtraReferenceInput>;
};

export type MetadataTemplate = Node & {
  __typename?: 'MetadataTemplate';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  schema: MetadataTemplateSchema;
  title?: Maybe<Scalars['String']>;
  unicodeIcon?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type MetadataTemplateInput = {
  title?: InputMaybe<Scalars['String']>;
  unicodeIcon?: InputMaybe<Scalars['String']>;
};

export type MetadataTemplateSchema = {
  __typename?: 'MetadataTemplateSchema';
  fields: Array<MetadataTemplateSchemaField>;
};

export type MetadataTemplateSchemaField = {
  __typename?: 'MetadataTemplateSchemaField';
  extra?: Maybe<SchemaExtraUnion>;
  id: Scalars['ID'];
  name: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type MetadataTemplateSchemaFieldInput = {
  extra?: InputMaybe<MetadataSchemaExtraInput>;
  name: Scalars['String'];
  type: Scalars['String'];
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

export type SchemaExtraReference = {
  __typename?: 'SchemaExtraReference';
  metadataTemplates: Array<MetadataTemplate>;
};

export type SchemaExtraReferenceInput = {
  metadataTemplateIds: Array<Scalars['ID']>;
};

export type SchemaExtraUnion = SchemaExtraReference;

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
  field: MetadataTemplateSchemaFieldInput;
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

export type AppIdeaMetadataFieldFragment = { __typename?: 'MetadataGroupFieldEntry', id: string, schema: { __typename?: 'MetadataTemplateSchemaField', id: string, name: string, type: string, updatedAt: any }, value?: { __typename: 'MetadataFieldDateValue', date: any, type: string, updatedAt: any } | { __typename: 'MetadataFieldNumberValue', number: number, type: string, updatedAt: any } | { __typename: 'MetadataFieldReferenceValue', type: string, updatedAt: any, reference?: { __typename?: 'IdeaReference', id: string, type: string, fieldId: string, toIdea: { __typename?: 'Idea', id: string, title?: string | null } } | null } | { __typename: 'MetadataFieldTextValue', text: string, type: string, updatedAt: any } | null };

export type AppIdeaReferenceFragment = { __typename?: 'IdeaReference', id: string, type: string, fieldId: string, toIdea: { __typename?: 'Idea', id: string, title?: string | null } };

export type AppIdeaFragment = { __typename: 'Idea', id: string, title?: string | null, document?: any | null, createdAt: any, updatedAt: any, metadata: { __typename?: 'IdeaMetadata', groups: Array<{ __typename?: 'MetadataGroup', context: string, template?: { __typename?: 'MetadataTemplate', id: string, title?: string | null, unicodeIcon?: string | null } | null, fields: Array<{ __typename?: 'MetadataGroupFieldEntry', id: string, schema: { __typename?: 'MetadataTemplateSchemaField', id: string, name: string, type: string, updatedAt: any }, value?: { __typename: 'MetadataFieldDateValue', date: any, type: string, updatedAt: any } | { __typename: 'MetadataFieldNumberValue', number: number, type: string, updatedAt: any } | { __typename: 'MetadataFieldReferenceValue', type: string, updatedAt: any, reference?: { __typename?: 'IdeaReference', id: string, type: string, fieldId: string, toIdea: { __typename?: 'Idea', id: string, title?: string | null } } | null } | { __typename: 'MetadataFieldTextValue', text: string, type: string, updatedAt: any } | null }> }> }, toReferences: Array<{ __typename?: 'IdeaReference', id: string, type: string, fieldId: string, toIdea: { __typename?: 'Idea', id: string, title?: string | null } }>, fromReferences: Array<{ __typename?: 'IdeaReference', id: string, type: string, fieldId: string, toIdea: { __typename?: 'Idea', id: string, title?: string | null } }> };

export type AppIdeaMetadataGroupFragment = { __typename?: 'MetadataGroup', context: string, template?: { __typename?: 'MetadataTemplate', id: string, title?: string | null, unicodeIcon?: string | null } | null, fields: Array<{ __typename?: 'MetadataGroupFieldEntry', id: string, schema: { __typename?: 'MetadataTemplateSchemaField', id: string, name: string, type: string, updatedAt: any }, value?: { __typename: 'MetadataFieldDateValue', date: any, type: string, updatedAt: any } | { __typename: 'MetadataFieldNumberValue', number: number, type: string, updatedAt: any } | { __typename: 'MetadataFieldReferenceValue', type: string, updatedAt: any, reference?: { __typename?: 'IdeaReference', id: string, type: string, fieldId: string, toIdea: { __typename?: 'Idea', id: string, title?: string | null } } | null } | { __typename: 'MetadataFieldTextValue', text: string, type: string, updatedAt: any } | null }> };

export type AppMetadataTemplateSchemaFieldFragment = { __typename?: 'MetadataTemplateSchemaField', id: string, name: string, type: string, updatedAt: any };

export type AppMetadataTemplateFragment = { __typename: 'MetadataTemplate', id: string, title?: string | null, unicodeIcon?: string | null, schema: { __typename?: 'MetadataTemplateSchema', fields: Array<{ __typename?: 'MetadataTemplateSchemaField', id: string, name: string, type: string, updatedAt: any }> } };

export type AddIdeaMetadataFieldMutationVariables = Exact<{
  input: AddIdeaMetadataFieldInput;
}>;


export type AddIdeaMetadataFieldMutation = { __typename?: 'Mutation', addIdeaMetadataField: { __typename?: 'AddIdeaMetadataFieldPayload', field: { __typename?: 'MetadataGroupFieldEntry', id: string, schema: { __typename?: 'MetadataTemplateSchemaField', id: string, name: string, type: string, updatedAt: any }, value?: { __typename: 'MetadataFieldDateValue', date: any, type: string, updatedAt: any } | { __typename: 'MetadataFieldNumberValue', number: number, type: string, updatedAt: any } | { __typename: 'MetadataFieldReferenceValue', type: string, updatedAt: any, reference?: { __typename?: 'IdeaReference', id: string, type: string, fieldId: string, toIdea: { __typename?: 'Idea', id: string, title?: string | null } } | null } | { __typename: 'MetadataFieldTextValue', text: string, type: string, updatedAt: any } | null } } };

export type AddIdeaMetadataTemplateMutationVariables = Exact<{
  input: AddIdeaMetadataTemplateInput;
}>;


export type AddIdeaMetadataTemplateMutation = { __typename?: 'Mutation', addIdeaMetadataTemplate: { __typename?: 'AddIdeaMetadataTemplatePayload', idea: { __typename: 'Idea', id: string, title?: string | null, document?: any | null, createdAt: any, updatedAt: any, metadata: { __typename?: 'IdeaMetadata', groups: Array<{ __typename?: 'MetadataGroup', context: string, template?: { __typename?: 'MetadataTemplate', id: string, title?: string | null, unicodeIcon?: string | null } | null, fields: Array<{ __typename?: 'MetadataGroupFieldEntry', id: string, schema: { __typename?: 'MetadataTemplateSchemaField', id: string, name: string, type: string, updatedAt: any }, value?: { __typename: 'MetadataFieldDateValue', date: any, type: string, updatedAt: any } | { __typename: 'MetadataFieldNumberValue', number: number, type: string, updatedAt: any } | { __typename: 'MetadataFieldReferenceValue', type: string, updatedAt: any, reference?: { __typename?: 'IdeaReference', id: string, type: string, fieldId: string, toIdea: { __typename?: 'Idea', id: string, title?: string | null } } | null } | { __typename: 'MetadataFieldTextValue', text: string, type: string, updatedAt: any } | null }> }> }, toReferences: Array<{ __typename?: 'IdeaReference', id: string, type: string, fieldId: string, toIdea: { __typename?: 'Idea', id: string, title?: string | null } }>, fromReferences: Array<{ __typename?: 'IdeaReference', id: string, type: string, fieldId: string, toIdea: { __typename?: 'Idea', id: string, title?: string | null } }> } } };

export type AddMetadataTemplateFieldMutationVariables = Exact<{
  input: AddMetadataTemplateFieldInput;
}>;


export type AddMetadataTemplateFieldMutation = { __typename?: 'Mutation', addMetadataTemplateField: { __typename?: 'AddMetadataTemplateFieldPayload', field: { __typename?: 'MetadataTemplateSchemaField', id: string, name: string, type: string, updatedAt: any } } };

export type CreateIdeaMutationVariables = Exact<{
  input?: InputMaybe<CreateIdeaInput>;
}>;


export type CreateIdeaMutation = { __typename?: 'Mutation', createIdea: { __typename?: 'CreateIdeaPayload', idea: { __typename: 'Idea', id: string, title?: string | null, document?: any | null, createdAt: any, updatedAt: any, metadata: { __typename?: 'IdeaMetadata', groups: Array<{ __typename?: 'MetadataGroup', context: string, template?: { __typename?: 'MetadataTemplate', id: string, title?: string | null, unicodeIcon?: string | null } | null, fields: Array<{ __typename?: 'MetadataGroupFieldEntry', id: string, schema: { __typename?: 'MetadataTemplateSchemaField', id: string, name: string, type: string, updatedAt: any }, value?: { __typename: 'MetadataFieldDateValue', date: any, type: string, updatedAt: any } | { __typename: 'MetadataFieldNumberValue', number: number, type: string, updatedAt: any } | { __typename: 'MetadataFieldReferenceValue', type: string, updatedAt: any, reference?: { __typename?: 'IdeaReference', id: string, type: string, fieldId: string, toIdea: { __typename?: 'Idea', id: string, title?: string | null } } | null } | { __typename: 'MetadataFieldTextValue', text: string, type: string, updatedAt: any } | null }> }> }, toReferences: Array<{ __typename?: 'IdeaReference', id: string, type: string, fieldId: string, toIdea: { __typename?: 'Idea', id: string, title?: string | null } }>, fromReferences: Array<{ __typename?: 'IdeaReference', id: string, type: string, fieldId: string, toIdea: { __typename?: 'Idea', id: string, title?: string | null } }> } } };

export type CreateMetadataTemplateMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateMetadataTemplateMutation = { __typename?: 'Mutation', createMetadataTemplate: { __typename?: 'CreateMetadataTemplatePayload', template: { __typename: 'MetadataTemplate', id: string, title?: string | null, unicodeIcon?: string | null, schema: { __typename?: 'MetadataTemplateSchema', fields: Array<{ __typename?: 'MetadataTemplateSchemaField', id: string, name: string, type: string, updatedAt: any }> } } } };

export type DeleteIdeaMetadataTemplateMutationVariables = Exact<{
  input: DeleteIdeaMetadataTemplateInput;
}>;


export type DeleteIdeaMetadataTemplateMutation = { __typename?: 'Mutation', deleteIdeaMetadataTemplate: { __typename?: 'DeleteIdeaMetadataTemplatePayload', idea: { __typename: 'Idea', id: string, title?: string | null, document?: any | null, createdAt: any, updatedAt: any, metadata: { __typename?: 'IdeaMetadata', groups: Array<{ __typename?: 'MetadataGroup', context: string, template?: { __typename?: 'MetadataTemplate', id: string, title?: string | null, unicodeIcon?: string | null } | null, fields: Array<{ __typename?: 'MetadataGroupFieldEntry', id: string, schema: { __typename?: 'MetadataTemplateSchemaField', id: string, name: string, type: string, updatedAt: any }, value?: { __typename: 'MetadataFieldDateValue', date: any, type: string, updatedAt: any } | { __typename: 'MetadataFieldNumberValue', number: number, type: string, updatedAt: any } | { __typename: 'MetadataFieldReferenceValue', type: string, updatedAt: any, reference?: { __typename?: 'IdeaReference', id: string, type: string, fieldId: string, toIdea: { __typename?: 'Idea', id: string, title?: string | null } } | null } | { __typename: 'MetadataFieldTextValue', text: string, type: string, updatedAt: any } | null }> }> }, toReferences: Array<{ __typename?: 'IdeaReference', id: string, type: string, fieldId: string, toIdea: { __typename?: 'Idea', id: string, title?: string | null } }>, fromReferences: Array<{ __typename?: 'IdeaReference', id: string, type: string, fieldId: string, toIdea: { __typename?: 'Idea', id: string, title?: string | null } }> } } };

export type DeleteIdeaMutationVariables = Exact<{
  input: DeleteIdeaInput;
}>;


export type DeleteIdeaMutation = { __typename?: 'Mutation', deleteIdea: { __typename?: 'DeleteIdeaPayload', clientMutationId?: string | null } };

export type DeleteIdeaMetadataFieldMutationVariables = Exact<{
  input: DeleteIdeaMetadataFieldInput;
}>;


export type DeleteIdeaMetadataFieldMutation = { __typename?: 'Mutation', deleteIdeaMetadataField: { __typename?: 'DeleteIdeaMetadataFieldPayload', clientMutationId?: string | null } };

export type DeleteMetadataTemplateFieldMutationVariables = Exact<{
  input: DeleteMetadataTemplateFieldInput;
}>;


export type DeleteMetadataTemplateFieldMutation = { __typename?: 'Mutation', deleteMetadataTemplateField: { __typename?: 'DeleteMetadataTemplateFieldPayload', clientMutationId?: string | null } };

export type DeleteMetadataTemplateMutationVariables = Exact<{
  input: DeleteMetadataTemplateInput;
}>;


export type DeleteMetadataTemplateMutation = { __typename?: 'Mutation', deleteMetadataTemplate: { __typename?: 'DeleteMetadataTemplatePayload', clientMutationId?: string | null } };

export type UpdateIdeaMutationVariables = Exact<{
  input: UpdateIdeaInput;
}>;


export type UpdateIdeaMutation = { __typename?: 'Mutation', updateIdea: { __typename?: 'UpdateIdeaPayload', idea: { __typename: 'Idea', id: string, title?: string | null, document?: any | null, createdAt: any, updatedAt: any, metadata: { __typename?: 'IdeaMetadata', groups: Array<{ __typename?: 'MetadataGroup', context: string, template?: { __typename?: 'MetadataTemplate', id: string, title?: string | null, unicodeIcon?: string | null } | null, fields: Array<{ __typename?: 'MetadataGroupFieldEntry', id: string, schema: { __typename?: 'MetadataTemplateSchemaField', id: string, name: string, type: string, updatedAt: any }, value?: { __typename: 'MetadataFieldDateValue', date: any, type: string, updatedAt: any } | { __typename: 'MetadataFieldNumberValue', number: number, type: string, updatedAt: any } | { __typename: 'MetadataFieldReferenceValue', type: string, updatedAt: any, reference?: { __typename?: 'IdeaReference', id: string, type: string, fieldId: string, toIdea: { __typename?: 'Idea', id: string, title?: string | null } } | null } | { __typename: 'MetadataFieldTextValue', text: string, type: string, updatedAt: any } | null }> }> }, toReferences: Array<{ __typename?: 'IdeaReference', id: string, type: string, fieldId: string, toIdea: { __typename?: 'Idea', id: string, title?: string | null } }>, fromReferences: Array<{ __typename?: 'IdeaReference', id: string, type: string, fieldId: string, toIdea: { __typename?: 'Idea', id: string, title?: string | null } }> } } };

export type UpdateIdeaMetadataFieldMutationVariables = Exact<{
  input: UpdateIdeaMetadataFieldInput;
}>;


export type UpdateIdeaMetadataFieldMutation = { __typename?: 'Mutation', updateIdeaMetadataField: { __typename?: 'UpdateIdeaMetadataFieldPayload', field: { __typename?: 'MetadataGroupFieldEntry', id: string, schema: { __typename?: 'MetadataTemplateSchemaField', id: string, name: string, type: string, updatedAt: any }, value?: { __typename: 'MetadataFieldDateValue', date: any, type: string, updatedAt: any } | { __typename: 'MetadataFieldNumberValue', number: number, type: string, updatedAt: any } | { __typename: 'MetadataFieldReferenceValue', type: string, updatedAt: any, reference?: { __typename?: 'IdeaReference', id: string, type: string, fieldId: string, toIdea: { __typename?: 'Idea', id: string, title?: string | null } } | null } | { __typename: 'MetadataFieldTextValue', text: string, type: string, updatedAt: any } | null } } };

export type UpdateMetadataTemplateFieldMutationVariables = Exact<{
  input: UpdateMetadataTemplateFieldInput;
}>;


export type UpdateMetadataTemplateFieldMutation = { __typename?: 'Mutation', updateMetadataTemplateField: { __typename?: 'UpdateMetadataTemplateFieldPayload', field: { __typename?: 'MetadataTemplateSchemaField', id: string, name: string, type: string, updatedAt: any } } };

export type UpdateMetadataTemplateMutationVariables = Exact<{
  input: UpdateMetadataTemplateInput;
}>;


export type UpdateMetadataTemplateMutation = { __typename?: 'Mutation', updateMetadataTemplate: { __typename?: 'UpdateMetadataTemplatePayload', template: { __typename: 'MetadataTemplate', id: string, title?: string | null, unicodeIcon?: string | null, schema: { __typename?: 'MetadataTemplateSchema', fields: Array<{ __typename?: 'MetadataTemplateSchemaField', id: string, name: string, type: string, updatedAt: any }> } } } };

export type GetIdeasQueryVariables = Exact<{
  input?: InputMaybe<IdeaSearchInput>;
}>;


export type GetIdeasQuery = { __typename?: 'Query', ideas: Array<{ __typename: 'Idea', id: string, title?: string | null, document?: any | null, createdAt: any, updatedAt: any, metadata: { __typename?: 'IdeaMetadata', groups: Array<{ __typename?: 'MetadataGroup', context: string, template?: { __typename?: 'MetadataTemplate', id: string, title?: string | null, unicodeIcon?: string | null } | null, fields: Array<{ __typename?: 'MetadataGroupFieldEntry', id: string, schema: { __typename?: 'MetadataTemplateSchemaField', id: string, name: string, type: string, updatedAt: any }, value?: { __typename: 'MetadataFieldDateValue', date: any, type: string, updatedAt: any } | { __typename: 'MetadataFieldNumberValue', number: number, type: string, updatedAt: any } | { __typename: 'MetadataFieldReferenceValue', type: string, updatedAt: any, reference?: { __typename?: 'IdeaReference', id: string, type: string, fieldId: string, toIdea: { __typename?: 'Idea', id: string, title?: string | null } } | null } | { __typename: 'MetadataFieldTextValue', text: string, type: string, updatedAt: any } | null }> }> }, toReferences: Array<{ __typename?: 'IdeaReference', id: string, type: string, fieldId: string, toIdea: { __typename?: 'Idea', id: string, title?: string | null } }>, fromReferences: Array<{ __typename?: 'IdeaReference', id: string, type: string, fieldId: string, toIdea: { __typename?: 'Idea', id: string, title?: string | null } }> }> };

export type GetMetadataTemplatesQueryVariables = Exact<{
  input?: InputMaybe<MetadataTemplateSearchInput>;
}>;


export type GetMetadataTemplatesQuery = { __typename?: 'Query', metadataTemplates: Array<{ __typename: 'MetadataTemplate', id: string, title?: string | null, unicodeIcon?: string | null, schema: { __typename?: 'MetadataTemplateSchema', fields: Array<{ __typename?: 'MetadataTemplateSchemaField', id: string, name: string, type: string, updatedAt: any }> } }> };

export type GetNodeQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetNodeQuery = { __typename?: 'Query', node?: { __typename: 'Idea', id: string, title?: string | null, document?: any | null, createdAt: any, updatedAt: any, metadata: { __typename?: 'IdeaMetadata', groups: Array<{ __typename?: 'MetadataGroup', context: string, template?: { __typename?: 'MetadataTemplate', id: string, title?: string | null, unicodeIcon?: string | null } | null, fields: Array<{ __typename?: 'MetadataGroupFieldEntry', id: string, schema: { __typename?: 'MetadataTemplateSchemaField', id: string, name: string, type: string, updatedAt: any }, value?: { __typename: 'MetadataFieldDateValue', date: any, type: string, updatedAt: any } | { __typename: 'MetadataFieldNumberValue', number: number, type: string, updatedAt: any } | { __typename: 'MetadataFieldReferenceValue', type: string, updatedAt: any, reference?: { __typename?: 'IdeaReference', id: string, type: string, fieldId: string, toIdea: { __typename?: 'Idea', id: string, title?: string | null } } | null } | { __typename: 'MetadataFieldTextValue', text: string, type: string, updatedAt: any } | null }> }> }, toReferences: Array<{ __typename?: 'IdeaReference', id: string, type: string, fieldId: string, toIdea: { __typename?: 'Idea', id: string, title?: string | null } }>, fromReferences: Array<{ __typename?: 'IdeaReference', id: string, type: string, fieldId: string, toIdea: { __typename?: 'Idea', id: string, title?: string | null } }> } | { __typename: 'MetadataTemplate', id: string, title?: string | null, unicodeIcon?: string | null, schema: { __typename?: 'MetadataTemplateSchema', fields: Array<{ __typename?: 'MetadataTemplateSchemaField', id: string, name: string, type: string, updatedAt: any }> } } | null };

export const AppIdeaReferenceFragmentDoc = gql`
    fragment AppIdeaReference on IdeaReference {
  id
  toIdea {
    id
    title
  }
  type
  fieldId
}
    `;
export const AppIdeaMetadataFieldFragmentDoc = gql`
    fragment AppIdeaMetadataField on MetadataGroupFieldEntry {
  id
  schema {
    id
    name
    type
    updatedAt
  }
  value {
    __typename
    ... on MetadataFieldTextValue {
      text
      type
      updatedAt
    }
    ... on MetadataFieldNumberValue {
      number
      type
      updatedAt
    }
    ... on MetadataFieldDateValue {
      date
      type
      updatedAt
    }
    ... on MetadataFieldReferenceValue {
      reference {
        ...AppIdeaReference
      }
      type
      updatedAt
    }
  }
}
    ${AppIdeaReferenceFragmentDoc}`;
export const AppIdeaMetadataGroupFragmentDoc = gql`
    fragment AppIdeaMetadataGroup on MetadataGroup {
  context
  template {
    id
    title
    unicodeIcon
  }
  fields {
    ...AppIdeaMetadataField
  }
}
    ${AppIdeaMetadataFieldFragmentDoc}`;
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
  toReferences {
    ...AppIdeaReference
  }
  fromReferences {
    ...AppIdeaReference
  }
  createdAt
  updatedAt
  __typename
}
    ${AppIdeaMetadataGroupFragmentDoc}
${AppIdeaReferenceFragmentDoc}`;
export const AppMetadataTemplateSchemaFieldFragmentDoc = gql`
    fragment AppMetadataTemplateSchemaField on MetadataTemplateSchemaField {
  id
  name
  type
  updatedAt
}
    `;
export const AppMetadataTemplateFragmentDoc = gql`
    fragment AppMetadataTemplate on MetadataTemplate {
  id
  title
  unicodeIcon
  schema {
    fields {
      ...AppMetadataTemplateSchemaField
    }
  }
  __typename
}
    ${AppMetadataTemplateSchemaFieldFragmentDoc}`;
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
export const AddIdeaMetadataTemplateDocument = gql`
    mutation addIdeaMetadataTemplate($input: AddIdeaMetadataTemplateInput!) {
  addIdeaMetadataTemplate(input: $input) {
    idea {
      ...AppIdea
    }
  }
}
    ${AppIdeaFragmentDoc}`;

export function useAddIdeaMetadataTemplateMutation() {
  return Urql.useMutation<AddIdeaMetadataTemplateMutation, AddIdeaMetadataTemplateMutationVariables>(AddIdeaMetadataTemplateDocument);
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
export const DeleteIdeaMetadataTemplateDocument = gql`
    mutation deleteIdeaMetadataTemplate($input: DeleteIdeaMetadataTemplateInput!) {
  deleteIdeaMetadataTemplate(input: $input) {
    idea {
      ...AppIdea
    }
  }
}
    ${AppIdeaFragmentDoc}`;

export function useDeleteIdeaMetadataTemplateMutation() {
  return Urql.useMutation<DeleteIdeaMetadataTemplateMutation, DeleteIdeaMetadataTemplateMutationVariables>(DeleteIdeaMetadataTemplateDocument);
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
export const DeleteMetadataTemplateFieldDocument = gql`
    mutation deleteMetadataTemplateField($input: DeleteMetadataTemplateFieldInput!) {
  deleteMetadataTemplateField(input: $input) {
    clientMutationId
  }
}
    `;

export function useDeleteMetadataTemplateFieldMutation() {
  return Urql.useMutation<DeleteMetadataTemplateFieldMutation, DeleteMetadataTemplateFieldMutationVariables>(DeleteMetadataTemplateFieldDocument);
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
    query getMetadataTemplates($input: MetadataTemplateSearchInput) {
  metadataTemplates(input: $input) {
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