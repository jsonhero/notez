import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';

import { Note, NoteDocument } from '@database/schemas';

enum MetaDataFieldType {
  TEXT,
  NUMBER,
  DATE,
}

interface INoteMetadataField {
  id: string;
  schema: {
    type: string;
    name: string;
  };
  value: string;
}

interface IUpdateMetaDataField {
  schema: {
    type: string;
    name: string;
  };
  value: string;
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

  async deleteNoteById(noteId: string): Promise<void> {
    await this.noteModel.deleteOne({
      _id: noteId,
    });
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

  async update(
    noteId: string,
    fields: {
      document: any;
      title: string;
    },
  ): Promise<NoteDocument> {
    const updateFields = _.omit(fields);

    const note = await this.noteModel.findByIdAndUpdate(
      noteId,
      {
        $set: {
          ...updateFields,
        },
      },
      {
        new: true,
      },
    );

    return note;
  }

  async addMetaDataField(noteId: string): Promise<INoteMetadataField> {
    const fieldId = this._generateFieldId();

    const valuePropPath = `metadata.values.local.${fieldId}`;
    const schemaPropPath = `metadata.schema.fields.${fieldId}`;

    const schemaDefault = {
      type: 'text',
      name: '',
    };
    const valueDefault = null;

    await this.noteModel.findByIdAndUpdate(noteId, {
      $set: {
        [valuePropPath]: valueDefault,
        [schemaPropPath]: schemaDefault,
      },
    });

    return {
      id: fieldId,
      schema: schemaDefault,
      value: valueDefault,
    };
  }

  async updateMetaDataField(
    noteId: string,
    fieldId: string,
    props: IUpdateMetaDataField,
  ): Promise<INoteMetadataField> {
    const schemaPropPath = `metadata.schema.fields.${fieldId}`;
    const valuePropPath = `metadata.values.local.${fieldId}`;

    let schemaValue = null;

    if (props.schema) {
      schemaValue = {
        type: 'text',
        name: props.schema.name,
      };
    }

    const $updateSetProps = {};

    if (schemaValue) {
      $updateSetProps[schemaPropPath] = schemaValue;
    }

    if (props.value) {
      $updateSetProps[valuePropPath] = props.value;
    }

    const note = await this.noteModel.findByIdAndUpdate(
      noteId,
      {
        $set: $updateSetProps,
      },
      { new: true },
    );

    return {
      id: fieldId,
      schema: _.get(note, schemaPropPath),
      value: _.get(note, valuePropPath),
    };
  }

  async updateMetadataFieldValue(
    noteId: string,
    fieldId: string,
    fieldValue: any,
  ) {
    const valuePropPath = `metadata.values.local.${fieldId}`;

    const note = await this.noteModel.findByIdAndUpdate(
      noteId,
      {
        $set: {
          [valuePropPath]: fieldValue,
        },
      },
      { new: true },
    );

    const schemaPropPath = `metadata.schema.fields.${fieldId}`;

    return {
      id: fieldId,
      schema: _.get(note, schemaPropPath),
      value: fieldValue,
    };
  }
}
