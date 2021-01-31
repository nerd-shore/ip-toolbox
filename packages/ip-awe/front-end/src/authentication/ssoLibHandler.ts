import SsoLib, { Env, LogLevel, OidcParameter, User } from '@fielmann-ag/sso-client-lib';

import SsoLibMock from '../__mocks__/ssoLib';

import { envValues } from '../environment/env';

const oidcParameter: OidcParameter = {
  ssoBaseUrl: envValues().authBaseUrl,
  loggedOutUrl: `${window.location.origin}/loggedout`,
  silentRedirectUrl: `${window.location.origin}/silent-renew`,
};
let SsoLibHandler: SsoLib | SsoLibMock;

export function initSsoLib(updateSsoUser?: (user?: User) => void) {
  if (!oidcParameter.ssoBaseUrl) {
    // TODO remove as soon as we have our own mock-servers running
    SsoLibHandler = new SsoLibMock({
      environment: Env.DEV,
      onSsoUserUpdate: updateSsoUser as any,
      oidcParameter,
    });
  } else {
    SsoLibHandler = new SsoLib({
      logLevel: envValues().ssoLogLevel == 'debug' ? LogLevel.Debug : LogLevel.Error,
      onSsoUserUpdate: updateSsoUser,
      oidcParameter,
    });
  }
  return SsoLibHandler;
}
export async function getUser() {
  return await SsoLibHandler.getUser();
}

export function logIn(redirectUrl?: string) {
  return SsoLibHandler.login(redirectUrl);
}

export async function logOut() {
  return await SsoLibHandler.logout();
}

export function processSilentRenew() {
  return SsoLibHandler.getUser();
}
