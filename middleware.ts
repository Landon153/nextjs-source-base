import { type NextRequest, type NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { auth } from '@/lib/auth';
import { isAccessAllowed } from '@/lib/auth/access-control';
import { DEFAULT_PROTECTED_PAGE, SIGN_IN_PAGE } from '@/lib/auth/constants';
import { createRouteMatcher } from '@/lib/auth/route';
import { setProtectedPageRedirect, setSignInRedirect } from '@/lib/i18n/redirect';
import { locales, routing } from '@/lib/i18n/routing';
import { type Permission, UserRole } from '@/lib/services/default/constants';

const isProtectedRoute = createRouteMatcher([
  /** Dashboard (Statistics) */
  `${DEFAULT_PROTECTED_PAGE}:locale(${locales.join('|')})?`,

  /** User Management */
  `/:locale(${locales.join('|')})?/users/:path*`,

  /** Community Management */
  `/:locale(${locales.join('|')})?/community/:path*`,

  /** Report/Block Management */
  `/:locale(${locales.join('|')})?/reports/:path*`,

  /** Contents Management */
  `/:locale(${locales.join('|')})?/contents/:path*`,

  /** Operations Management */
  `/:locale(${locales.join('|')})?/operations/:path*`,

  /** Admin Management */
  `/:locale(${locales.join('|')})?/admins/:path*`,

  /** Log Management */
  `/:locale(${locales.join('|')})?/logs/:path*`,
]);

const isGuestRoute = createRouteMatcher([`/:locale(${locales.join('|')})?${SIGN_IN_PAGE}`]);

const handleI18nRouting = createMiddleware(routing);

/**
 * Determines whether the user should be redirected to the sign-in page.
 *
 * @param request - The incoming request object, usually containing route and user information.
 * @param isLoggedIn - A boolean indicating if the user is currently logged in.
 * @returns A boolean value indicating if redirection to the sign-in page is required.
 */
function shouldRedirectToSignIn(request: NextRequest, isLoggedIn: boolean): boolean {
  return !isLoggedIn && isProtectedRoute(request);
}

/**
 * Determines if a request should be redirected to a protected route.
 *
 * @param request - The incoming Next.js request object.
 * @param isLoggedIn - A boolean indicating if the user is logged in.
 * @param roles - An array of user roles.
 * @param permissions - An array of user permissions.
 * @param isSuperAdmin - A boolean indicating if the user has super admin privileges.
 * @returns A boolean indicating whether the request should be redirected to a protected route.
 */
function shouldRedirectToProtected(
  request: NextRequest,
  isLoggedIn: boolean,
  roles: UserRole[],
  permissions: Permission[],
  isSuperAdmin: boolean,
): boolean {
  return isLoggedIn && isProtectedRoute(request) && !isAccessAllowed(request, roles, permissions, isSuperAdmin);
}

/**
 * Determines if the user should be redirected to the default route.
 *
 * @param request - The incoming request object.
 * @param isLoggedIn - A boolean indicating if the user is currently logged in.
 * @returns A boolean indicating whether a redirect to the default route is necessary.
 */
function shouldRedirectToDefault(request: NextRequest, isLoggedIn: boolean): boolean {
  return isLoggedIn && isGuestRoute(request);
}

/**
 * Middleware function to handle authentication and authorization.
 *
 * This function intercepts requests and determines the appropriate redirect
 * based on the user's authentication status and roles.
 *
 * @param request - The incoming Next.js request object.
 * @returns A promise that resolves to a Next.js response object, potentially
 *          with redirection if the user is not authenticated or unauthorized.
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
  const session = await auth();

  const isLoggedIn = session !== null;
  const { roles = [], permissions = [] } = session?.user ?? {};
  const isSuperAdmin = roles.includes(UserRole.SuperAdmin);

  // Redirect to the sign-in page if not logged in
  if (shouldRedirectToSignIn(request, isLoggedIn)) {
    return handleI18nRouting(setSignInRedirect(request));
  }

  // Redirect to the default protected page if logged in and trying to access guest routes
  if (shouldRedirectToDefault(request, isLoggedIn)) {
    return handleI18nRouting(setProtectedPageRedirect(request));
  }

  // Redirect to the default protected page if logged in and trying to access protected routes without permission
  if (shouldRedirectToProtected(request, isLoggedIn, roles, permissions, isSuperAdmin)) {
    return handleI18nRouting(setProtectedPageRedirect(request));
  }

  return handleI18nRouting(request);
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
