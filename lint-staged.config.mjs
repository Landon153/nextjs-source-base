import path from 'node:path';

/**
 * Builds the ESLint command using the given list of filenames.
 * The command includes options for fixing errors, setting the maximum number of warnings to 0,
 * and specifying the filenames to lint.
 *
 * @param filenames - The list of filenames to include in the command.
 *
 * @returns The built ESLint command with specified options and filenames.
 */
function buildEslintCommand(filenames) {
  return `next lint --fix --max-warnings 0 --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;
}

const config = {
  '*': 'prettier --list-different --write --ignore-unknown',
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
};

export default config;
