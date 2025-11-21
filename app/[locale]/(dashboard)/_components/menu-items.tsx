import { accessRules } from '@/lib/auth/constants';
import { type MenuItem } from '@/lib/auth/definitions';

export const menuItems: MenuItem[] = [
  {
    path: '/',
    regexPath: '',
    title: 'HOME',
  },
  {
    children: [
      {
        path: '/users',
        regexPath: '/users/((?!withdrawn).*)',
        roles: accessRules['/users'].roles,
        permissions: accessRules['/users'].permissions,
        title: '일반 회원',
      },
      {
        path: '/users/withdrawn',
        regexPath: '/users/withdrawn/:path*',
        roles: accessRules['/users/withdrawn'].roles,
        permissions: accessRules['/users/withdrawn'].permissions,
        title: '탈퇴 회원',
      },
    ],
    regexPath: '/users/:path*',
    title: '회원 관리',
  },
  {
    children: [
      {
        path: '/community/posts',
        regexPath: '/community/posts/:path*',
        roles: accessRules['/community/posts'].roles,
        permissions: accessRules['/community/posts'].permissions,
        title: '게시글 관리',
      },
    ],
    regexPath: '/community/:path*',
    title: '커뮤니티 관리',
  },
  {
    children: [
      {
        path: '/reports',
        regexPath: '/reports/((?!blocks).*)',
        roles: accessRules['/reports'].roles,
        permissions: accessRules['/reports'].permissions,
        title: '신고 관리',
      },
      {
        path: '/reports/blocks',
        regexPath: '/reports/blocks/:path*',
        roles: accessRules['/reports/blocks'].roles,
        permissions: accessRules['/reports/blocks'].permissions,
        title: '차단 관리',
      },
    ],
    regexPath: '/reports/:path*',
    title: '신고/차단 관리',
  },
  {
    children: [
      {
        path: '/contents/events',
        regexPath: '/contents/events/:path*',
        roles: accessRules['/contents/events'].roles,
        permissions: accessRules['/contents/events'].permissions,
        title: '이벤트 관리',
      },
      {
        path: '/contents/banners',
        regexPath: '/contents/banners/:path*',
        roles: accessRules['/contents/banners'].roles,
        permissions: accessRules['/contents/banners'].permissions,
        title: '배너 관리',
      },
    ],
    regexPath: '/contents/:path*',
    title: '컨텐츠 관리',
  },
  {
    children: [
      {
        path: '/operations/customer-support',
        regexPath: '/operations/customer-support/:path*',
        roles: accessRules['/operations/customer-support'].roles,
        permissions: accessRules['/operations/customer-support'].permissions,
        title: 'CS 관리',
      },
      {
        path: '/operations/faq',
        regexPath: '/operations/faq/:path*',
        roles: accessRules['/operations/faq'].roles,
        permissions: accessRules['/operations/faq'].permissions,
        title: 'FAQ 관리',
      },
      {
        path: '/operations/notices',
        regexPath: '/operations/notices/:path*',
        roles: accessRules['/operations/notices'].roles,
        permissions: accessRules['/operations/notices'].permissions,
        title: '공지사항 관리',
      },
    ],
    regexPath: '/operations/:path*',
    title: '운영 관리',
  },
  {
    path: '/admins',
    regexPath: '/admins/:path*',
    roles: accessRules['/admins'].roles,
    permissions: accessRules['/admins'].permissions,
    title: '관리자 관리',
  },
  {
    children: [
      {
        path: '/logs/access',
        regexPath: '/logs/access/:path*',
        roles: accessRules['/logs/access'].roles,
        permissions: accessRules['/logs/access'].permissions,
        title: '접속 로그',
      },
    ],
    regexPath: '/logs/:path*',
    title: '로그 관리',
  },
] as const;
