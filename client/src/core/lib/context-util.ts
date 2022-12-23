import { createContext, Context } from "react"

function defaultContext<T>(ContextValueClass: new (...args: any) => T): T {
  return (new Proxy(
    {},
    {
      get: () => {
        throw new Error(
          `Failed to declare provider in your component tree for context: [${ContextValueClass.name}]. Must set value explicitly with "Context.Provider value={value}".`,
        );
      },
    },
  ) as unknown) as T;
}

export function createProviderRequiredContext<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ContextValueClass: new (...args: any) => T,
): Context<T> {
  return createContext(defaultContext(ContextValueClass));
}