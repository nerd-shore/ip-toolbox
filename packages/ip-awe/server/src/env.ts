import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: resolve(__dirname, '../.env') });

export interface EnvValues {
  allowedOrigins: string;
  authBaseUrl: string;
  authTokenClientId: string;
  authTokenClientSecret: string;
  authTokenValidAudience: string;
  authTokenValidIssuer: string;
  // @TODO FT for WIP-629 order notifications for FE client
  colibriOrderNotificationsEnabled: boolean;
  // @TODO FT for covid message
  covidNotificationActive: boolean;
  dbSslEnabled: string;
  environment: string;
  kafkaBrokers: string;
  kafkaEnabled: boolean;
  kafkaConsumerGroupId: string;
  kafkaSslEnabled: string;
  logLevel: string;
  neglectDispatchToCustomerColibriMessage: boolean;
  orderBackendBaseUrl: string;
  // @TODO FT for WIP-629 order notifications for FE client
  orderNotificationsEnabled: boolean;
  visionBackendBaseUrl: string;
  // @TODO FT for WIP-710 vision orders for notifications
  visionOrderNotificationsEnabled: boolean;
  wipCdnUrl: string;
}

export default function envValues(): EnvValues {
  return {
    allowedOrigins: process.env.ALLOWED_ORIGINS,
    authBaseUrl: process.env.AUTH_BASE_URL,
    authTokenClientId: process.env.AUTH_TOKEN_CLIENT_ID,
    authTokenClientSecret: process.env.AUTH_TOKEN_CLIENT_SECRET,
    authTokenValidAudience: process.env.AUTH_TOKEN_VALIDATION_AUDIENCE,
    authTokenValidIssuer: process.env.AUTH_TOKEN_VALIDATION_ISSUER,
    colibriOrderNotificationsEnabled: process.env.COLIBRI_ORDER_NOTIFICATIONS_ENABLED === 'true',
    covidNotificationActive: process.env.COVID_NOTIFICATION_ACTIVE === 'true',
    dbSslEnabled: process.env.DB_SSL_ENABLED,
    environment: process.env.ENVIRONMENT,
    kafkaBrokers: process.env.KAFKA_BROKERS,
    kafkaEnabled: process.env.KAFKA_ENABLED === 'true',
    kafkaConsumerGroupId: process.env.KAFKA_CONSUMER_GROUP_ID,
    kafkaSslEnabled: process.env.KAFKA_SSL_ENABLED,
    logLevel: process.env.LOG_LEVEL,
    neglectDispatchToCustomerColibriMessage: process.env.NEGLECT_DISPATCH_TO_CUSTOMER_COLIBRI_MESSAGE === 'true',
    orderBackendBaseUrl: process.env.ORDER_BACKEND_BASE_URL,
    orderNotificationsEnabled: process.env.ORDER_NOTIFICATIONS_ENABLED === 'true',
    visionBackendBaseUrl: process.env.VISION_BACKEND_BASE_URL,
    visionOrderNotificationsEnabled: process.env.VISION_ORDER_NOTIFICATIONS_ENABLED === 'true',
    wipCdnUrl: process.env.WIP_CDN_URL,
  };
}

export function getAllowedOrigins() {
  return envValues().allowedOrigins;
}

export function getAuthBaseUrl() {
  return envValues().authBaseUrl;
}

export function getAuthTokenClientSecret() {
  return envValues().authTokenClientSecret;
}

export function getAuthTokenClientId() {
  return envValues().authTokenClientId;
}

export function getAuthTokenValidIssuer() {
  return envValues().authTokenValidIssuer;
}

export function getAuthTokenValidAudience() {
  return envValues().authTokenValidAudience;
}

export function getDbSslEnabled() {
  return envValues().dbSslEnabled;
}

export function getOrderBackendBaseUrl() {
  return envValues().orderBackendBaseUrl;
}

export function isNeglectDispatchToCustomerColibriMessage() {
  return envValues().neglectDispatchToCustomerColibriMessage;
}

export function isCovidNotificationEnabled() {
  return envValues().covidNotificationActive;
}

export function isOrderNotificationsEnabled() {
  return envValues().orderNotificationsEnabled;
}

export function isColibriOrderNotificationsEnabled() {
  return envValues().colibriOrderNotificationsEnabled;
}

export function isVisionOrderNotificationsEnabled() {
  return envValues().visionOrderNotificationsEnabled;
}

export function getWipCdnUrl() {
  return envValues().wipCdnUrl;
}
