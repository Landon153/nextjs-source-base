import { formatUrl } from 'next/dist/shared/lib/router/utils/format-url';
import { pathToRegexp } from 'path-to-regexp';

import { type LinkProps } from '@/lib/i18n/routing';
import { logger } from '@/lib/logger';

/**
 * Returns the formatted URL.
 *
 * @param href - The URL to be formatted. It can be of type string or LinkProps['href'].
 * @returns - The formatted URL.
 */
export function getFormattedUrl(href: LinkProps['href']): string {
  if (typeof href === 'string') {
    return href;
  }

  return formatUrl(href);
}

/**
 * Matches a given regular expression path against a given path.
 *
 * @param regexPath - The regular expression path to match against.
 * @param path - The path to match the regular expression path against.
 * @returns Returns true if the regular expression path matches the path, otherwise returns false.
 */
export function matchPathname(regexPath: string, path: string): boolean {
  try {
    const regexp = pathToRegexp(regexPath);

    return regexp.test(path);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(regexPath, path, error.message);
    }

    return false;
  }
}
