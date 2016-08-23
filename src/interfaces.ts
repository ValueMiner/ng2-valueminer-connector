export interface OAuth2Config {
    authURL: string;
    redirectURL: string;
    scopes: [string];
    client_id: string;
}
