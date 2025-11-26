/* -----------------------------------------------------------------------------
 * Filter: Event Status
 * -------------------------------------------------------------------------- */

export enum StatusValues {
  All = 'all',
  Close = '3',
  OnGoing = '2',
  UpComing = '1',
}

export const StatusLabels: Record<StatusValues, string> = {
  [StatusValues.All]: '전체',
  [StatusValues.Close]: '종료',
  [StatusValues.OnGoing]: '진행 중',
  [StatusValues.UpComing]: '오픈 예정',
};

export const statusOptions = [
  {
    label: StatusLabels[StatusValues.All],
    value: StatusValues.All,
  },
  {
    label: StatusLabels[StatusValues.UpComing],
    value: StatusValues.UpComing,
  },
  {
    label: StatusLabels[StatusValues.OnGoing],
    value: StatusValues.OnGoing,
  },
  {
    label: StatusLabels[StatusValues.Close],
    value: StatusValues.Close,
  },
];
