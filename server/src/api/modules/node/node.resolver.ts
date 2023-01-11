import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Inject, forwardRef } from '@nestjs/common';

import { ResolvedGlobalId, fromGlobalId } from '@api/utils';
import { Node } from '@api/graph';
import { IdeaService } from '../idea';
import { MetadataTemplateService } from '../metadata-template';
import { MetadataTemplateResolver } from '../metadata-template/metadata-template.resolver';

@Resolver('Node')
export class NodeResolver {
  constructor(
    @Inject(forwardRef(() => IdeaService))
    private ideaService: IdeaService,
    @Inject(forwardRef(() => MetadataTemplateService))
    private metadataTemplateService: MetadataTemplateService,
  ) {}

  private static wrapNodeWithType(node: Node, type: string): Node {
    // Needed for Node resolve type
    node['__typename'] = type;
    return node;
  }

  private async resolveObjectTypeFromService(
    resolvedGlobalId: ResolvedGlobalId,
  ): Promise<Node> {
    switch (resolvedGlobalId.type) {
      case 'Idea':
        const idea = await this.ideaService.getIdeaById(resolvedGlobalId.id);
        return this.ideaService._mapIdeaDto(idea);
      case 'MetadataTemplate':
        const metadataTemplate =
          await this.metadataTemplateService.getMetadataTemplateById(
            resolvedGlobalId.id,
          );
        return MetadataTemplateResolver._mapMetadataTemplateDto(
          metadataTemplate,
        );
      default:
        return null;
    }
  }

  @Query(() => Node, { nullable: true })
  async node(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Promise<Node> | null {
    const resolvedGlobalId = fromGlobalId(id);
    if (!resolvedGlobalId.id) {
      throw new Error('Invalid ID.');
    }

    const object = await this.resolveObjectTypeFromService(resolvedGlobalId);
    if (object) {
      return NodeResolver.wrapNodeWithType(object, resolvedGlobalId.type);
    }

    throw new Error('No matching node.');
  }

  @Query(() => [Node])
  nodes(@Args({ name: 'ids', type: () => [ID] }) ids: [string]): unknown[] {
    return ids.map((id) => this.node(id));
  }
}
