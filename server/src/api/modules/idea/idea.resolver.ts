import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';

import * as _ from 'lodash';
import * as Graph from './graph';
import { IdeaService } from './idea.service';

import { IdeaDocument } from '@database/schemas';
import {
  fromGlobalId,
  toGlobalId,
  fromIdeaFieldEntryId,
  toIdeaFieldEntryId,
} from '@api/utils';

function resolveInputValueToDto(input: {
  type: string;
  value: any;
  updatedAt: Date;
}): any {
  if (!input) return null;

  if (input.type === 'text') {
    return {
      text: input.value || '',
      updatedAt: input.updatedAt,
      type: 'text',
    };
  } else if (input.type === 'number') {
    return {
      number: input.value || 0,
      updatedAt: input.updatedAt,
      type: 'number',
    };
  } else if (input.type === 'date') {
    return {
      date: input.value,
      updatedAt: input.updatedAt,
      type: 'date',
    };
  }

  return null;
}

@Resolver(() => Graph.IdeaObject)
export class IdeaResolver {
  constructor(private ideaService: IdeaService) {}

  static _mapIdeaDto(ideaDoc: IdeaDocument): Graph.IdeaObject {
    const groups = [];
    if (ideaDoc.metadata.templates?.length) {
      ideaDoc.metadata.templates.forEach((template) => {
        const externalGroupFields = Object.entries(
          template.schema?.fields || {},
        )
          // .filter((field) => field.type !== 'noteRef')
          .map(([fieldId, field]: any) => {
            const input = _.get(
              ideaDoc.metadata.values,
              `${template.pathId}.${fieldId}`,
              null,
            );
            return {
              id: toIdeaFieldEntryId(ideaDoc.id, template.id, fieldId),
              schema: {
                id: fieldId,
                name: field.name,
                type: field.type,
                updatedAt: field.updatedAt,
              },
              value: resolveInputValueToDto(input),
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
      const localGroupFields = Object.entries(
        ideaDoc.metadata.schema.fields,
      ).map(([fieldId, schema]: any) => {
        const input = _.get(
          ideaDoc.metadata.values,
          `${ideaDoc.metadata.pathId}.${fieldId}`,
          null,
        );

        return {
          id: toIdeaFieldEntryId(ideaDoc.id, null, fieldId),
          schema: {
            id: fieldId,
            ...schema,
          },
          value: resolveInputValueToDto(input),
        };
      });
      groups.push({
        context: 'local',
        template: null,
        fields: localGroupFields,
      });
    }

    return {
      id: ideaDoc.id,
      title: ideaDoc.title,
      document: ideaDoc.document,
      metadata: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        groups,
      },
      createdAt: ideaDoc.createdAt,
      updatedAt: ideaDoc.updatedAt,
    };
  }

  @ResolveField()
  id(@Parent() idea: IdeaDocument): string {
    return toGlobalId('Idea', idea.id);
  }

  @Query(() => [Graph.IdeaObject])
  async ideas(
    @Args('input', {
      nullable: true,
    })
    input: Graph.IdeaSearchInput,
  ): Promise<Graph.IdeaObject[]> {
    const ideas = await this.ideaService.getIdeas({
      title: input?.title,
      metadataTemplateIds: (input?.metadataTemplateIds || []).map(
        (id) => fromGlobalId(id).id,
      ),
    });

    return ideas.map(IdeaResolver._mapIdeaDto);
  }

  @Mutation(() => Graph.CreateIdeaPayload)
  async createIdea(
    @Args('input', {
      nullable: true,
    })
    input: Graph.CreateIdeaInput,
  ): Promise<Graph.CreateIdeaPayload> {
    const idea = await this.ideaService.createIdea({
      metadataTemplateIds: (input?.metadataTemplateIds || []).map(
        (id) => fromGlobalId(id).id,
      ),
    });

    return {
      idea: IdeaResolver._mapIdeaDto(idea),
    };
  }

  @Mutation(() => Graph.UpdateIdeaPayload)
  async updateIdea(
    @Args('input') input: Graph.UpdateIdeaInput,
  ): Promise<Graph.UpdateIdeaPayload> {
    const idea = await this.ideaService.updateIdea(
      fromGlobalId(input.ideaId).id,
      input.idea,
    );

    return {
      idea: IdeaResolver._mapIdeaDto(idea),
    };
  }

  @Mutation(() => Graph.AddIdeaMetadataFieldPayload)
  async addIdeaMetadataField(
    @Args('input') input: Graph.AddIdeaMetadataFieldInput,
  ): Promise<Graph.AddIdeaMetadataFieldPayload> {
    const ideaId = fromGlobalId(input.ideaId).id;

    const field = await this.ideaService.addMetadataField(ideaId);
    return {
      field: {
        id: toIdeaFieldEntryId(ideaId, field.metadataTemplateId, field.id),
        schema: {
          id: field.id,
          name: field.schema.name,
          type: field.schema.type,
          updatedAt: field.schema.updatedAt,
        },
        value: resolveInputValueToDto(field.input),
      },
    };
  }

  @Mutation(() => Graph.UpdateIdeaMetadataFieldPayload)
  async updateIdeaMetadataField(
    @Args('input') input: Graph.UpdateIdeaMetadataFieldInput,
  ): Promise<Graph.UpdateIdeaMetadataFieldPayload> {
    const ideaId = fromGlobalId(input.ideaId).id;
    const { fieldId, metadataTemplateId } = fromIdeaFieldEntryId(input.fieldId);

    const field = await this.ideaService.updateMetadataField(
      ideaId,
      metadataTemplateId,
      fieldId,
      input.field,
    );
    return {
      field: {
        id: toIdeaFieldEntryId(ideaId, field.metadataTemplateId, field.id),
        schema: {
          id: field.id,
          name: field.schema.name,
          type: field.schema.type,
          updatedAt: field.schema.updatedAt,
        },
        value: resolveInputValueToDto(field.input),
      },
    };
  }

  @Mutation(() => Graph.DeleteIdeaMetadataFieldPayload)
  async deleteIdeaMetadataField(
    @Args('input') input: Graph.DeleteIdeaMetadataFieldInput,
  ): Promise<Graph.DeleteIdeaMetadataFieldPayload> {
    const ideaId = fromGlobalId(input.ideaId).id;
    const { fieldId, metadataTemplateId } = fromIdeaFieldEntryId(input.fieldId);

    await this.ideaService.deleteMetadataField(
      ideaId,
      metadataTemplateId,
      fieldId,
    );

    return {
      clientMutationId: input.clientMutationId,
    };
  }

  @Mutation(() => Graph.DeleteIdeaPayload)
  async deleteIdea(
    @Args('input') input: Graph.DeleteIdeaInput,
  ): Promise<Graph.DeleteIdeaPayload> {
    const ideaId = fromGlobalId(input.ideaId).id;
    await this.ideaService.deleteIdeaById(ideaId);

    return {
      clientMutationId: input.clientMutationId,
    };
  }

  @Mutation(() => Graph.DeleteIdeaMetadataTemplatePayload)
  async deleteIdeaMetadataTemplate(
    @Args('input') input: Graph.DeleteIdeaMetadataTemplateInput,
  ): Promise<Graph.DeleteIdeaMetadataTemplatePayload> {
    const ideaId = fromGlobalId(input.ideaId).id;
    const metadataTemplateId = fromGlobalId(input.metadataTemplateId).id;

    const idea = await this.ideaService.deleteIdeaMetadataTemplate(
      ideaId,
      metadataTemplateId,
    );

    return {
      clientMutationId: input.clientMutationId,
      idea: IdeaResolver._mapIdeaDto(idea),
    };
  }

  @Mutation(() => Graph.AddIdeaMetadataTemplatePayload)
  async addIdeaMetadataTemplate(
    @Args('input') input: Graph.AddIdeaMetadataTemplateInput,
  ): Promise<Graph.AddIdeaMetadataTemplatePayload> {
    const ideaId = fromGlobalId(input.ideaId).id;
    const metadataTemplateId = fromGlobalId(input.metadataTemplateId).id;

    const idea = await this.ideaService.addIdeaMetadataTemplate(
      ideaId,
      metadataTemplateId,
    );

    return {
      clientMutationId: input.clientMutationId,
      idea: IdeaResolver._mapIdeaDto(idea),
    };
  }
}
