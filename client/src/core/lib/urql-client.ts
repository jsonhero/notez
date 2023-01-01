import { createClient, dedupExchange, fetchExchange } from 'urql';
import { offlineExchange } from '@urql/exchange-graphcache';
import { makeDefaultStorage } from '@urql/exchange-graphcache/default-storage';
import { IntrospectionQuery } from 'graphql'
import { devtoolsExchange } from '@urql/devtools';
import { nanoid } from 'nanoid';

import { GraphCacheConfig } from '@gql/graphql'
import { GetNoteByIdDocument, GetNoteByIdQuery, GetNotesQuery, GetNotesDocument, GetNoteByIdQueryVariables, GetNoteTablesQuery, GetNoteTablesDocument } from '@gql/operations'
import introspectedSchema from '../../../graphql.schema.json'


function _generateFieldId(): string {
  return 'client_f_' + nanoid(10);
}

// TODO: Broadcast/sync between tabs
// Need to wait for INDEXDB to fully load.
const storage = makeDefaultStorage({
  idbName: 'graphcache-v3', // The name of the IndexedDB database
  maxAge: 7, // The maximum age of the persisted data in days
});

// https://github.com/urql-graphql/urql/issues/901
const cache = offlineExchange<GraphCacheConfig>({
  schema: (introspectedSchema as unknown) as IntrospectionQuery,
  storage,
  resolvers: {
    Query: {
      node: (_, args) => ({ __typename: 'Note', id: args.id }),
    },
  },
  optimistic: {
    deleteNote: (vars, cache, info) => {
      return {
        __typename: 'DeleteNotePayload',
        clientMutationId: '123',
      }
    },
    createNote: (vars, cache, info) => {
      return {
        __typename: 'CreateNotePayload',
        note: {
          __typename: 'Note',
          id: nanoid(10),
          title: null,
          document: null,
          metadata: {
            __typename: 'NoteMetadata',
            groups: [],
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      }
    },
    addNoteMetadataField: (vars, cache, info) => {
      return {
        __typename: 'AddNoteMetadataFieldPayload',
        field: {
          id: _generateFieldId(),
          __typename: 'MetadataGroupField',
          schema: {
            __typename: 'MetadataGroupFieldSchema',
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
      createNote: (result, args, cache, info) => {
        cache.updateQuery<GetNotesQuery>({ query: GetNotesDocument }, (data) => {
          if (result.createNote.note) {
            data?.notes.unshift(result.createNote.note)
          }
          return data
        })
      },
      addNoteMetadataField: (result, args, cache, info) => {
        cache.updateQuery<GetNoteByIdQuery, GetNoteByIdQueryVariables>({ query: GetNoteByIdDocument, variables: {
          noteId: args.input.noteId,
        } }, (data) => {
          if (data?.node?.__typename === 'Note') {
            const local = data?.node?.metadata.groups

            if (local && result.addNoteMetadataField.field) {
              if (local.length) {
                local[0].fields.push(result.addNoteMetadataField.field)
              } else {
                local.push({
                  context: 'local',
                  fields: [result.addNoteMetadataField.field]
                })
              }
            }
          }

          return data;
        })
      },
      deleteNoteMetadataField: (result, args, cache, info) => {
        cache.invalidate({ __typename: 'MetadataGroupField', id: args.input.fieldId })

        // cache.updateQuery<GetNoteByIdQuery, GetNoteByIdQueryVariables>({ query: GetNoteByIdDocument, variables: {
        //   noteId: args.input.noteId,
        // } }, (data) => {
        //   const local = data?.node?.metadata.groups

        //   if (local && result.deleteNoteMetadataField) {
        //     if (local.length) {
        //       local[0].fields = local[0].fields.filter((field) => field.id !== args.input.fieldId)
        //     }
        //   }

        //   return data;
        // })
      },
      deleteNote: (result, args, cache, info) => {
        cache.invalidate({ __typename: 'Note', id: args.input.noteId })
        // cache.updateQuery<GetNotesQuery>({ query: GetNotesDocument }, (data) => {
        //   if (data && result) {
        //     data.notes = data?.notes.filter((note) => note.id !== args.input.noteId)
        //   }
        //   return data
        // })
      },
      createNoteTable: (result, args, cache, info) => {
        cache.updateQuery<GetNoteTablesQuery>({ query: GetNoteTablesDocument }, (data) => {
          if (result.createNoteTable.noteTable) {
            data?.noteTables.unshift(result.createNoteTable.noteTable)
          }
          return data
        })
      },
      deleteNoteTable: (result, args, cache, info) => {
        cache.invalidate({ __typename: 'NoteTable', id: args.input.noteTableId })
      },
    }
  }
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