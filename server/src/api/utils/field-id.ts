type Base64String = string;

function base64(i: string): Base64String {
  return Buffer.from(i, 'ascii').toString('base64');
}

function unbase64(i: Base64String): string {
  return Buffer.from(i, 'base64').toString('ascii');
}

export type ResolvedIdeaFieldPathId = {
  ideaId: string;
  pathId: string;
  fieldId: string;
};

export function toIdeaFieldPathId(
  ideaId: string,
  pathId: string,
  fieldId: string,
): string {
  return base64([ideaId, pathId, fieldId].join(':'));
}

export function fromIdeaFieldPathId(
  ideaFieldPathId: string,
): ResolvedIdeaFieldPathId {
  const unbasedFieldId = unbase64(ideaFieldPathId);
  const [ideaId, pathId, fieldId] = unbasedFieldId.split(':');
  return {
    ideaId,
    pathId,
    fieldId,
  };
}
