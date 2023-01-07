type Base64String = string;

function base64(i: string): Base64String {
  return Buffer.from(i, 'ascii').toString('base64');
}

function unbase64(i: Base64String): string {
  return Buffer.from(i, 'base64').toString('ascii');
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
