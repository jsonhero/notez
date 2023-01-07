type Base64String = string;

function base64(i: string): Base64String {
  return btoa(i)
}

function unbase64(i: Base64String): string {
  return atob(i)
}

export type ResolvedGlobalId = {
  type: string;
  id: string;
};

export function toGlobalId(type: string, id: string): string {
  // if (process.env.READABLE_GRAPH_IDS) {
  //   return `${type}:${id}`;
  // }
  return base64([type, id].join(':'));
}

export function fromGlobalId(globalId: string): ResolvedGlobalId {
  const unbasedGlobalId = unbase64(globalId);
  const delimiterPos = unbasedGlobalId.indexOf(':');
  return {
    type: unbasedGlobalId.substring(0, delimiterPos),
    id: unbasedGlobalId.substring(delimiterPos + 1),
  };
}

export type ResolvedIdeaFieldPathId = {
  ideaId: string;
  metadataTemplateId: string | null;
  fieldId: string;
};

export function toIdeaFieldEntryId(
  ideaId: string,
  metadataTemplateId: string | null,
  fieldId: string,
): string {
  return base64([ideaId, metadataTemplateId || 'null', fieldId].join(':'));
}

export function fromIdeaFieldEntryId(
  ideaFieldPathId: string,
): ResolvedIdeaFieldPathId {
  const unbasedFieldId = unbase64(ideaFieldPathId);
  const [ideaId, metadataTemplateId, fieldId] = unbasedFieldId.split(':');
  return {
    ideaId,
    metadataTemplateId: metadataTemplateId === 'null' ? null : metadataTemplateId,
    fieldId,
  };
}

