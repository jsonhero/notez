import {
  Controller,
  Get,
  UseInterceptors,
  Put,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { MapInterceptor } from '@automapper/nestjs';

import { Note, NoteDocument } from '@database/schemas';

import * as DTO from './dto';
import { NoteService } from './note.service';

@ApiTags('note')
@Controller('/notes')
export class NoteController {
  constructor(private noteService: NoteService) {}

  _mapNoteDto(noteDoc: NoteDocument): DTO.NoteDto {
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

  @ApiOkResponse({
    type: DTO.CreateNoteResponse,
  })
  @Post('/')
  async createNote(): Promise<DTO.CreateNoteResponse> {
    const note = await this.noteService.createNote();

    return {
      createdNote: this._mapNoteDto(note),
    };
  }

  // @ApiOkResponse({
  //   type: DTO.GetNotesResponse,
  // })
  // @Get('/')
  // async getNotes(): Promise<DTO.GetNotesResponse> {
  //   const notes = await this.noteService.getNotes();

  //   return {
  //     notes: notes.map(this._mapNoteDto),
  //   };
  // }

  @ApiOkResponse({
    type: DTO.GetNoteResponse,
  })
  @Get('/:noteId')
  async getNote(@Param('noteId') noteId: string): Promise<DTO.GetNoteResponse> {
    const note = await this.noteService.getNoteById(noteId);

    return {
      note: this._mapNoteDto(note),
    };
  }

  @ApiOkResponse({
    type: DTO.UpdateNoteTitleResponse,
  })
  @Put('/:noteId/title')
  async updateNoteTitle(
    @Param('noteId') noteId: string,
    @Body() body: DTO.UpdateNoteTitleBody,
  ) {
    await this.noteService.updateNoteTitle(noteId, body.title);

    return {};
  }

  @ApiOkResponse({
    type: DTO.UpdateNoteDocumentResponse,
  })
  @Put('/:noteId/document')
  async updateNoteDocument(
    @Param('noteId') noteId: string,
    @Body() body: DTO.UpdateNoteDocumentBody,
  ) {
    await this.noteService.updateNoteDocument(noteId, body.document);

    return {};
  }

  @ApiOkResponse({
    type: DTO.AddMetadataFieldResponse,
  })
  @Post('/:noteId/metadata')
  async addMetadataField(
    @Param('noteId') noteId: string,
    @Body() body: DTO.AddMetadataFieldBody,
  ) {
    await this.noteService.addMetaDataField(noteId);

    return {};
  }

  @ApiOkResponse({
    type: DTO.UpdateMetadataFieldResponse,
  })
  @Put('/:noteId/metadata-field')
  async updateMetadataField(
    @Param('noteId') noteId: string,
    @Body() body: DTO.UpdateMetadataFieldBody,
  ) {
    // await this.noteService.updateMetaDataField(noteId, body.fieldId, {
    //   name: body.name,
    //   type: body.type,
    // });

    return {};
  }

  @ApiOkResponse({
    type: DTO.UpdateMetadataFieldValueResponse,
  })
  @Put('/:noteId/metadata-value')
  async updateMetadataFieldValue(
    @Param('noteId') noteId: string,
    @Body() body: DTO.UpdateMetadataFieldValueBody,
  ) {
    await this.noteService.updateMetadataFieldValue(
      noteId,
      body.fieldId,
      body.value,
    );

    return {};
  }
}
