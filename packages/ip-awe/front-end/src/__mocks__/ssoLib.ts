import axios from 'axios';

export interface OidcParameters {
  accessTokenExpiringNotificationTime?: number;
  clientId?: string;
  logLevel?: any;
  silentRedirectUrl?: string;
  ssoBaseUrl?: string;
}

export enum Env {
  LOCAL,
  DEV,
  QA,
  PROD,
}

export interface AuthObject {
  accessToken: string;
  expiresIn: number;
  expiresAt: number;
  tokenType: string;
  scope: string;
}

export interface UserInfo {
  sub: string;
  accountId: string;
  email: string;
}

export interface User {
  auth: AuthObject | null;
  userInfo: UserInfo | null;
}

interface Props {
  environment?: Env;
  loggedOutUrl?: string;
  oidcParameter?: OidcParameters;
  onSsoUserUpdate?: (user?: User | null) => void;
}

export default class SsoLib {
  constructor(props?: Props) {
    if (!process.env.JEST_WORKER_ID) {
      setTimeout(async () => {
        const userData = await this.getUser();
        await props?.onSsoUserUpdate!(userData);
      }, 3000);
    }
  }

  async getAuthObject(): Promise<any> {
    try {
      const authUrl = 'https://wip-sso-mock.ae.dev.cloudhh.de/auth/realms/Fielmann/protocol/openid-connect/token';
      const response = await axios({
        url: authUrl,
        method: 'post',
        data: {
          /*eslint-disable */
          client_id: 'mfm-account-fe',
          /*eslint-enable */
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getUserInfo(): Promise<any> {
    try {
      const authUrl = 'https://wip-sso-mock.ae.dev.cloudhh.de/auth/realms/Fielmann/protocol/openid-connect/userinfo';
      const response = await axios({
        url: authUrl,
        method: 'get',
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  getUser(): Promise<User | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const loggedIn = window.localStorage.getItem('wip_sso_mock_login_state');
        const auth = {
          accessToken: 'TestToken',
          expiresIn: 99999999999999,
          expiresAt: 99999999999999,
          tokenType: 'Token',
          scope: 'Scope',
        };

        const userInfo = {
          sub: 'Test',
          accountId: '123',
          email: 'test@wip.de',
        };

        if (loggedIn) {
          resolve({ auth, userInfo });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }

  _getUser(): Promise<User | null> {
    return new Promise(async (resolve) => {
      let auth: AuthObject | null = null;
      let userInfo: UserInfo | null = null;
      await this.getAuthObject().then((res) => (auth = res));
      await this.getUserInfo().then((res) => (userInfo = res));

      setTimeout(() => {
        const loggedIn = window.localStorage.getItem('wip_sso_mock_login_state');
        if (loggedIn !== null && loggedIn === 'true') {
          resolve({
            auth,
            userInfo,
          } as User);
        } else {
          resolve(null);
        }
      }, 700);
    });
  }

  login(callbackURL?: string): Promise<void> {
    return new Promise((resolve) => {
      window.localStorage.setItem('wip_sso_mock_login_state', 'true');
      if (callbackURL) {
        window.location.assign(callbackURL);
      }
      resolve();
    });
  }

  logout(): Promise<void> {
    window.localStorage.removeItem('wip_sso_mock_login_state');

    return new Promise((resolve) => {
      setTimeout(() => {
        window.location.assign('/loggedout');
        resolve();
      }, 400);
    });
  }
}
