/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Model, FilterQuery, Types } from 'mongoose';

const mongoObjectId = Types.ObjectId;

import { nanoid } from 'nanoid';

import {
  Idea,
  IdeaDocument,
  MetadataTemplateDocument,
} from '@database/schemas';

import { MetadataTemplateService } from '../metadata-template';

enum MetaDataFieldType {
  TEXT,
  NUMBER,
  DATE,
}

interface IdeaMetadataField {
  id: string;
  metadataTemplateId: string;
  schema: {
    type: string;
    name: string;
  };
  input: {
    type: string;
    value: any;
  };
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
    private metadataTemplateService: MetadataTemplateService,
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

    await this.ideaModel.findByIdAndUpdate(ideaId, {
      $set: {
        [schemaPropPath]: schemaDefault,
      },
    });

    return {
      id: fieldId,
      metadataTemplateId: null,
      schema: schemaDefault,
      input: {
        type: schemaDefault.type,
        value: valueDefault,
      },
    };
  }

  async updateMetadataField(
    ideaId: string,
    metadataTemplateId: string | null,
    fieldId: string,
    props: UpdateIdeaMetaDataField,
  ): Promise<IdeaMetadataField> {
    const idea = await this.ideaModel.findById(ideaId);

    let fieldPathId = idea.metadata.pathId;
    let metadataTemplate: MetadataTemplateDocument | null = null;

    if (metadataTemplateId) {
      metadataTemplate =
        await this.metadataTemplateService.getMetadataTemplateById(
          metadataTemplateId,
        );
      fieldPathId = metadataTemplate.pathId;
    }

    const schemaPropPath = `metadata.schema.fields.${fieldId}`;
    const valuePropPath = `metadata.values.${fieldPathId}.${fieldId}`;

    let schemaValue = null;

    let currentSchema;

    if (metadataTemplate) {
      const mtSchemaField = _.get(metadataTemplate, `schema.fields.${fieldId}`);
      currentSchema = {
        type: mtSchemaField.type,
        name: mtSchemaField.name,
      };
    } else {
      currentSchema = _.get(idea, schemaPropPath);
    }

    if (props.name) {
      schemaValue = {
        type: currentSchema.type,
        name: props.name,
      };
    }

    const $updateSetProps = {};

    if (schemaValue) {
      $updateSetProps[schemaPropPath] = schemaValue;
    }

    if (props.value) {
      $updateSetProps[valuePropPath] = {
        type: currentSchema.type, // stamp schema at time of value being set
        value: props.value,
      };
    }

    const nextIdea = await this.ideaModel.findByIdAndUpdate(
      ideaId,
      {
        $set: $updateSetProps,
      },
      {
        new: true,
      },
    );

    let nextSchema;

    if (metadataTemplate) {
      const mtSchemaField = _.get(metadataTemplate, `schema.fields.${fieldId}`);
      nextSchema = {
        type: mtSchemaField.type,
        name: mtSchemaField.name,
      };
    } else {
      nextSchema = _.get(idea, schemaPropPath);
    }

    const input = _.get(nextIdea, valuePropPath);

    return {
      id: fieldId,
      metadataTemplateId: metadataTemplateId,
      schema: nextSchema,
      input: {
        type: input?.type || 'text',
        value: input?.value,
      },
    };
  }

  async deleteMetadataField(
    ideaId: string,
    metadataTemplateId: string | null,
    fieldId: string,
  ): Promise<void> {
    const idea = await this.ideaModel.findById(ideaId);

    let fieldPathId = idea.metadata.pathId;
    let metadataTemplate: MetadataTemplateDocument | null = null;

    if (metadataTemplateId) {
      metadataTemplate =
        await this.metadataTemplateService.getMetadataTemplateById(
          metadataTemplateId,
        );
      fieldPathId = metadataTemplate.pathId;
    }

    const schemaPropPath = `metadata.schema.fields.${fieldId}`;
    const valuePropPath = `metadata.values.${fieldPathId}.${fieldId}`;

    await this.ideaModel.findByIdAndUpdate(ideaId, {
      $unset: {
        [schemaPropPath]: 1,
        [valuePropPath]: 1,
      },
    });
  }
}
