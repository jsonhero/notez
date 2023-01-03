import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Model, FilterQuery } from 'mongoose';
import { nanoid } from 'nanoid';

import { MetadataTemplate, MetadataTemplateDocument } from '@database/schemas';

interface IMetadataTemplateField {
  id: string;
  name: string;
  type: string;
}

interface IUpdateMetadataTemplateField {
  name?: string;
  type?: string;
}

@Injectable()
export class MetadataTemplateService {
  constructor(
    @InjectModel(MetadataTemplate.name)
    private readonly metadataTemplateModel: Model<MetadataTemplateDocument>,
  ) {}

  _generatePathId(): string {
    return 'p_' + nanoid(10);
  }

  _generateFieldId(): string {
    return 'f_' + nanoid(10);
  }

  async getMetadataTemplates(): Promise<MetadataTemplateDocument[]> {
    return this.metadataTemplateModel.find(
      {},
      {},
      {
        sort: {
          createdAt: 'desc',
        },
      },
    );
  }

  async getMetadataTemplateById(metadataTemplateId: string) {
    const metadataTemplate = await this.metadataTemplateModel.findById(
      metadataTemplateId,
    );
    return metadataTemplate;
  }

  async createMetadataTemplate(): Promise<MetadataTemplateDocument> {
    const metadataTemplate = await this.metadataTemplateModel.create({
      title: null,
      pathId: this._generatePathId(),
      schema: {
        fields: {},
      },
    });

    return metadataTemplate;
  }

  async deleteMetadataTemplateById(metadataTemplateId: string): Promise<void> {
    await this.metadataTemplateModel.deleteOne({
      _id: metadataTemplateId,
    });
  }

  async updateMetadataTemplate(
    metadataTemplateId: string,
    fields: {
      title: string;
    },
  ): Promise<MetadataTemplateDocument> {
    const updateFields = _.omit(fields);

    const metadataTemplate = await this.metadataTemplateModel.findByIdAndUpdate(
      metadataTemplateId,
      {
        $set: {
          ...updateFields,
        },
      },
      {
        new: true,
      },
    );

    return metadataTemplate;
  }

  async updateMetadataTemplateField(
    metadataTemplateId: string,
    fieldId: string,
    field: IUpdateMetadataTemplateField,
  ): Promise<IMetadataTemplateField> {
    const updateFields = _.omit(field);

    const fieldPath = `schema.fields.${fieldId}`;

    const metadataTemplate = await this.metadataTemplateModel.findByIdAndUpdate(
      metadataTemplateId,
      {
        $set: {
          [fieldPath]: {
            ...updateFields,
          },
        },
      },
      {
        new: true,
      },
    );

    const _field = _.get(metadataTemplate, fieldPath);

    return {
      id: fieldId,
      ..._field,
    };
  }

  async addMetadataTemplateField(
    metadataTemplateId: string,
  ): Promise<IMetadataTemplateField> {
    const fieldId = this._generateFieldId();

    const fieldPath = `schema.fields.${fieldId}`;

    const fieldDefault = {
      type: 'text',
      name: '',
    };

    await this.metadataTemplateModel.findByIdAndUpdate(metadataTemplateId, {
      $set: {
        [fieldPath]: fieldDefault,
      },
    });

    return {
      id: fieldId,
      type: fieldDefault.type,
      name: fieldDefault.name,
    };
  }
}
