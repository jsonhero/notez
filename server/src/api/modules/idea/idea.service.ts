/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Model, FilterQuery, Types } from 'mongoose';

const mongoObjectId = Types.ObjectId;

import { nanoid } from 'nanoid';

import { Idea, IdeaDocument } from '@database/schemas';

enum MetaDataFieldType {
  TEXT,
  NUMBER,
  DATE,
}

interface IdeaMetadataField {
  id: string;
  pathId: string;
  type: string;
  name: string;
  value: string;
}

interface UpdateIdeaMetaDataField {
  type: string;
  name: string;
  value: string;
}

interface GetIdeas {
  title?: string;
  metadataTemplateIds?: string[];
}

@Injectable()
export class IdeaService {
  constructor(
    @InjectModel(Idea.name) private readonly ideaModel: Model<IdeaDocument>,
  ) {}

  _generateFieldId(): string {
    return 'f_' + nanoid(10);
  }

  _generatePathId(): string {
    return 'p_' + nanoid(10);
  }

  async getIdeas(args: GetIdeas): Promise<IdeaDocument[]> {
    const filter: FilterQuery<IdeaDocument> = {};

    if (args.title) {
      filter.title = {
        $regex: args.title,
      };
    }

    if (args.metadataTemplateIds?.length) {
      filter['metadata.templates'] = {
        $in: args.metadataTemplateIds.map((id) => new mongoObjectId(id)),
      };
    }

    return this.ideaModel
      .find(
        filter,
        {},
        {
          sort: {
            createdAt: 'desc',
          },
        },
      )
      .populate('metadata.templates');
  }

  async getIdeaById(ideaId: string) {
    const note = await this.ideaModel
      .findById(ideaId)
      .populate('metadata.templates');
    return note;
  }

  async deleteIdeaById(ideaId: string): Promise<void> {
    await this.ideaModel.deleteOne({
      _id: ideaId,
    });
  }

  async createIdea(args: {
    metadataTemplateIds: string[];
  }): Promise<IdeaDocument> {
    const defaultIdea: any = {
      metadata: {
        pathId: this._generatePathId(),
        values: {},
        schema: {
          fields: {},
        },
        templates: null,
      },
      document: null,
      title: null,
    };

    if (args.metadataTemplateIds.length) {
      defaultIdea.metadata.templates = [...args.metadataTemplateIds];
    }

    const idea = await this.ideaModel.create(defaultIdea);
    await idea.populate('metadata.templates');

    return idea;
  }

  async updateIdea(
    ideaId: string,
    fields: {
      document: any;
      title: string;
    },
  ): Promise<IdeaDocument> {
    const updateFields = _.omit(fields);

    const idea = await this.ideaModel
      .findByIdAndUpdate(
        ideaId,
        {
          $set: {
            ...updateFields,
          },
        },
        {
          new: true,
        },
      )
      .populate('metadata.templates');

    return idea;
  }

  async addMetadataField(ideaId: string): Promise<IdeaMetadataField> {
    const fieldId = this._generateFieldId();

    const schemaPropPath = `metadata.schema.fields.${fieldId}`;

    const schemaDefault = {
      type: 'text',
      name: '',
    };
    const valueDefault = null;

    const idea = await this.ideaModel.findByIdAndUpdate(ideaId, {
      $set: {
        [schemaPropPath]: schemaDefault,
      },
    });

    return {
      id: fieldId,
      pathId: idea.metadata.pathId,
      type: schemaDefault.type,
      name: schemaDefault.name,
      value: valueDefault,
    };
  }

  async updateMetadataField(
    ideaId: string,
    pathId: string,
    fieldId: string,
    props: UpdateIdeaMetaDataField,
  ): Promise<IdeaMetadataField> {
    const schemaPropPath = `metadata.schema.fields.${fieldId}`;
    const valuePropPath = `metadata.values.${pathId}.${fieldId}`;

    let schemaValue = null;

    if (props.name) {
      schemaValue = {
        type: 'text',
        name: props.name,
      };
    }

    const $updateSetProps = {};

    if (schemaValue) {
      $updateSetProps[schemaPropPath] = schemaValue;
    }

    if (props.value) {
      $updateSetProps[valuePropPath] = props.value;
    }

    const idea = await this.ideaModel.findByIdAndUpdate(
      ideaId,
      {
        $set: $updateSetProps,
      },
      { new: true },
    );

    const schema = _.get(idea, schemaPropPath);

    return {
      id: fieldId,
      pathId: pathId,
      type: schema.type,
      name: schema.name,
      value: _.get(idea, valuePropPath),
    };
  }

  async deleteMetadataField(
    noteId: string,
    pathId: string,
    fieldId: string,
  ): Promise<void> {
    const schemaPropPath = `metadata.schema.fields.${fieldId}`;
    const valuePropPath = `metadata.values.${pathId}.${fieldId}`;

    await this.ideaModel.findByIdAndUpdate(noteId, {
      $unset: {
        [schemaPropPath]: 1,
        [valuePropPath]: 1,
      },
    });
  }
}
