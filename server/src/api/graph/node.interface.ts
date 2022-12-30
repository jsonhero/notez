import { Field, ID, InterfaceType } from '@nestjs/graphql';

@InterfaceType({
  resolveType(value) {
    return value.__typename;
  },
})
export abstract class Node {
  @Field(() => ID)
  id: string;
}
