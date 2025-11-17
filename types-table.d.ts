import { type RowData } from '@tanstack/table-core';

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- used for type inference
  interface ColumnMeta<TData extends RowData, TValue> {
    cell?: {
      className?: string;
    };
    className?: string;
    header?: {
      className?: string;
    };
  }
}
