# Project Setup with Next.js

This project is built with [Next.js](https://nextjs.org), using [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) for initial setup.

## Getting Started

### Rename the Project

To rename your project and update all relevant files seamlessly, execute the `rename-project.sh` script:

```bash
./scripts/rename-project.sh
```

#### Input New Project Name

When prompted, provide the new project name.

Note: If your project name contains spaces (e.g., "my new project"), make sure to enclose it in quotes. Only the first part will be accepted if spaces are entered without quotes.

The script will update the following files automatically:

- `package.json`
- Docker Compose files in the `docker` directory

### Example Usage

For instance, if you want to rename your project to `next-fullstack-app`, run:

```bash
./scripts/rename-project.sh next-fullstack-app
```

If you omit the project name argument, the script will prompt you:

```bash
./scripts/rename-project.sh
Enter the new project name: next-fullstack-app
```

## Important Notes

- Ensure that `jq` is installed on your system to run the script. You can install it using your package manager. For example, on macOS, use Homebrew:

```bash
brew install jq
```

- If you encounter any issues, double-check that the specified files exist in your project directory.

### Environment Setup

Create a `.env.local` file in the root directory to open the project in WebStorm. Add the following content:

```dotenv
REACT_EDITOR=webstorm
```

Set up the environment by running the following commands in your terminal:

```bash
echo "REACT_EDITOR=webstorm" > .env.local
cp .env.development.sample .env.development.local
cp .env.staging.sample .env.staging.local
cp .env.production.sample .env.production.local
```

Generate an `AUTH_SECRET` for encrypting tokens and email verification hashes:

```bash
openssl rand -base64 32
```

Add the generated `AUTH_SECRET` to your `.env.local` files for each environment:

```dotenv
AUTH_SECRET=your-random-value
```

Alternatively, automate the process with the provided script:

```bash
./scripts/update-auth-secret.sh
```

### Development Server

To start the development server, run:

```bash
pnpm dev
```

Then, open [http://localhost:3000](http://localhost:3000) in your browser to view the application. The page will automatically update as you make changes to `app/page.tsx`.

### Fonts

The project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to optimize and load the Inter font from Google Fonts.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs): A comprehensive guide to all Next.js features and APIs.
- [Learn Next.js](https://nextjs.org/learn): An interactive tutorial to help you get started.

For contributions and feedback, check out the [Next.js GitHub repository](https://github.com/vercel/next.js).

---

## Deployment

You can easily deploy your Next.js application using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), the platform developed by the creators of Next.js. For more information, refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

---

## Function Naming Conventions in Next.js

### 1. CRUD-Based Naming

For consistency, we follow a naming convention for page functions based on CRUD actions (Create, Read, Update, Delete):

- **{Entity}ListPage**: Displays a list of entities (Read).
- **{Entity}NewPage**: Creates a new entity (Create).
- **{Entity}EditPage**: Edits an entity (Update).
- **{Entity}DeletePage**: Confirms or processes entity deletion (Delete).
- **{Entity}DetailPage**: Shows details of a specific entity (Read).

#### Example:

```tsx
// app/users/page.tsx
export default function UserListPage() {
  // Display the list of users
}

// app/users/new/page.tsx
export default function UserNewPage() {
  // Page to create a new user
}

// app/users/[id]/edit/page.tsx
export default function UserEditPage() {
  // Edit user based on ID
}

// app/users/[id]/delete/page.tsx
export default function UserDeletePage() {
  // Confirm deletion of user by ID
}

// app/users/[id]/page.tsx
export default function UserDetailPage() {
  // Show user details based on ID
}
```

### 2. Extended Naming for Specific Use Cases

We extend the naming convention to cover additional use cases beyond CRUD:

- **{Entity}SearchPage**: Page for searching entities.
- **{Entity}SettingsPage**: Configures or customizes entity settings.
- **{Entity}StatsPage**: Displays statistics or charts related to the entity.

#### Example:

```tsx
// app/users/search/page.tsx
export default function UserSearchPage() {
  // Page for searching users
}

// app/users/settings/page.tsx
export default function UserSettingsPage() {
  // Configure user-related settings
}

// app/users/stats/page.tsx
export default function UserStatsPage() {
  // Show user-related stats and charts
}
```

### 3. Complex Pages

For complex pages, break them down into smaller components or sub-pages while keeping naming conventions consistent:

- **{Entity}InviteNewPage**: Page for sending new invitations.
- **{Entity}ArchiveListPage**: List of archived entities.

#### Example:

```tsx
// app/users/invite/page.tsx
export default function UserInviteNewPage() {
  // Page for sending user invitations
}

// app/users/archive/page.tsx
export default function UserArchiveListPage() {
  // Show list of archived users
}
```

### 4. Page vs Component Naming

Use the `Page` suffix for top-level page functions, while components follow regular naming conventions:

```tsx
// app/users/page.tsx
export default function UserListPage() {
  // Main component for the user list page
}

// app/users/list/UserTable.tsx
export function UserTable() {
  // Component displaying the user table, used in UserListPage
}
```

### 5. Contextual Naming

For larger applications, add context-specific prefixes like `Admin`, `Profile`, or `Dashboard` to clarify the purpose of a page:

```tsx
// app/admin/users/page.tsx
export default function AdminUserListPage() {
  // User list in admin panel
}

// app/profile/settings/page.tsx
export default function ProfileSettingsPage() {
  // Personal account settings page
}
```

---

## RESTful API URL Structure

In a RESTful API, URLs represent resources and actions in a logical and intuitive manner. Here’s a breakdown of a typical URL structure:

### Example URL

```
GET /api/users?page=1&limit=10
```

1. **HTTP Method (`GET`)**: Defines the action (GET to retrieve data).
2. **Endpoint (`/api/users`)**: Points to the resource.
3. **Query Parameters (`?page=1&limit=10`)**: Provides additional details like pagination.

### Standard RESTful URL Breakdown:

- **Base URL**: `https://api.example.com`
- **Resource Path**: `/users` (list of users)
- **Query Parameters**: `page=2` and `limit=20` (second page, 20 users per page)

---

## Date Formats in JavaScript

Understanding date formats is crucial in JavaScript development. Below are common formats along with corresponding `date-fns` strings:

| Format Type                         | Example                     | `date-fns` Format String         |
| ----------------------------------- | --------------------------- | -------------------------------- |
| **Date Only**                       | `2024-09-20`                | `'yyyy-MM-dd'`                   |
| **Date and Time**                   | `2024-09-20T14:30:00`       | `"yyyy-MM-dd'T'HH:mm:ss"`        |
| **Date and Time with UTC**          | `2024-09-20T14:30:00Z`      | `"yyyy-MM-dd'T'HH:mm:ss'Z'"`     |
| **Date and Time with Offset**       | `2024-09-20T14:30:00+02:00` | `"yyyy-MM-dd'T'HH:mm:ssXXX"`     |
| **Week Date**                       | `2024-W38-5`                | `"RRRR-'W'II-e"`                 |
| **Ordinal Date**                    | `2024-263`                  | `'yyyy-DDD'`                     |
| **Year and Month**                  | `2024-09`                   | `'yyyy-MM'`                      |
| **Year Only**                       | `2024`                      | `'yyyy'`                         |
| **Date and Time with Milliseconds** | `2024-09-20T14:30:00.123Z`  | `"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"` |
