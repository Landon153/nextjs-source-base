import type en from './messages/en.json';

type Messages = typeof en;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface -- Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
