'use server';

import { AuthError } from 'next-auth';

import { type CredentialsFormValues } from '@/app/[locale]/(auth)/_lib/schema/credentials-form-schema';
import { signIn } from '@/lib/auth';
import { SIGN_IN_PAGE } from '@/lib/auth/constants';
import { AccountSuspendedError, type AuthErrorCode } from '@/lib/auth/error';
import { type ServerAction } from '@/lib/types/server-actions';

/**
 * Determines the final URL to which the user should be redirected.
 *
 * @param redirectUrl - The original redirect URL to evaluate.
 * @param callbackUrl - An optional callback URL that can override the redirect URL.
 * @returns The final URL to which the user should be redirected.
 */
function getRedirectUrl(redirectUrl: string, callbackUrl: string | null): string {
  const url = new URL(redirectUrl);

  // If the URL is the sign-in page, return the origin
  if (url.href.endsWith(SIGN_IN_PAGE)) {
    return url.origin;
  }

  // Return callback URL if available, otherwise return the original redirectUrl
  return callbackUrl ?? redirectUrl;
}

/**
 * Authenticates the user with the provided credentials.
 *
 * @param data - The user's credentials.
 * @returns A promise that resolves to a ServerAction object.
 *          - If authentication is successful, the ServerAction object will contain a "redirectTo" property of type
 *   string.
 *          - If authentication fails, the ServerAction object will contain an "error" property.
 *          - The "error" property will have a "type" property of type AuthError['type'].
 *          - If the error is of type AccountSuspendedError, the "error" property will also have a "code" property of
 *   type AuthErrorCode.
 * @throws Any error that occurs during the authentication process, except AuthError instances.
 */
export async function authenticate(
  data: CredentialsFormValues,
): Promise<ServerAction<{ redirectTo: string }, { type: AuthError['type']; code?: AuthErrorCode }>> {
  try {
    // Sign in the user with the provided credentials
    const redirectUrl = (await signIn('credentials', { ...data, redirect: false })) as string;

    // Extract callbackUrl from the URL's search parameters
    const url = new URL(redirectUrl);
    const callbackUrl = url.searchParams.get('callbackUrl');

    // Get the final redirect URL based on callbackUrl and redirectUrl logic
    const finalRedirectUrl = getRedirectUrl(redirectUrl, callbackUrl);

    return { status: true, data: { redirectTo: finalRedirectUrl } };
  } catch (error) {
    // If the error is not an AuthError, throw it.
    if (!(error instanceof AuthError)) {
      throw error;
    }

    // If the error is an AccountSuspendedError, return the error code.
    if (error instanceof AccountSuspendedError) {
      return { status: false, error: { type: error.type, code: error.code } };
    }

    // Otherwise, return the error type.
    return { status: false, error: { type: error.type } };
  }
}
