/* -----------------------------------------------------------------------------
 * Filter: Banner Status
 * -------------------------------------------------------------------------- */

export enum StatusValues {
  All = 'all',
  No = '0',
  Yes = '1',
}

export const StatusLabels: Record<StatusValues, string> = {
  [StatusValues.All]: '전체',
  [StatusValues.No]: 'N',
  [StatusValues.Yes]: 'Y',
};

export const statusOptions = [
  {
    label: StatusLabels[StatusValues.All],
    value: StatusValues.All,
  },
  {
    label: StatusLabels[StatusValues.Yes],
    value: StatusValues.Yes,
  },
  {
    label: StatusLabels[StatusValues.No],
    value: StatusValues.No,
  },
];
