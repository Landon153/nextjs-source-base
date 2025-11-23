import { type PermissionGroup } from '@/app/[locale]/(dashboard)/admins/_lib/types';
import { Permission } from '@/lib/services/default/constants';

export const permissionGroup: PermissionGroup = {
  '회원 관리': [
    { label: '일반 회원 관리', value: Permission.UserManagement },
    { label: '탈퇴 회원 관리', value: Permission.UserWithdrawnManagement },
  ],
  '커뮤니티 관리': [{ label: '게시글 관리', value: Permission.PostCommunityManagement }],
  '신고/차단 관리': [
    { label: '신고 관리', value: Permission.ReportManagement },
    { label: '차단 관리', value: Permission.BlockManagement },
  ],
  '컨텐츠 관리': [
    { label: '이벤트 관리', value: Permission.EventManagement },
    { label: '배너 관리', value: Permission.BannerManagement },
  ],
  '운영 관리': [
    { label: 'CS 관리', value: Permission.CsManagement },
    { label: 'FAQ 관리', value: Permission.FaqManagement },
    { label: '공지사항 관리', value: Permission.NoticeManagement },
  ],
} as const;
