/* -----------------------------------------------------------------------------
 * Filter: Answer Status
 * -------------------------------------------------------------------------- */

export enum AnswerStatusValues {
  All = 'all',
  Completed = '1',
  Pending = '0',
}

export const AnswerStatusLabels: Record<AnswerStatusValues, string> = {
  [AnswerStatusValues.All]: '전체',
  [AnswerStatusValues.Pending]: '답변 예정',
  [AnswerStatusValues.Completed]: '답변 완료',
};

export const answerStatusOptions = [
  {
    label: AnswerStatusLabels[AnswerStatusValues.All],
    value: AnswerStatusValues.All,
  },
  {
    label: AnswerStatusLabels[AnswerStatusValues.Pending],
    value: AnswerStatusValues.Pending,
  },
  {
    label: AnswerStatusLabels[AnswerStatusValues.Completed],
    value: AnswerStatusValues.Completed,
  },
];

/* -----------------------------------------------------------------------------
 * Filter: Search Condition
 * -------------------------------------------------------------------------- */

export enum SearchConditionValues {
  AdminName = 'adminName',
  Email = 'userEmail',
}

export const SearchConditionLabels: Record<SearchConditionValues, string> = {
  [SearchConditionValues.Email]: '문의자 이메일',
  [SearchConditionValues.AdminName]: '답변자명',
};

export const searchConditionOptions = [
  {
    label: SearchConditionLabels[SearchConditionValues.Email],
    value: SearchConditionValues.Email,
  },
  {
    label: SearchConditionLabels[SearchConditionValues.AdminName],
    value: SearchConditionValues.AdminName,
  },
];
