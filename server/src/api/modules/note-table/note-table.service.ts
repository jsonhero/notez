import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Model, FilterQuery } from 'mongoose';
import { nanoid } from 'nanoid';

import { NoteTable, NoteTableDocument } from '@database/schemas';

@Injectable()
export class NoteTableService {
  constructor(
    @InjectModel(NoteTable.name)
    private readonly noteTableModel: Model<NoteTableDocument>,
  ) {}

  _generateImplementionId(): string {
    return 't_' + nanoid(10);
  }

  async getNoteTables(): Promise<NoteTableDocument[]> {
    return this.noteTableModel.find(
      {},
      {},
      {
        sort: {
          createdAt: 'desc',
        },
      },
    );
  }

  async getNoteTableById(id: string) {
    const noteTable = await this.noteTableModel.findById(id);
    return noteTable;
  }

  async createNoteTable(): Promise<NoteTableDocument> {
    const noteTable = await this.noteTableModel.create({
      title: null,
      implementationId: this._generateImplementionId(),
      schema: {
        fields: [],
      },
    });

    return noteTable;
  }

  async deleteNoteTableById(noteTableId: string): Promise<void> {
    await this.noteTableModel.deleteOne({
      _id: noteTableId,
    });
  }
}
