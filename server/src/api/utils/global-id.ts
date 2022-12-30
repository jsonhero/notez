type Base64String = string;

function base64(i: string): Base64String {
  return Buffer.from(i, 'ascii').toString('base64');
}

function unbase64(i: Base64String): string {
  return Buffer.from(i, 'base64').toString('ascii');
}

export type ResolvedGlobalId = {
  type: string;
  id: string;
};

export function toGlobalId(type: string, id: string): string {
  if (process.env.READABLE_GRAPH_IDS) {
    return `${type}:${id}`;
  }
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