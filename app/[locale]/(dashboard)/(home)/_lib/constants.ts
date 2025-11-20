/* -----------------------------------------------------------------------------
 * Chart: Statistic
 * -------------------------------------------------------------------------- */

export enum PeriodValues {
  Month = 'month',
  Year = 'year',
}

export const PeriodLabels: Record<PeriodValues, string> = {
  [PeriodValues.Month]: '월간',
  [PeriodValues.Year]: '연간',
};

export const periodOptions = [
  {
    label: PeriodLabels[PeriodValues.Month],
    value: PeriodValues.Month,
  },
  {
    label: PeriodLabels[PeriodValues.Year],
    value: PeriodValues.Year,
  },
];
