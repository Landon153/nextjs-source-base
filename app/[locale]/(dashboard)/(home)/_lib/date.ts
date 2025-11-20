/**
 * Generates an array of objects representing the last 12 months.
 * Each object contains the month number (value) and short month name (label).
 *
 * @returns An array of objects with keys 'value' and 'label' for the last 12
 *   months.
 */
export function getLast12Months(): { date: Date; label: string; value: string }[] {
  const months = [];
  const now = new Date();

  for (let i = 0; i < 12; i++) {
    const month = new Date(now.getFullYear(), now.getMonth() - i, 1);

    months.push({
      value: (month.getMonth() + 1).toString(),
      label: month.toLocaleString('default', { month: 'short' }),
      date: month,
    });
  }

  return months;
}

export function getYearsFromFirstSubscriber(firstYear: number): { label: string; value: string }[] {
  const years = [];
  const currentYear = new Date().getFullYear();

  for (let year = currentYear; year >= firstYear; year--) {
    years.push({
      value: year.toString(),
      label: year.toString(),
    });
  }

  return years;
}
