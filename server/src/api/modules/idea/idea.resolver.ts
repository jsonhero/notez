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

@Resolver(() => Graph.IdeaObject)
export class IdeaResolver {
  constructor(private ideaService: IdeaService) {}

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

    return Promise.all(ideas.map((idea) => this.ideaService._mapIdeaDto(idea)));
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
      idea: await this.ideaService._mapIdeaDto(idea),
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
      idea: await this.ideaService._mapIdeaDto(idea),
    };
  }

  @Mutation(() => Graph.AddIdeaMetadataFieldPayload)
  async addIdeaMetadataField(
    @Args('input') input: Graph.AddIdeaMetadataFieldInput,
  ): Promise<Graph.AddIdeaMetadataFieldPayload> {
    const ideaId = fromGlobalId(input.ideaId).id;

    const field = await this.ideaService.addMetadataField(ideaId);

    const idea = await this.ideaService.getIdeaById(ideaId);
    const resolvedIdea = await this.ideaService._mapIdeaDto(idea);

    return {
      field: {
        id: toIdeaFieldEntryId(ideaId, field.metadataTemplateId, field.id),
        schema: {
          id: field.id,
          name: field.schema.name,
          type: field.schema.type,
          updatedAt: field.schema.updatedAt,
        },
        value: this.ideaService._resolveInputValueToDto(
          field.input,
          resolvedIdea.toReferences,
        ),
      },
    };
  }

  @Mutation(() => Graph.UpdateIdeaMetadataFieldPayload)
  async updateIdeaMetadataField(
    @Args('input') input: Graph.UpdateIdeaMetadataFieldInput,
  ): Promise<Graph.UpdateIdeaMetadataFieldPayload> {
    const ideaId = fromGlobalId(input.ideaId).id;
    const { fieldId, metadataTemplateId } = fromIdeaFieldEntryId(input.fieldId);

    let valueInput = undefined;

    if (input.field.value?.dateInput) {
      valueInput = {
        value: {
          date: input.field.value.dateInput.date,
        },
        type: 'date',
      };
    } else if (input.field.value?.numberInput) {
      valueInput = {
        value: {
          number: input.field.value?.numberInput.number,
        },
        type: 'number',
      };
    } else if (input.field.value?.textInput) {
      valueInput = {
        value: {
          text: input.field.value.textInput.text,
        },
        type: 'text',
      };
    } else if (input.field.value?.referenceInput) {
      valueInput = {
        value: {
          ideaId: input.field.value.referenceInput.ideaId,
          type: input.field.value.referenceInput.type,
          fieldId: input.field.value.referenceInput.fieldId,
        },
        type: 'reference',
      };
    } else if (input.field.value === null) {
      valueInput = null;
    }

    const field = await this.ideaService.updateMetadataField(
      ideaId,
      metadataTemplateId,
      fieldId,
      {
        schema: input.field.schema,
        valueInput: valueInput,
      },
    );

    const idea = await this.ideaService.getIdeaById(ideaId);
    const resolvedIdea = await this.ideaService._mapIdeaDto(idea);

    return {
      field: {
        id: toIdeaFieldEntryId(ideaId, field.metadataTemplateId, field.id),
        schema: {
          id: field.id,
          name: field.schema.name,
          type: field.schema.type,
          updatedAt: field.schema.updatedAt,
        },
        value: this.ideaService._resolveInputValueToDto(
          field.input,
          resolvedIdea.toReferences,
        ),
      },
    };
  }

  @Mutation(() => Graph.DeleteIdeaMetadataFieldPayload)
  async deleteIdeaMetadataField(
    @Args('input') input: Graph.DeleteIdeaMetadataFieldInput,
  ): Promise<Graph.DeleteIdeaMetadataFieldPayload> {
    const ideaId = fromGlobalId(input.ideaId).id;
    const { fieldId, metadataTemplateId } = fromIdeaFieldEntryId(input.fieldId);

    await this.ideaService.deleteMetadataField(ideaId, fieldId);

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
      idea: await this.ideaService._mapIdeaDto(idea),
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
      idea: await this.ideaService._mapIdeaDto(idea),
    };
  }
}
