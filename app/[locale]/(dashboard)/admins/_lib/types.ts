import { type Permission } from '@/lib/services/default/constants';

export interface PermissionItem {
  label: string;
  value: Permission;
}

export type PermissionGroup = Record<string, PermissionItem[]>;
