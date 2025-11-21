/**
 * Converts a string representation of a date to a valid Date object.
 * @param param - The string representation of the date.
 * @returns A Date object if the string is a valid date, otherwise undefined.
 */
export function parseValidDate(param: string | null): Date | undefined {
  if (!param) {
    return undefined;
  }

  const date = new Date(param);

  return date.toString() !== 'Invalid Date' ? date : undefined;
}
