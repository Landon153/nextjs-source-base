import { atom, useAtom, useSetAtom } from 'jotai';

import type { Report } from '@/lib/services/default/types/report';

export type ReportAtom = Report;

/**
 * Represents the state for the report atom in the application.
 *
 * This is an atom that holds either a `ReportAtom` object or `null`.
 *
 * The default value of the atom is `null`.
 */
const reportAtom = atom<ReportAtom | null>(null);

/**
 * Custom hook to manage and retrieve the state of a report using Jotai.
 *
 * @returns A tuple containing the current state of the report and a function to update the state.
 */
export function useReportState(): [ReportAtom | null, (value: ReportAtom | null) => void] {
  return useAtom(reportAtom);
}

/**
 * Custom hook to retrieve the current value of the report state managed by Jotai.
 *
 * @returns The current value of the report state, or null if the state is not set.
 */
export function useReportValue(): ReportAtom | null {
  const [report] = useAtom(reportAtom);

  return report;
}

/**
 * Custom hook to get a setter function to update the state of the report.
 *
 * @returns Setter function that updates the state of the report, which can be a ReportAtom or null.
 */
export function useSetReportState(): (value: ReportAtom | null) => void {
  return useSetAtom(reportAtom);
}
