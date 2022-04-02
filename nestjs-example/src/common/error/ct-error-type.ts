/**
 *
 */
export enum CtErrorType {
  //
  InternalServerError = 'InternalServerError',

  //
  ResourceNotFound = 'ResourceNotFound',

  //
  PermissionDenied = 'PermissionDenied',

  // 처리도지 않은 오류
  UnhandledError = 'UnhandledError',

  UnAuthenticated = 'UnAuthenticated',

  AccessTokenExpired = 'AccessTokenExpired',

  ReissuedAccessToken = 'ReissuedAccessToken',

  RefreshTokenExpired = 'RefreshTokenExpired',

  ExistedResources = 'ExistedResources',
}
