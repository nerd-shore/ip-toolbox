import axios from 'axios';
import * as jwt from 'jsonwebtoken';

import { getAuthBaseUrl, getAuthTokenClientId, getAuthTokenClientSecret } from '../env';

const EXPIRY_DATE_OFFSET_MS = 60000;
const __clientId = getAuthTokenClientId();
const __clientSecret = getAuthTokenClientSecret();
const __authBaseUrl = getAuthBaseUrl();
let __accessToken: string | null = null;
let __estimatedExpiryDate = 0;

function setEstimatedExpiryDate(exp: number) {
  __estimatedExpiryDate = exp * 1000 - EXPIRY_DATE_OFFSET_MS;
}

async function getAccessToken(): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const formData = {
        grant_type: 'client_credentials',
        client_id: __clientId,
        client_secret: __clientSecret,
      };
      const config = {
        headers: {
          accept: 'application/json',
        },
      };

      const encodeForm = data => {
        return Object.keys(data)
          .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
          .join('&');
      };
      const data = encodeForm(formData);

      const response = await axios.post(`${__authBaseUrl}/protocol/openid-connect/token`, data, config);
      const decoded = jwt.decode(response.data['access_token'], { complete: true });
      __accessToken = response.data['access_token'];
      setEstimatedExpiryDate(decoded['payload'].exp);
      return resolve();
    } catch (err) {
      const msg = `Unable to fetch access token. Setting it to null and trying again in 1000ms: ${err}`;
      console.warn(msg);
      __accessToken = null;
      setTimeout(async () => await getAccessToken(), 1000);
    }
  });
}

function isTokenExpired() {
  const now = new Date().getTime();

  return now > __estimatedExpiryDate;
}

async function checkForAccessToken(): Promise<void> {
  return new Promise<void>(async resolve => {
    const expired = isTokenExpired();
    console.debug('Client Token expired. Requesting a new one.');
    if (expired) {
      await getAccessToken();
    }
    resolve();
  });
}

export function getPersistedAccessToken() {
  return __accessToken;
}

export const provideClientAccessToken = async () => {
  console.info('Started access token provider');

  setInterval(async () => await checkForAccessToken(), 5000);

  await checkForAccessToken();
};
