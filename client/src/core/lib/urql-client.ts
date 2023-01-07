import { createClient, dedupExchange, fetchExchange } from 'urql';
import { offlineExchange, cacheExchange } from '@urql/exchange-graphcache';
import { makeDefaultStorage } from '@urql/exchange-graphcache/default-storage';
import { IntrospectionQuery } from 'graphql'
import { devtoolsExchange } from '@urql/devtools';
import { nanoid } from 'nanoid';

import { GraphCacheConfig } from '@gql/graphql'
import { fromGlobalId, toGlobalId } from '@lib/graph-utils'
import { 
  GetNodeDocument, 
  GetNodeQuery, 
  GetNodeQueryVariables, 
  GetIdeasQuery, 
  GetIdeasDocument, 
  GetMetadataTemplatesQuery, 
  GetMetadataTemplatesDocument, 
  GetIdeasQueryVariables 
} from '@gql/operations'
import introspectedSchema from '../../../graphql.schema.json'

function _generateFieldId(): string {
  return 'client_f_' + nanoid(10);
}

// ??: Why the fuck does it read from the storage first, and then the local cache when using this... causes needless renders
// TODO: Broadcast/sync between tabs
// Need to wait for INDEXDB to fully load.
// const storage = makeDefaultStorage({
//   idbName: 'graphcache-v3', // The name of the IndexedDB database
//   maxAge: 7, // The maximum age of the persisted data in days
// });

// https://github.com/urql-graphql/urql/issues/901
const cache = cacheExchange<GraphCacheConfig>({
  schema: (introspectedSchema as unknown) as IntrospectionQuery,
  // storage,
  resolvers: {
    Query: {
      // @ts-ignore
      node: (parent, args, cache, info) => {
        const resolvedGlobalId = fromGlobalId(args.id);      

        return { __typename: resolvedGlobalId.type, id: args.id }
      },
    },
  },
  optimistic: {
    deleteIdea: (vars, cache, info) => {
      return {
        __typename: 'DeleteIdeaPayload',
        clientMutationId: '123',
      }
    },
    createIdea: (args, cache, info) => {
      let groups = []

      // if (args.input?.implementedIdeaTableIds.length) {
      //   groups = args.input.implementedIdeaTableIds.length.map()
      // }

      return {
        __typename: 'CreateIdeaPayload',
        idea: {
          __typename: 'Idea',
          id: toGlobalId('Idea', nanoid(10)),
          title: null,
          document: null,
          metadata: {
            __typename: 'IdeaMetadata',
            groups: [],
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      }
    },
    addIdeaMetadataField: (vars, cache, info) => {
      return {
        __typename: 'AddIdeaMetadataFieldPayload',
        field: {
          id: _generateFieldId(),
          __typename: 'MetadataGroupFieldEntry',
          schema: {
            __typename: 'MetadataGroupFieldSchema',
            id: _generateFieldId(),
            name: '',
            type: 'text',
          },
          value: '',
        }
      }
    },
  },
  updates: {
    Mutation: {
      createIdea: (result, args, cache, info) => {
        cache.updateQuery<GetIdeasQuery>({ query: GetIdeasDocument }, (data) => {
          if (result.createIdea.idea) {
            data?.ideas.unshift(result.createIdea.idea)
          }
          return data
        })

        // TODO: Rework this so it's more efficient
        if (args.input?.metadataTemplateIds?.length && result.createIdea.idea?.metadata.groups.length) {
          args.input.metadataTemplateIds.forEach((metadataTemplateId) => {
            cache.updateQuery<GetIdeasQuery, GetIdeasQueryVariables>({ query: GetIdeasDocument, variables: { input: { metadataTemplateIds: [metadataTemplateId] }}}, (data) => {
              if (result.createIdea.idea) {
                data?.ideas.push(result.createIdea.idea)
              }
              return data
            })
          })
        }
      },
      addIdeaMetadataField: (result, args, cache, info) => {
        cache.updateQuery<GetNodeQuery, GetNodeQueryVariables>({ query: GetNodeDocument, variables: {
          id: args.input.ideaId,
        } }, (data) => {
          if (data?.node?.__typename === 'Idea') {
            const localGroup = data?.node?.metadata.groups.find((group) => group.context === 'local')

            if (result.addIdeaMetadataField.field) {
              if (localGroup) {
                localGroup.fields.push(result.addIdeaMetadataField.field)
              } else {
                data.node.metadata.groups.push({
                  context: 'local',
                  fields: [result.addIdeaMetadataField.field]
                })
              }
            }
          }

          return data;
        })
      },
      deleteIdeaMetadataField: (result, args, cache, info) => {
        cache.invalidate({ __typename: 'MetadataGroupFieldEntry', id: args.input.fieldId })
        // 
        //  cache.updateQuery<GetIdeaByIdQuery, GetIdeaByIdQueryVariables>({ query: GetIdeaByIdDocument, variables: {
        //    ideaId: args.input.ideaId,
        //  } }, (data) => {
        //   const local = data?.node?.metadata.groups
        //
        //   if (local && result.deleteIdeaMetadataField) {
        //     if (local.length) {
        //       local[0].fields = local[0].fields.filter((field) => field.id !== args.input.fieldId)
        //     }
        //   }
        //   return data;
        // })
      },
      deleteIdea: (result, args, cache, info) => {
        cache.invalidate({ __typename: 'Idea', id: args.input.ideaId })
        // cache.updateQuery<GetIdeasQuery>({ query: GetIdeasDocument }, (data) => {
        //   if (data && result) {
        //     data.ideas = data?.ideas.filter((idea) => idea.id !== args.input.ideaId)
        //   }
        //   return data
        // })
      },
      createMetadataTemplate: (result, args, cache, info) => {
        cache.updateQuery<GetMetadataTemplatesQuery>({ query: GetMetadataTemplatesDocument }, (data) => {
          if (result.createMetadataTemplate.template) {
            data?.metadataTemplates.unshift(result.createMetadataTemplate.template)
          }
          return data
        })
      },
      deleteMetadataTemplate: (result, args, cache, info) => {
        cache.invalidate({ __typename: 'MetadataTemplate', id: args.input.metadataTemplateId })
      },
      addMetadataTemplateField: (result, args, cache, info) => {
        cache.updateQuery<GetNodeQuery, GetNodeQueryVariables>({ query: GetNodeDocument, variables: {
          id: args.input.metadataTemplateId,
        } }, (data) => {
          if (data?.node?.__typename === 'MetadataTemplate') {
            data.node.schema.fields.push(result.addMetadataTemplateField.field)
          }

          return data;
        })
      },
      deleteMetadataTemplateField: (result, args, cache, info) => {
        cache.invalidate({ __typename: 'MetadataTemplateSchemaField', id: args.input.fieldId })
      }
    },
  },
});

export const urqlClient = createClient({
  url: 'http://localhost:3000/graphql',
  exchanges: [devtoolsExchange, cache, fetchExchange],
  requestPolicy: 'cache-and-network',
});

// @ts-ignore
const { unsubscribe } = urqlClient.subscribeToDebugTarget(event => {
  if (event.source === 'dedupExchange')
    return;

  // console.log(event, 'event')
  // console.log(`${event.type} ${event.operation.kind}:${event.operation.key} `); // { type, message, operation, data, source, timestamp }
});
