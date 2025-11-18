import type { AuthError } from 'next-auth';

export const errors: Record<AuthError['type'] | 'default', { message: string }> = {
  AccessDenied: {
    // 'Access denied. You do not have permission to access this resource.'
    message: '접근이 거부되었습니다. 이 리소스에 액세스할 권한이 없습니다.',
  },
  AccountNotLinked: {
    // 'This account is not linked to any user. Please link your account first.'
    message: '이 계정은 어떤 사용자와도 연결되어 있지 않습니다. 먼저 계정을 연결해 주세요.',
  },
  AdapterError: {
    // 'An error occurred in the authentication adapter. Please try again later.'
    message: '인증 어댑터에서 오류가 발생했습니다. 나중에 다시 시도하세요.',
  },
  CallbackRouteError: {
    // 'There was an error with the callback route. Please try again.'
    message: '콜백 경로에 오류가 있었습니다. 다시 시도해주세요.',
  },
  CredentialsSignin: {
    // 'Please double-check your email or password.'
    message: '이메일 또는 비밀번호를 다시 확인해주세요.',
  },
  DuplicateConditionalUI: {
    // 'Duplicate conditional UI error. Please contact support.'
    message: '중복 조건부 UI 오류가 발생했습니다. 지원팀에 문의해주세요.',
  },
  EmailSignInError: {
    // 'An error occurred while signing in with email. Please try again.'
    message: '이메일로 로그인하는 중 오류가 발생했습니다. 다시 시도해주세요.',
  },
  ErrorPageLoop: {
    // 'Authentication failed due to a page loop error. Please try again.'
    message: '페이지 루프 오류로 인해 인증에 실패했습니다. 다시 시도해주세요.',
  },
  EventError: {
    // 'An error occurred during the authentication event. Please try again.'
    message: '인증 이벤트 도중 오류가 발생했습니다. 다시 시도해주세요.',
  },
  ExperimentalFeatureNotEnabled: {
    // 'This feature is not enabled. Please contact support for more information.'
    message: '이 기능은 활성화되어 있지 않습니다. 자세한 정보는 지원팀에 문의하십시오.',
  },
  InvalidCallbackUrl: {
    // 'The callback URL is invalid. Please check the URL and try again.'
    message: '콜백 URL이 잘못되었습니다. URL을 확인하고 다시 시도하십시오.',
  },
  InvalidCheck: {
    // 'Invalid authentication check. Please try again.'
    message: '유효하지 않은 인증 확인입니다. 다시 시도하십시오.',
  },
  InvalidEndpoints: {
    // 'Invalid authentication endpoints. Please contact support.'
    message: '유효하지 않은 인증 엔드포인트입니다. 지원팀에 문의하십시오.',
  },
  InvalidProvider: {
    // 'The authentication provider is invalid. Please check your configuration.'
    message: '인증 제공자가 유효하지 않습니다. 설정을 확인하십시오.',
  },
  JWTSessionError: {
    // 'There was an error with your session token. Please sign in again.'
    message: '세션 토큰에 오류가 있습니다. 다시 로그인하십시오.',
  },
  MissingAdapter: {
    // 'Authentication adapter is missing. Please contact support.'
    message: '인증 어댑터가 누락되었습니다. 지원팀에 문의하십시오.',
  },
  MissingAdapterMethods: {
    // 'Required adapter methods are missing. Please contact support.'
    message: '필수 어댑터 메서드가 누락되었습니다. 지원팀에 문의하십시오.',
  },
  MissingAuthorize: {
    // 'Authorization method is missing. Please contact support.'
    message: '인증 메서드가 누락되었습니다. 지원팀에 문의하십시오.',
  },
  MissingCSRF: {
    // 'CSRF token is missing or invalid. Please refresh the page and try again.'
    message: 'CSRF 토큰이 누락되었거나 유효하지 않습니다. 페이지를 새로 고치고 다시 시도하십시오.',
  },
  MissingSecret: {
    // 'Authentication secret is missing. Please contact support.'
    message: '인증 비밀이 누락되었습니다. 지원팀에 문의하십시오.',
  },
  MissingWebAuthnAutocomplete: {
    // 'WebAuthn autocomplete is missing. Please contact support.'
    message: 'WebAuthn 자동 완성이 누락되었습니다. 지원팀에 문의하십시오.',
  },
  OAuthAccountNotLinked: {
    // 'This OAuth account is not linked. Please link your account and try again.'
    message: '이 OAuth 계정이 연결되지 않았습니다. 계정을 연결하고 다시 시도하십시오.',
  },
  OAuthCallbackError: {
    // 'An error occurred during the OAuth callback. Please try again.'
    message: 'OAuth 콜백 중 오류가 발생했습니다. 다시 시도하십시오.',
  },
  OAuthProfileParseError: {
    // 'Unable to parse OAuth profile. Please try again.'
    message: 'OAuth 프로필을 구문 분석할 수 없습니다. 다시 시도하십시오.',
  },
  OAuthSignInError: {
    // 'There was an error signing in with OAuth. Please try again.'
    message: 'OAuth로 로그인하는 중 오류가 발생했습니다. 다시 시도하십시오.',
  },
  SessionTokenError: {
    // 'Session token is invalid or expired. Please sign in again.'
    message: '세션 토큰이 유효하지 않거나 만료되었습니다. 다시 로그인하십시오.',
  },
  SignOutError: {
    // 'There was an error signing out. Please try again.'
    message: '로그아웃 중 오류가 발생했습니다. 다시 시도하십시오.',
  },
  UnknownAction: {
    // 'An unknown action was attempted. Please try again.'
    message: '알 수 없는 작업이 시도되었습니다. 다시 시도하십시오.',
  },
  UnsupportedStrategy: {
    // 'This authentication strategy is not supported. Please contact support.'
    message: '이 인증 전략은 지원되지 않습니다. 지원팀에 문의하십시오.',
  },
  UntrustedHost: {
    // 'The host is not trusted. Please check your settings and try again.'
    message: '호스트가 신뢰되지 않습니다. 설정을 확인하고 다시 시도하십시오.',
  },
  Verification: {
    // 'Verification failed. Please check your details and try again.'
    message: '인증에 실패했습니다. 세부 정보를 확인하고 다시 시도하십시오.',
  },
  WebAuthnVerificationError: {
    // 'WebAuthn verification failed. Please try again.'
    message: 'WebAuthn 인증에 실패했습니다. 다시 시도하십시오.',
  },
  default: {
    // 'An unexpected error has occurred. Please try again.'
    message: '예기치 않은 오류가 발생했습니다. 다시 시도하십시오.',
  },
};
