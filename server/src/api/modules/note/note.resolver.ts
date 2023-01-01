import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';

import * as Graph from './graph';
import { NoteService } from './note.service';

import { NoteDocument } from '@database/schemas';
import { fromGlobalId, toGlobalId } from '@api/utils';

@Resolver(() => Graph.NoteObject)
export class NoteResolver {
  constructor(private noteService: NoteService) {}

  static _mapNoteDto(noteDoc: NoteDocument): Graph.NoteObject {
    const groups = [];

    if (noteDoc.metadata?.schema?.fields) {
      const localGroupFields = Object.entries(
        noteDoc.metadata.schema.fields,
      ).map(([id, schema]) => {
        const value = noteDoc.metadata.values.local[id];

        return {
          id,
          schema,
          value,
        };
      });
      groups.push({
        context: 'local',
        fields: localGroupFields,
      });
    }

    return {
      id: noteDoc.id,
      title: noteDoc.title,
      document: noteDoc.document,
      metadata: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        groups,
      },
      createdAt: noteDoc.createdAt,
      updatedAt: noteDoc.updatedAt,
    };
  }

  @ResolveField()
  id(@Parent() note: NoteDocument): string {
    return toGlobalId('Note', note.id);
  }

  @Query(() => [Graph.NoteObject])
  async notes(
    @Args('input', {
      nullable: true,
    }) input: Graph.NoteSearchInput,
  ): Promise<Graph.NoteObject[]> {
    const notes = await this.noteService.getNotes({
      title: input?.title,
    });

    return notes.map(NoteResolver._mapNoteDto);
  }

  @Mutation(() => Graph.CreateNotePayload)
  async createNote(): Promise<Graph.CreateNotePayload> {
    const note = await this.noteService.createNote();

    return {
      note: NoteResolver._mapNoteDto(note),
    };
  }

  @Mutation(() => Graph.UpdateNotePayload)
  async updateNote(
    @Args('input') input: Graph.UpdateNoteInput,
  ): Promise<Graph.UpdateNotePayload> {
    const note = await this.noteService.update(
      fromGlobalId(input.noteId).id,
      input.note,
    );

    return {
      note: NoteResolver._mapNoteDto(note),
    };
  }

  @Mutation(() => Graph.AddNoteMetadataFieldPayload)
  async addNoteMetadataField(
    @Args('input') input: Graph.AddNoteMetadataFieldInput,
  ): Promise<Graph.AddNoteMetadataFieldPayload> {
    const field = await this.noteService.addMetaDataField(
      fromGlobalId(input.noteId).id,
    );
    return {
      field,
    };
  }

  @Mutation(() => Graph.UpdateNoteMetadataFieldPayload)
  async updateNoteMetadataField(
    @Args('input') input: Graph.UpdateNoteMetadataFieldInput,
  ): Promise<Graph.UpdateNoteMetadataFieldPayload> {
    const field = await this.noteService.updateMetaDataField(
      fromGlobalId(input.noteId).id,
      input.fieldId,
      input.field,
    );
    return {
      field,
    };
  }

  @Mutation(() => Graph.DeleteNoteMetadataFieldPayload)
  async deleteNoteMetadataField(
    @Args('input') input: Graph.DeleteNoteMetadataFieldInput,
  ): Promise<Graph.DeleteNoteMetadataFieldPayload> {
    await this.noteService.deleteMetadataField(
      fromGlobalId(input.noteId).id,
      input.fieldId,
    );

    return {
      clientMutationId: input.clientMutationId,
    };
  }

  @Mutation(() => Graph.DeleteNotePayload)
  async deleteNote(
    @Args('input') input: Graph.DeleteNoteInput,
  ): Promise<Graph.DeleteNotePayload> {
    await this.noteService.deleteNoteById(fromGlobalId(input.noteId).id);

    return {
      clientMutationId: input.clientMutationId,
    };
  }
}
