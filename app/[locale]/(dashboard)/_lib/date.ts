/**
 * Gets the date representing one year ago from the current date.
 * @returns - The date one year ago.
 */
export function getOneYearAgo(): Date {
  const oneYearAgo = new Date();

  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  return oneYearAgo;
}
