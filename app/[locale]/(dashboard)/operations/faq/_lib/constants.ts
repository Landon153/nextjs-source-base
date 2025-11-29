/* -----------------------------------------------------------------------------
 * Filter: Display Status
 * -------------------------------------------------------------------------- */

export enum DisplayStatusValues {
  All = 'all',
  No = '0',
  Yes = '1',
}

export const displayStatusLabels: Record<DisplayStatusValues, string> = {
  [DisplayStatusValues.All]: '전체',
  [DisplayStatusValues.Yes]: 'Y',
  [DisplayStatusValues.No]: 'N',
};

export const displayStatusOptions = [
  {
    label: displayStatusLabels[DisplayStatusValues.All],
    value: DisplayStatusValues.All,
  },
  {
    label: displayStatusLabels[DisplayStatusValues.Yes],
    value: DisplayStatusValues.Yes,
  },
  {
    label: displayStatusLabels[DisplayStatusValues.No],
    value: DisplayStatusValues.No,
  },
];
