const BILLION = 1e9;
const MILLION = 1e6;
const THOUSAND = 1e3;

/**
 * Converts a given number into its abbreviated form using metric prefixes.
 * For example, 1,000 becomes 1K, 1,000,000 becomes 1M, and 1,000,000,000 becomes 1B.
 *
 * @param absNumber - The number to be abbreviated.
 * @returns The abbreviated string representation of the number.
 */
function getAbbreviation(absNumber: number): string {
  if (absNumber >= BILLION) {
    return `${(absNumber / BILLION).toLocaleString()}B`;
  }

  if (absNumber >= MILLION) {
    return `${(absNumber / MILLION).toLocaleString()}M`;
  }

  if (absNumber >= THOUSAND) {
    return `${(absNumber / THOUSAND).toLocaleString()}K`;
  }

  return absNumber.toLocaleString();
}

/**
 * Abbreviates a given number by converting it into a more readable string format with appropriate suffixes.
 *
 * @param number - The number to be abbreviated. Can be any integer or float.
 * @returns The abbreviated string representation of the number with suffixes like 'K' for thousands, 'M' for millions, etc.
 */
export function abbreviateNumber(number: number): string {
  const absNumber = Math.abs(number);
  const abbreviation = getAbbreviation(absNumber);

  return number < 0 ? `-${abbreviation}` : abbreviation;
}
