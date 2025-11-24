/* -----------------------------------------------------------------------------
 * Filter: Post Status
 * -------------------------------------------------------------------------- */

export enum StatusValues {
  All = 'all',
  Private = '0',
  Public = '1',
}

export const StatusLabels: Record<StatusValues, string> = {
  [StatusValues.All]: '전체',
  [StatusValues.Public]: '공개',
  [StatusValues.Private]: '비공개',
};

export const statusOptions = [
  {
    label: StatusLabels[StatusValues.All],
    value: StatusValues.All,
  },
  {
    label: StatusLabels[StatusValues.Public],
    value: StatusValues.Public,
  },
  {
    label: StatusLabels[StatusValues.Private],
    value: StatusValues.Private,
  },
];
