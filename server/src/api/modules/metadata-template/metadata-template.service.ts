import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Model, FilterQuery } from 'mongoose';
import { nanoid } from 'nanoid';

import { MetadataTemplate, MetadataTemplateDocument } from '@database/schemas';
import * as Graph from './graph';

interface IMetadataTemplateField {
  id: string;
  name: string;
  type: string;
  updatedAt: Date;
  extra: any;
}

interface SchemaExtraReference {
  metadataTemplateIds: string[];
}

interface IUpdateMetadataTemplateField {
  name?: string;
  type?: string;
  extraInput: { type: 'reference'; extra: SchemaExtraReference };
}

interface IGetMetadataTemplates {
  title?: string;
  metadataTemplateIds?: string[];
}

@Injectable()
export class MetadataTemplateService {
  constructor(
    @InjectModel(MetadataTemplate.name)
    private readonly metadataTemplateModel: Model<MetadataTemplateDocument>,
  ) {}

  _generateFieldId(): string {
    return 'f_' + nanoid(10);
  }

  async _resolveSchemaField(schemaField: IMetadataTemplateField) {
    let extra = null;
    if (schemaField.type === 'reference' && schemaField.extra) {
      const templateIds: string[] = schemaField.extra.metadataTemplateIds;
      const metadataTemplates = await this.getMetadataTemplates({
        metadataTemplateIds: templateIds,
      });
      extra = {
        metadataTemplates,
      };
    }

    return {
      id: schemaField.id,
      name: schemaField.name,
      type: schemaField.type,
      updatedAt: schemaField.updatedAt,
      extra,
    };
  }

  async _mapMetadataTemplateDto(
    mtDoc: MetadataTemplateDocument,
  ): Promise<Graph.MetadataTemplate> {
    const resolvedFields = await Promise.all(
      (mtDoc.schema?.fields || []).map((field) =>
        this._resolveSchemaField(field),
      ),
    );
    return {
      id: mtDoc.id,
      title: mtDoc.title,
      schema: {
        fields: resolvedFields,
      },
      createdAt: mtDoc.createdAt,
      updatedAt: mtDoc.updatedAt,
    };
  }

  async getMetadataTemplates(
    args: IGetMetadataTemplates,
  ): Promise<MetadataTemplateDocument[]> {
    const filter: FilterQuery<MetadataTemplateDocument> = {};

    if (args.title !== undefined) {
      filter.title = {
        $regex: args.title,
      };
    }

    if (args.metadataTemplateIds?.length) {
      filter.id = {
        $in: [args.metadataTemplateIds],
      };
    }

    return this.metadataTemplateModel.find(
      filter,
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
      schema: {
        fields: [],
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

    const $setFields = {
      'schema.fields.$.updatedAt': new Date(),
    };

    if (updateFields.name) {
      $setFields['schema.fields.$.name'] = updateFields.name;
    }

    if (updateFields.type) {
      $setFields['schema.fields.$.type'] = updateFields.type;
    }

    if (updateFields.extraInput) {
      $setFields['schema.fields.$.extra'] = updateFields.extraInput.extra;
    }

    await this.metadataTemplateModel.updateOne(
      {
        _id: metadataTemplateId,
        'schema.fields.fieldId': fieldId,
      },
      {
        $set: {
          ...$setFields,
        },
      },
    );

    const metadataTemplate = await this.metadataTemplateModel.findById(
      metadataTemplateId,
    );

    const _field = metadataTemplate.schema.fields.find(
      (field) => field.fieldId === fieldId,
    );

    return {
      id: fieldId,
      ..._field,
    };
  }

  async addMetadataTemplateField(
    metadataTemplateId: string,
  ): Promise<IMetadataTemplateField> {
    const fieldId = this._generateFieldId();

    const fieldDefault = {
      fieldId,
      type: 'text',
      name: '',
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    await this.metadataTemplateModel.findByIdAndUpdate(metadataTemplateId, {
      $push: {
        'schema.fields': fieldDefault,
      },
    });

    return {
      id: fieldId,
      type: fieldDefault.type,
      name: fieldDefault.name,
      updatedAt: fieldDefault.updatedAt,
      extra: null,
    };
  }

  async deleteMetadataTemplateField(
    metadataTemplateId: string,
    fieldId: string,
  ): Promise<void> {
    await this.metadataTemplateModel.findByIdAndUpdate(metadataTemplateId, {
      $pull: {
        'schema.fields': {
          fieldId: fieldId,
        },
      },
    });
  }
}
