import type { Permission, UserRole } from '@/lib/services/default/constants';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    user: {
      id: string;
      lastPasswordChangedAt: string | null;
      permissions: Permission[];
      roles: UserRole[];
    };
  }

  interface User {
    accessToken: string;
    expiresAt: string;
    lastPasswordChangedAt: string | null;
    permissions: Permission[];
    refreshToken: string;
    roles: UserRole[];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    expiresAt: string;
    lastPasswordChangedAt: string | null;
    permissions: Permission[];
    refreshToken: string;
    roles: UserRole[];
  }
}
