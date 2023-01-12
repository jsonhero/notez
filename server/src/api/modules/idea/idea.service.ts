/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Model, FilterQuery, Types, mongo } from 'mongoose';

const mongoObjectId = Types.ObjectId;

import { nanoid } from 'nanoid';
import { toIdeaFieldEntryId } from '@api/utils';

import {
  Idea,
  IdeaDocument,
  MetadataTemplateDocument,
} from '@database/schemas';

import { MetadataTemplateService } from '../metadata-template';
import * as Graph from './graph';

type IdeaRefInput = {
  ideaId: string;
  type: string;
  fieldId?: string;
};

type InputValueUnion =
  | { number: number }
  | { text: string }
  | { referenceId: string }
  | null;

interface IdeaMetadataField {
  id: string;
  metadataTemplateId: string;
  schema: {
    type: string;
    name: string;
    updatedAt: Date;
  };
  input: {
    type: string;
    value: InputValueUnion;
    updatedAt: Date;
  };
}

type UpdateValueUnion =
  | { value: { number: number }; type: 'number' }
  | { value: { number: number }; type: 'text' }
  | { value: IdeaRefInput; type: 'reference' }
  | { value: { date: Date }; type: 'date' }
  | null;

interface UpdateIdeaMetaDataField {
  schema?: {
    type: string;
    name: string;
  };
  valueInput?: UpdateValueUnion;
}

interface GetIdeas {
  title?: string;
  metadataTemplateIds?: string[];
}

function constructRef(refAdd: IdeaRefInput) {
  return {
    _id: new mongoObjectId().toString(),
    type: refAdd.type,
    idea: refAdd.ideaId,
    fieldId: 'test',
  };
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

  _resolveInputValueToDto(
    input: {
      type: string;
      value: any;
      updatedAt: Date;
    },
    references = [],
  ): any {
    if (!input) return null;

    if (input.type === 'text') {
      return {
        text: input.value?.text || '',
        updatedAt: input.updatedAt,
        type: 'text',
      };
    } else if (input.type === 'number') {
      return {
        number: input.value?.number || 0,
        updatedAt: input.updatedAt,
        type: 'number',
      };
    } else if (input.type === 'date') {
      return {
        date: input.value?.date,
        updatedAt: input.updatedAt,
        type: 'date',
      };
    } else if (input.type === 'reference') {
      const matchedRef = references.find(
        (ref) => ref.id === input.value?.referenceId,
      );
      return {
        reference: matchedRef
          ? {
              id: matchedRef.id,
              type: matchedRef.type,
              toIdea: matchedRef.toIdea,
              fieldId: matchedRef.fieldId,
            }
          : null,
        updatedAt: input.updatedAt,
        type: 'reference',
      };
    }

    return null;
  }

  async _mapIdeaDto(
    ideaDoc: IdeaDocument,
    depth = 0,
  ): Promise<Graph.IdeaObject> {
    let resolvedToReferences = [];
    let resolvedFromReferences = [];

    // @ts-ignore
    if (ideaDoc.fromReferences?.length) {
      resolvedFromReferences = await Promise.all(
        // @ts-ignore
        ideaDoc.fromReferences.map(async (idea) => {
          const fromIdeaRef = idea.references.find(
            (ref) => ref.idea.toString() === ideaDoc.id,
          );
          const toIdea = await this._mapIdeaDto(idea, depth + 1);

          return {
            id: fromIdeaRef.id,
            toIdea: toIdea,
            type: fromIdeaRef.type,
            fieldId: fromIdeaRef.fieldId,
          };
        }),
      );
    }

    if (depth === 0 && ideaDoc.references?.length) {
      resolvedToReferences = await Promise.all(
        // @ts-ignore
        (ideaDoc.references || [])
          // Handle deleted refs
          .filter((ref) => ref.idea?.id)
          .map(async (ref) => {
            // @ts-ignore
            const toIdea = await this._mapIdeaDto(ref.idea, depth + 1);
            return {
              // @ts-ignore
              id: ref.id,
              toIdea: toIdea,
              type: ref.type,
              fieldId: ref.fieldId,
            };
          }),
      );
    }

    const groups = [];
    if (ideaDoc.metadata.templates?.length) {
      ideaDoc.metadata.templates.forEach((template) => {
        const externalGroupFields = (template.schema?.fields || [])
          // .filter((field) => field.type !== 'noteRef')
          .map((schemaField: any) => {
            const valueField = ideaDoc.metadata.values.find(
              (field) => field.fieldId === schemaField.fieldId,
            );

            let resolvedValue = null;

            if (valueField) {
              resolvedValue = this._resolveInputValueToDto(
                {
                  type: valueField.type,
                  updatedAt: valueField.updatedAt,
                  value: valueField.value,
                },
                resolvedToReferences,
              );
            }

            return {
              id: toIdeaFieldEntryId(
                ideaDoc.id,
                template.id,
                schemaField.fieldId,
              ),
              schema: {
                id: schemaField.fieldId,
                name: schemaField.name,
                type: schemaField.type,
                updatedAt: schemaField.updatedAt,
              },
              value: resolvedValue,
            };
          });

        groups.push({
          context: 'external',
          template,
          fields: externalGroupFields,
        });
      });
    }

    // local always last
    if (ideaDoc.metadata?.schema?.fields) {
      const localGroupFields = (ideaDoc.metadata.schema.fields || []).map(
        (schemaField: any) => {
          const valueField = ideaDoc.metadata.values.find(
            (field) => field.fieldId === schemaField.fieldId,
          );

          let resolvedValue = null;

          if (valueField) {
            resolvedValue = this._resolveInputValueToDto(
              {
                type: valueField.type,
                updatedAt: valueField.updatedAt,
                value: valueField.value,
              },
              resolvedToReferences,
            );
          }

          return {
            id: toIdeaFieldEntryId(ideaDoc.id, null, schemaField.fieldId),
            schema: {
              id: schemaField.fieldId,
              name: schemaField.name,
              type: schemaField.type,
              updatedAt: schemaField.updatedAt,
            },
            value: resolvedValue,
          };
        },
      );
      groups.push({
        context: 'local',
        template: null,
        fields: localGroupFields,
      });
    }

    console.log(ideaDoc.title, resolvedFromReferences, ':: from rfes');

    return {
      id: ideaDoc.id,
      title: ideaDoc.title,
      document: ideaDoc.document,
      metadata: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        groups,
      },
      toReferences: resolvedToReferences,
      fromReferences: resolvedFromReferences,
      createdAt: ideaDoc.createdAt,
      updatedAt: ideaDoc.updatedAt,
    };
  }

  async getIdeas(args: GetIdeas): Promise<IdeaDocument[]> {
    const filter: FilterQuery<IdeaDocument> = {};
    let aggregateProps = {
      sort: {
        createdAt: 'desc',
      },
    };

    if (args.title?.length) {
      filter.title = {
        $regex: args.title,
      };
    }

    if (args.metadataTemplateIds?.length) {
      filter['metadata.templates'] = {
        $in: args.metadataTemplateIds.map((id) => new mongoObjectId(id)),
      };
      aggregateProps = {
        sort: {
          createdAt: 'asc',
        },
      };
    }

    return this.ideaModel
      .find(filter, {}, aggregateProps)
      .populate('metadata.templates')
      .populate('references.idea');
  }

  async getIdeaById(ideaId: string) {
    const note = await this.ideaModel
      .findById(ideaId)
      .populate('metadata.templates')
      .populate('references.idea')
      .populate('fromReferences');
    console.log(note, 'notey');
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
        values: [],
        schema: {
          fields: [],
        },
        templates: null,
      },
      document: null,
      title: null,
      references: [],
    };

    if (args.metadataTemplateIds.length) {
      defaultIdea.metadata.templates = [...args.metadataTemplateIds];
    }

    const idea = await this.ideaModel.create(defaultIdea);
    await idea.populate('metadata.templates');
    await idea.populate('references');

    return idea;
  }

  async updateIdea(
    ideaId: string,
    fields: {
      document: any;
      title: string;
      refAdds: IdeaRefInput[];
      refIdsToDelete: string[];
    },
  ): Promise<IdeaDocument> {
    const updateFields = _.omit(fields);

    let operation: any = {};

    if (updateFields.refAdds?.length) {
      const newRefs = updateFields.refAdds.map((refAdd) => {
        return constructRef(refAdd);
      });

      operation = {
        ...operation,
        $push: {
          references: {
            $each: newRefs,
          },
        },
      };
      delete updateFields.refAdds;
    }

    if (updateFields.refIdsToDelete?.length) {
      operation = {
        ...operation,
        $pull: {
          references: {
            $each: updateFields.refIdsToDelete,
          },
        },
      };
      delete updateFields.refIdsToDelete;
    }

    operation = {
      ...operation,
      $set: {
        ...updateFields,
      },
    };

    const idea = await this.ideaModel
      .findByIdAndUpdate(ideaId, operation, {
        new: true,
      })
      .populate('metadata.templates')
      .populate('references.idea');

    return idea;
  }

  async addMetadataField(ideaId: string): Promise<IdeaMetadataField> {
    const fieldId = this._generateFieldId();

    const schemaDefault = {
      fieldId,
      type: 'text',
      name: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const valueDefault = null;

    await this.ideaModel.updateOne(
      {
        _id: ideaId,
      },
      {
        $push: {
          'metadata.schema.fields': schemaDefault,
        },
      },
    );

    return {
      id: fieldId,
      metadataTemplateId: null,
      schema: schemaDefault,
      input: {
        type: schemaDefault.type,
        value: valueDefault,
        updatedAt: new Date(),
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

    let metadataTemplate: MetadataTemplateDocument | null = null;

    if (metadataTemplateId) {
      metadataTemplate =
        await this.metadataTemplateService.getMetadataTemplateById(
          metadataTemplateId,
        );
    }

    let currentSchemaField;

    if (metadataTemplate) {
      currentSchemaField = metadataTemplate.schema.fields.find(
        (field) => field.fieldId === fieldId,
      );
    } else {
      currentSchemaField = idea.metadata.schema.fields.find(
        (field) => field.fieldId === fieldId,
      );
    }

    if (props.schema !== undefined) {
      const $setFields = {
        'metadata.schema.fields.$.updatedAt': new Date(),
      };

      if (props.schema.name !== undefined) {
        $setFields['metadata.schema.fields.$.name'] = props.schema.name;
      }
      if (props.schema.type !== undefined) {
        $setFields['metadata.schema.fields.$.type'] = props.schema.type;
      }

      await this.ideaModel.updateOne(
        {
          _id: ideaId,
          'metadata.schema.fields.fieldId': fieldId,
        },
        {
          $set: {
            ...$setFields,
          },
        },
      );
    }

    if (props.valueInput !== undefined) {
      let $value = null;
      let newRef = null;

      let operation = {};

      if (props.valueInput?.type === 'reference') {
        newRef = constructRef(props.valueInput.value);
        $value = {
          referenceId: newRef._id,
        };

        operation = {
          ...operation,
          $push: {
            references: newRef,
          },
        };

        const existingValueFieldRef = idea.metadata.values.find(
          (valueField) => valueField.fieldId === fieldId,
        );

        if (
          existingValueFieldRef?.type === 'reference' &&
          existingValueFieldRef?.value?.referenceId
        ) {
          // Pull existing ref if exists
          await this.ideaModel.updateOne(
            {
              _id: ideaId,
            },
            {
              $pull: {
                references: {
                  _id: existingValueFieldRef.value.referenceId,
                },
              },
            },
          );
        }
      } else if (props.valueInput?.value) {
        $value = props.valueInput.value;
      }

      const $setFields = {
        'metadata.values.$.updatedAt': new Date(),
        'metadata.values.$.type': currentSchemaField.type, // stamp schema at time of value being set
        'metadata.values.$.value': $value,
      };

      operation = {
        ...operation,
        $set: {
          ...$setFields,
        },
      };

      const result = await this.ideaModel.updateOne(
        {
          _id: ideaId,
          'metadata.values.fieldId': fieldId,
        },
        operation,
      );

      // Create record if it doesn't exist
      if (result.modifiedCount === 0) {
        const newValueField = {
          fieldId,
          type: currentSchemaField.type,
          value: $value,
          updatedAt: new Date(),
          createdAt: new Date(),
        };

        let newOperation: any = {
          $push: {
            'metadata.values': newValueField,
          },
        };

        if (newRef !== null) {
          newOperation = {
            $push: {
              'metadata.values': newValueField,
              references: newRef,
            },
          };
        }

        await this.ideaModel.updateOne(
          {
            _id: ideaId,
          },
          newOperation,
        );
      }
    }

    const nextIdea = await this.ideaModel.findById(ideaId);

    let nextSchemaField;

    if (metadataTemplate) {
      nextSchemaField = metadataTemplate.schema.fields.find(
        (field) => field.fieldId === fieldId,
      );
    } else {
      nextSchemaField = nextIdea.metadata.schema.fields.find(
        (field) => field.fieldId === fieldId,
      );
    }

    const valueField = nextIdea.metadata.values.find(
      (value) => value.fieldId === fieldId,
    );

    return {
      id: fieldId,
      metadataTemplateId: metadataTemplateId,
      schema: nextSchemaField,
      input: {
        type: valueField?.type || 'text',
        value: valueField?.value,
        updatedAt: valueField?.updatedAt,
      },
    };
  }

  async deleteMetadataField(ideaId: string, fieldId: string): Promise<void> {
    await this.ideaModel.findByIdAndUpdate(ideaId, {
      $pull: {
        'metadata.values': {
          fieldId: fieldId,
        },
        'metadata.schema.fields': {
          fieldId: fieldId,
        },
      },
    });
  }

  async addIdeaMetadataTemplate(
    ideaId: string,
    metadataTemplateId: string,
  ): Promise<IdeaDocument> {
    const _idea = await this.ideaModel
      .findById(ideaId)
      .populate('metadata.templates')
      .populate('references.idea');

    const isMatch = !_idea.metadata.templates
      ? false
      : _idea.metadata.templates.some(
          (template) => template.id === metadataTemplateId,
        );

    if (isMatch) {
      return _idea;
    }

    let query: any = {
      $push: {
        'metadata.templates': metadataTemplateId,
      },
    };

    if (_idea.metadata.templates === null) {
      query = {
        $set: {
          'metadata.templates': [metadataTemplateId],
        },
      };
    }

    const idea = await this.ideaModel
      .findByIdAndUpdate(ideaId, query, {
        new: true,
      })
      .populate('metadata.templates')
      .populate('references.idea');

    return idea;
  }

  async deleteIdeaMetadataTemplate(
    ideaId: string,
    metadataTemplateId: string,
  ): Promise<IdeaDocument> {
    const idea = await this.ideaModel
      .findByIdAndUpdate(
        ideaId,
        {
          $pull: {
            'metadata.templates': metadataTemplateId,
          },
        },
        {
          new: true,
        },
      )
      .populate('metadata.templates')
      .populate('references.idea');

    return idea;
  }
}
