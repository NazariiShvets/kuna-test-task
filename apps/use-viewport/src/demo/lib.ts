const typedObjectEntries: <T extends Record<string, unknown>>(
  obj: T
) => [keyof T, T[keyof T]][] = Object.entries;

export { typedObjectEntries };
