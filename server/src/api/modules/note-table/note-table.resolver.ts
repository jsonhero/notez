import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';

import * as Graph from './graph';
import { NoteTableService } from './note-table.service';

import { NoteTableDocument } from '@database/schemas';
import { fromGlobalId, toGlobalId } from '@api/utils';

@Resolver(() => Graph.NoteTableObject)
export class NoteTableResolver {
  constructor(private noteTableService: NoteTableService) {}

  static _mapNoteTableDto(
    noteTableDoc: NoteTableDocument,
  ): Graph.NoteTableObject {
    return {
      id: noteTableDoc.id,
      title: noteTableDoc.title,
      schema: noteTableDoc.schema,
      createdAt: noteTableDoc.createdAt,
      updatedAt: noteTableDoc.updatedAt,
    };
  }

  @ResolveField()
  id(@Parent() note: NoteTableDocument): string {
    return toGlobalId('NoteTable', note.id);
  }

  @Query(() => [Graph.NoteTableObject])
  async noteTables(): Promise<Graph.NoteTableObject[]> {
    const noteTables = await this.noteTableService.getNoteTables();

    return noteTables.map(NoteTableResolver._mapNoteTableDto);
  }

  @Mutation(() => Graph.CreateNoteTablePayload)
  async createNoteTable(): Promise<Graph.CreateNoteTablePayload> {
    const noteTable = await this.noteTableService.createNoteTable();

    return {
      noteTable: NoteTableResolver._mapNoteTableDto(noteTable),
    };
  }

  @Mutation(() => Graph.DeleteNoteTablePayload)
  async deleteNoteTable(
    @Args('input') input: Graph.DeleteNoteTableInput,
  ): Promise<Graph.DeleteNoteTablePayload> {
    await this.noteTableService.deleteNoteTableById(
      fromGlobalId(input.noteTableId).id,
    );

    return {
      clientMutationId: input.clientMutationId,
    };
  }
}
