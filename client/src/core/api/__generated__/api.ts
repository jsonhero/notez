/**
 * Generated by orval v6.10.3 🍺
 * Do not edit manually.
 * Notez
 * OpenAPI spec version: 1.0.0
 */
import {
  useQuery,
  useMutation
} from 'react-query'
import type {
  UseQueryOptions,
  UseMutationOptions,
  QueryFunction,
  MutationFunction,
  UseQueryResult,
  QueryKey
} from 'react-query'
import type {
  CreateNoteResponse,
  GetNotesResponse,
  GetNoteResponse,
  UpdateNoteTitleResponse,
  UpdateNoteTitleBody,
  UpdateNoteDocumentResponse,
  UpdateNoteDocumentBody,
  AddMetadataFieldResponse,
  AddMetadataFieldBody,
  UpdateMetadataFieldResponse,
  UpdateMetadataFieldBody,
  UpdateMetadataFieldValueResponse,
  UpdateMetadataFieldValueBody
} from './models'
import { customInstance } from '../axios-instance'
import type { ErrorType } from '../axios-instance'


// eslint-disable-next-line
  type SecondParameter<T extends (...args: any) => any> = T extends (
  config: any,
  args: infer P,
) => any
  ? P
  : never;

export const noteControllerCreateNote = (
    
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<CreateNoteResponse>(
      {url: `/notes`, method: 'post'
    },
      options);
    }
  


    export type NoteControllerCreateNoteMutationResult = NonNullable<Awaited<ReturnType<typeof noteControllerCreateNote>>>
    
    export type NoteControllerCreateNoteMutationError = ErrorType<unknown>

    export const useNoteControllerCreateNote = <TError = ErrorType<unknown>,
    TVariables = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof noteControllerCreateNote>>, TError,TVariables, TContext>, request?: SecondParameter<typeof customInstance>}
) => {
      const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof noteControllerCreateNote>>, TVariables> = () => {
          

          return  noteControllerCreateNote(requestOptions)
        }

      return useMutation<Awaited<ReturnType<typeof noteControllerCreateNote>>, TError, TVariables, TContext>(mutationFn, mutationOptions)
    }
    
export const noteControllerGetNotes = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      return customInstance<GetNotesResponse>(
      {url: `/notes`, method: 'get', signal
    },
      options);
    }
  

export const getNoteControllerGetNotesQueryKey = () => [`/notes`];

    
export type NoteControllerGetNotesQueryResult = NonNullable<Awaited<ReturnType<typeof noteControllerGetNotes>>>
export type NoteControllerGetNotesQueryError = ErrorType<unknown>

export const useNoteControllerGetNotes = <TData = Awaited<ReturnType<typeof noteControllerGetNotes>>, TError = ErrorType<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof noteControllerGetNotes>>, TError, TData>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getNoteControllerGetNotesQueryKey();

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof noteControllerGetNotes>>> = ({ signal }) => noteControllerGetNotes(requestOptions, signal);

  const query = useQuery<Awaited<ReturnType<typeof noteControllerGetNotes>>, TError, TData>(queryKey, queryFn, queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}


export const noteControllerGetNote = (
    noteId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      return customInstance<GetNoteResponse>(
      {url: `/notes/${noteId}`, method: 'get', signal
    },
      options);
    }
  

export const getNoteControllerGetNoteQueryKey = (noteId: string,) => [`/notes/${noteId}`];

    
export type NoteControllerGetNoteQueryResult = NonNullable<Awaited<ReturnType<typeof noteControllerGetNote>>>
export type NoteControllerGetNoteQueryError = ErrorType<unknown>

export const useNoteControllerGetNote = <TData = Awaited<ReturnType<typeof noteControllerGetNote>>, TError = ErrorType<unknown>>(
 noteId: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof noteControllerGetNote>>, TError, TData>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getNoteControllerGetNoteQueryKey(noteId);

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof noteControllerGetNote>>> = ({ signal }) => noteControllerGetNote(noteId, requestOptions, signal);

  const query = useQuery<Awaited<ReturnType<typeof noteControllerGetNote>>, TError, TData>(queryKey, queryFn, {enabled: !!(noteId), ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}


export const noteControllerUpdateNoteTitle = (
    noteId: string,
    updateNoteTitleBody: UpdateNoteTitleBody,
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<UpdateNoteTitleResponse>(
      {url: `/notes/${noteId}/title`, method: 'put',
      headers: {'Content-Type': 'application/json', },
      data: updateNoteTitleBody
    },
      options);
    }
  


    export type NoteControllerUpdateNoteTitleMutationResult = NonNullable<Awaited<ReturnType<typeof noteControllerUpdateNoteTitle>>>
    export type NoteControllerUpdateNoteTitleMutationBody = UpdateNoteTitleBody
    export type NoteControllerUpdateNoteTitleMutationError = ErrorType<unknown>

    export const useNoteControllerUpdateNoteTitle = <TError = ErrorType<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof noteControllerUpdateNoteTitle>>, TError,{noteId: string;data: UpdateNoteTitleBody}, TContext>, request?: SecondParameter<typeof customInstance>}
) => {
      const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof noteControllerUpdateNoteTitle>>, {noteId: string;data: UpdateNoteTitleBody}> = (props) => {
          const {noteId,data} = props ?? {};

          return  noteControllerUpdateNoteTitle(noteId,data,requestOptions)
        }

      return useMutation<Awaited<ReturnType<typeof noteControllerUpdateNoteTitle>>, TError, {noteId: string;data: UpdateNoteTitleBody}, TContext>(mutationFn, mutationOptions)
    }
    
export const noteControllerUpdateNoteDocument = (
    noteId: string,
    updateNoteDocumentBody: UpdateNoteDocumentBody,
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<UpdateNoteDocumentResponse>(
      {url: `/notes/${noteId}/document`, method: 'put',
      headers: {'Content-Type': 'application/json', },
      data: updateNoteDocumentBody
    },
      options);
    }
  


    export type NoteControllerUpdateNoteDocumentMutationResult = NonNullable<Awaited<ReturnType<typeof noteControllerUpdateNoteDocument>>>
    export type NoteControllerUpdateNoteDocumentMutationBody = UpdateNoteDocumentBody
    export type NoteControllerUpdateNoteDocumentMutationError = ErrorType<unknown>

    export const useNoteControllerUpdateNoteDocument = <TError = ErrorType<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof noteControllerUpdateNoteDocument>>, TError,{noteId: string;data: UpdateNoteDocumentBody}, TContext>, request?: SecondParameter<typeof customInstance>}
) => {
      const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof noteControllerUpdateNoteDocument>>, {noteId: string;data: UpdateNoteDocumentBody}> = (props) => {
          const {noteId,data} = props ?? {};

          return  noteControllerUpdateNoteDocument(noteId,data,requestOptions)
        }

      return useMutation<Awaited<ReturnType<typeof noteControllerUpdateNoteDocument>>, TError, {noteId: string;data: UpdateNoteDocumentBody}, TContext>(mutationFn, mutationOptions)
    }
    
export const noteControllerAddMetadataField = (
    noteId: string,
    addMetadataFieldBody: AddMetadataFieldBody,
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<AddMetadataFieldResponse>(
      {url: `/notes/${noteId}/metadata`, method: 'post',
      headers: {'Content-Type': 'application/json', },
      data: addMetadataFieldBody
    },
      options);
    }
  


    export type NoteControllerAddMetadataFieldMutationResult = NonNullable<Awaited<ReturnType<typeof noteControllerAddMetadataField>>>
    export type NoteControllerAddMetadataFieldMutationBody = AddMetadataFieldBody
    export type NoteControllerAddMetadataFieldMutationError = ErrorType<unknown>

    export const useNoteControllerAddMetadataField = <TError = ErrorType<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof noteControllerAddMetadataField>>, TError,{noteId: string;data: AddMetadataFieldBody}, TContext>, request?: SecondParameter<typeof customInstance>}
) => {
      const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof noteControllerAddMetadataField>>, {noteId: string;data: AddMetadataFieldBody}> = (props) => {
          const {noteId,data} = props ?? {};

          return  noteControllerAddMetadataField(noteId,data,requestOptions)
        }

      return useMutation<Awaited<ReturnType<typeof noteControllerAddMetadataField>>, TError, {noteId: string;data: AddMetadataFieldBody}, TContext>(mutationFn, mutationOptions)
    }
    
export const noteControllerUpdateMetadataField = (
    noteId: string,
    updateMetadataFieldBody: UpdateMetadataFieldBody,
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<UpdateMetadataFieldResponse>(
      {url: `/notes/${noteId}/metadata-field`, method: 'put',
      headers: {'Content-Type': 'application/json', },
      data: updateMetadataFieldBody
    },
      options);
    }
  


    export type NoteControllerUpdateMetadataFieldMutationResult = NonNullable<Awaited<ReturnType<typeof noteControllerUpdateMetadataField>>>
    export type NoteControllerUpdateMetadataFieldMutationBody = UpdateMetadataFieldBody
    export type NoteControllerUpdateMetadataFieldMutationError = ErrorType<unknown>

    export const useNoteControllerUpdateMetadataField = <TError = ErrorType<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof noteControllerUpdateMetadataField>>, TError,{noteId: string;data: UpdateMetadataFieldBody}, TContext>, request?: SecondParameter<typeof customInstance>}
) => {
      const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof noteControllerUpdateMetadataField>>, {noteId: string;data: UpdateMetadataFieldBody}> = (props) => {
          const {noteId,data} = props ?? {};

          return  noteControllerUpdateMetadataField(noteId,data,requestOptions)
        }

      return useMutation<Awaited<ReturnType<typeof noteControllerUpdateMetadataField>>, TError, {noteId: string;data: UpdateMetadataFieldBody}, TContext>(mutationFn, mutationOptions)
    }
    
export const noteControllerUpdateMetadataFieldValue = (
    noteId: string,
    updateMetadataFieldValueBody: UpdateMetadataFieldValueBody,
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<UpdateMetadataFieldValueResponse>(
      {url: `/notes/${noteId}/metadata-value`, method: 'put',
      headers: {'Content-Type': 'application/json', },
      data: updateMetadataFieldValueBody
    },
      options);
    }
  


    export type NoteControllerUpdateMetadataFieldValueMutationResult = NonNullable<Awaited<ReturnType<typeof noteControllerUpdateMetadataFieldValue>>>
    export type NoteControllerUpdateMetadataFieldValueMutationBody = UpdateMetadataFieldValueBody
    export type NoteControllerUpdateMetadataFieldValueMutationError = ErrorType<unknown>

    export const useNoteControllerUpdateMetadataFieldValue = <TError = ErrorType<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof noteControllerUpdateMetadataFieldValue>>, TError,{noteId: string;data: UpdateMetadataFieldValueBody}, TContext>, request?: SecondParameter<typeof customInstance>}
) => {
      const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof noteControllerUpdateMetadataFieldValue>>, {noteId: string;data: UpdateMetadataFieldValueBody}> = (props) => {
          const {noteId,data} = props ?? {};

          return  noteControllerUpdateMetadataFieldValue(noteId,data,requestOptions)
        }

      return useMutation<Awaited<ReturnType<typeof noteControllerUpdateMetadataFieldValue>>, TError, {noteId: string;data: UpdateMetadataFieldValueBody}, TContext>(mutationFn, mutationOptions)
    }
    
