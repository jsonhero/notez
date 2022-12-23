import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';

import { Note, NoteDocument } from '@database/schemas';

enum MetaDataFieldType {
  TEXT,
  NUMBER,
  DATE,
}

interface IAddMetaDataField {
  name: string;
  type: MetaDataFieldType | any;
}

interface IUpdateMetaDataField {
  name: string;
  type: MetaDataFieldType | any;
}

interface MetaDataFieldValueText {
  value: string;
}

interface MetaDataFieldValueText {
  value: string;
}

class MetaDataFieldValue {
  type: string;

  constructor(type: string) {
    this.type = type;
  }

  getType(): string {
    return this.type;
  }

  getValue(): any {
    return null;
  }
}

class MetaDataFieldValueText extends MetaDataFieldValue {
  value: string;

  constructor(value: string) {
    super('text');
    this.value = value;
  }
}

class MetaDataFieldValueNumber extends MetaDataFieldValue {
  value: number;

  constructor(value: number) {
    super('number');
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }
}

class MetaDataFieldValueDate extends MetaDataFieldValue {
  value: Date;

  constructor(value: Date) {
    super('date');
    this.value = value;
  }

  getValue(): Date {
    return this.value;
  }
}

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(Note.name) private readonly noteModel: Model<NoteDocument>,
  ) {}

  _generateFieldId(): string {
    return 'f_' + nanoid(10);
  }

  async getNotes(): Promise<NoteDocument[]> {
    return this.noteModel.find(
      {},
      {},
      {
        sort: {
          createdAt: 'desc',
        },
      },
    );
  }

  async getNoteById(id: string) {
    const note = await this.noteModel.findById(id);
    return note;
  }

  async createNote(): Promise<NoteDocument> {
    const note = await this.noteModel.create({
      metadata: {
        values: {
          local: {},
          external: {},
        },
        schema: {
          fields: {},
        },
        implements: null,
      },
      document: null,
      title: null,
    });

    return note;
  }

  async updateNoteTitle(noteId: string, title: string) {
    await this.noteModel.findByIdAndUpdate(noteId, {
      $set: {
        title,
      },
    });
  }

  async updateNoteDocument(noteId: string, document: any) {
    await this.noteModel.findByIdAndUpdate(noteId, {
      $set: {
        document,
      },
    });
  }

  async addMetaDataField(
    noteId: string,
    props: IAddMetaDataField,
  ): Promise<void> {
    const fieldId = this._generateFieldId();

    const valuePropPath = `metadata.values.local.${fieldId}`;
    const schemaPropPath = `metadata.schema.fields.${fieldId}`;

    await this.noteModel.findByIdAndUpdate(noteId, {
      $set: {
        [valuePropPath]: null,
        [schemaPropPath]: props,
      },
    });
  }

  async updateMetaDataField(
    noteId: string,
    fieldId: string,
    props: IUpdateMetaDataField,
  ) {
    const schemaPropPath = `metadata.schema.fields.${fieldId}`;

    await this.noteModel.findByIdAndUpdate(noteId, {
      $set: {
        [schemaPropPath]: props,
      },
    });
  }

  async updateMetadataFieldValue(
    noteId: string,
    fieldId: string,
    fieldValue: any,
  ) {
    const valuePropPath = `metadata.values.local.${fieldId}`;

    await this.noteModel.findByIdAndUpdate(noteId, {
      $set: {
        [valuePropPath]: fieldValue,
      },
    });
  }
}
