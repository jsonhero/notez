import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';

import * as Graph from './graph';
import { MetadataTemplateService } from './metadata-template.service';

import { MetadataTemplateDocument } from '@database/schemas';
import { fromGlobalId, toGlobalId } from '@api/utils';

@Resolver(() => Graph.MetadataTemplate)
export class MetadataTemplateResolver {
  constructor(private metadataTemplateService: MetadataTemplateService) {}

  static _mapMetadataTemplateDto(
    mtDoc: MetadataTemplateDocument,
  ): Graph.MetadataTemplate {
    return {
      id: mtDoc.id,
      title: mtDoc.title,
      schema: {
        fields: Object.entries(mtDoc.schema?.fields || {}).map(
          ([fieldId, field]: any) => {
            return {
              id: fieldId,
              ...field,
            };
          },
        ),
      },
      createdAt: mtDoc.createdAt,
      updatedAt: mtDoc.updatedAt,
    };
  }

  @ResolveField()
  id(@Parent() metadataTemplate: MetadataTemplateDocument): string {
    return toGlobalId('MetadataTemplate', metadataTemplate.id);
  }

  @Query(() => [Graph.MetadataTemplate])
  async metadataTemplates(
    @Args('input', {
      nullable: true,
    })
    input: Graph.MetadataTemplateSearchInput,
  ): Promise<Graph.MetadataTemplate[]> {
    const metadataTemplates =
      await this.metadataTemplateService.getMetadataTemplates({
        title: input?.title,
      });

    return metadataTemplates.map(
      MetadataTemplateResolver._mapMetadataTemplateDto,
    );
  }

  @Mutation(() => Graph.CreateMetadataTemplatePayload)
  async createMetadataTemplate(): Promise<Graph.CreateMetadataTemplatePayload> {
    const metadataTemplate =
      await this.metadataTemplateService.createMetadataTemplate();

    return {
      template:
        MetadataTemplateResolver._mapMetadataTemplateDto(metadataTemplate),
    };
  }

  @Mutation(() => Graph.DeleteMetadataTemplatePayload)
  async deleteMetadataTemplate(
    @Args('input') input: Graph.DeleteMetadataTemplateInput,
  ): Promise<Graph.DeleteMetadataTemplatePayload> {
    await this.metadataTemplateService.deleteMetadataTemplateById(
      fromGlobalId(input.metadataTemplateId).id,
    );

    return {
      clientMutationId: input.clientMutationId,
    };
  }

  @Mutation(() => Graph.UpdateMetadataTemplatePayload)
  async updateMetadataTemplate(
    @Args('input') input: Graph.UpdateMetadataTemplateInput,
  ): Promise<Graph.UpdateMetadataTemplatePayload> {
    const metadataTemplate =
      await this.metadataTemplateService.updateMetadataTemplate(
        fromGlobalId(input.metadataTemplateId).id,
        input.template,
      );

    return {
      template:
        MetadataTemplateResolver._mapMetadataTemplateDto(metadataTemplate),
    };
  }

  @Mutation(() => Graph.AddMetadataTemplateFieldPayload)
  async addMetadataTemplateField(
    @Args('input') input: Graph.AddMetadataTemplateFieldInput,
  ): Promise<Graph.AddMetadataTemplateFieldPayload> {
    const field = await this.metadataTemplateService.addMetadataTemplateField(
      fromGlobalId(input.metadataTemplateId).id,
    );

    return {
      field,
    };
  }

  @Mutation(() => Graph.UpdateMetadataTemplateFieldPayload)
  async updateMetadataTemplateField(
    @Args('input') input: Graph.UpdateMetadataTemplateFieldInput,
  ): Promise<Graph.UpdateMetadataTemplateFieldPayload> {
    const field =
      await this.metadataTemplateService.updateMetadataTemplateField(
        fromGlobalId(input.metadataTemplateId).id,
        input.fieldId,
        input.field,
      );

    return {
      field,
    };
  }

  @Mutation(() => Graph.DeleteMetadataTemplateFieldPayload)
  async deleteMetadataTemplateField(
    @Args('input') input: Graph.DeleteMetadataTemplateFieldInput,
  ): Promise<Graph.DeleteMetadataTemplateFieldPayload> {
    await this.metadataTemplateService.deleteMetadataTemplateField(
      fromGlobalId(input.metadataTemplateId).id,
      input.fieldId,
    );

    return {
      clientMutationId: input.clientMutationId,
    };
  }
}
