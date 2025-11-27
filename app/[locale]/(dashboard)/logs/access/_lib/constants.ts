export enum AccessLogType {
  Fail = '실패',
  Success = '성공',
}

export enum FailReason {
  BannedAccount = 'BANNED_ACCOUNT',
  IncorrectEmailOrPassword = 'INCORRECT_EMAIL_OR_PASSWORD',
}

export const FailReasonLabel: Record<FailReason, string> = {
  [FailReason.BannedAccount]: 'BANNED_ACCOUNT',
  [FailReason.IncorrectEmailOrPassword]: 'INCORRECT_EMAIL_OR_PASSWORD',
};
