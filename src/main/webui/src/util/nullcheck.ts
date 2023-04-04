/**
 * For a given object, check if null or undefined.
 *
 * This can be used in a filter or if statement for type safety in scope.
 *
 * @example
 * const items: (Item | null)[] = api.getItems();
 * items.filter(nullcheck).map(item => {
 *   // item is pure type
 *   return { ...item, value: "updated" };
 * });
 *
 * @example
 * const item: Item | undefined = api.getItem(id);
 * if (nullcheck(item)) {
 *   // item is pure type without reassignment in this scope
 *   return { ...item, value: "updated" };
 * }
 *
 */
function nullcheck<T>(obj: T | null | undefined): obj is T {
  return obj !== null && obj !== undefined;
}

export default nullcheck;
