export default interface OidcUser {
  id_token: string;
  session_state: unknown;
  access_token: string;
  refresh_token: string;
  token_type: string;
  scope: string;
  profile: { mfm: { 'account-id': string } };
  expires_at: number;
  state: unknown;

  readonly expires_in: number | undefined;
  readonly expired: boolean | undefined;
  readonly scopes: string[];

  toStorageString(): string;
}
