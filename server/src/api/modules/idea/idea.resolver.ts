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
  fromIdeaFieldPathId,
  toIdeaFieldPathId,
} from '@api/utils';

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
            const value = _.get(
              ideaDoc.metadata.values,
              `${template.pathId}.${fieldId}`,
              null,
            );
            return {
              id: toIdeaFieldPathId(ideaDoc.id, template.pathId, fieldId),
              schema: {
                id: fieldId,
                name: field.name,
                type: field.type,
              },
              value,
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
        const value = _.get(
          ideaDoc.metadata.values,
          `${ideaDoc.metadata.pathId}.${fieldId}`,
          null,
        );

        return {
          id: toIdeaFieldPathId(ideaDoc.id, ideaDoc.metadata.pathId, fieldId),
          schema: {
            id: fieldId,
            ...schema,
          },
          value,
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
        id: toIdeaFieldPathId(ideaId, field.pathId, field.id),
        schema: {
          id: field.id,
          name: field.name,
          type: field.type,
        },
        value: field.value,
      },
    };
  }

  @Mutation(() => Graph.UpdateIdeaMetadataFieldPayload)
  async updateIdeaMetadataField(
    @Args('input') input: Graph.UpdateIdeaMetadataFieldInput,
  ): Promise<Graph.UpdateIdeaMetadataFieldPayload> {
    const ideaId = fromGlobalId(input.ideaId).id;
    const { fieldId, pathId } = fromIdeaFieldPathId(input.fieldId);

    const field = await this.ideaService.updateMetadataField(
      ideaId,
      pathId,
      fieldId,
      input.field,
    );
    return {
      field: {
        id: toIdeaFieldPathId(ideaId, field.pathId, field.id),
        schema: {
          id: field.id,
          name: field.name,
          type: field.type,
        },
        value: field.value,
      },
    };
  }

  @Mutation(() => Graph.DeleteIdeaMetadataFieldPayload)
  async deleteIdeaMetadataField(
    @Args('input') input: Graph.DeleteIdeaMetadataFieldInput,
  ): Promise<Graph.DeleteIdeaMetadataFieldPayload> {
    const ideaId = fromGlobalId(input.ideaId).id;
    const { fieldId, pathId } = fromIdeaFieldPathId(input.fieldId);

    await this.ideaService.deleteMetadataField(ideaId, pathId, fieldId);

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
}
