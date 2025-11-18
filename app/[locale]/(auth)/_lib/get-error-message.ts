import type { AuthError } from 'next-auth';

import { errors } from '@/app/[locale]/(auth)/_lib/constants/auth-error';

/**
 * Retrieves the error message based on the given error code.
 *
 * @param errorCode - The error code to get the corresponding error message for. If not provided, the default error
 *   message will be returned.
 *
 * @returns An object containing the error message.
 */
export function getErrorMessage(errorCode?: AuthError['type']): { message: string } {
  return errorCode ? errors[errorCode] : errors.default;
}
