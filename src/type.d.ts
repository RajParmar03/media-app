export interface FindManyOptions {
    where?: any;
    orderBy?: any;
    skip?: number;
    take?: number;
}


export interface ActionResponse {
    success?: boolean;
    status?: number;
    data?: any;
    errors?: any;
    message?: string;
}

// ----- Platform Credentials ------ //
export enum CredentialsType {
    API_KEY = "API_KEY",
    BASIC_AUTH = "BASIC_AUTH", // username and password
    BEARER_TOKEN = "BEARER_TOKEN",
    JWT_TOKEN = "JWT_TOKEN",
    OAUTH = "OAUTH",
}
type ApiKey = { key: string; }
type OAuthToken = { clientId: string; clientSecret: string; code?: string; token: string; refreshToken?: string; redirectUri?: string; }
type BasicAuth = { username: string; password: string; } | { email: string; password: string; } | { phone: string; password: string; }
type JwtToken = { token: string; }
type BearerToken = { token: string; }
export type CredentialsKeys = ApiKey | OAuthToken | BasicAuth | JwtToken | BearerToken;
export type PlatformCredentialsSettings = { country?: string; language?: string; timezone?: string; ip?: string; origin?: string; proxy?: string; } // add more settings

export type PlatformSettings = { country?: string; city?: string; ip?: string; proxy?: string };
export type PlatformCredentials = {
    id: string; eId?: string; type: CredentialsType; label?: string;
    description?: string; note?: string; disabled?: boolean; status?: any; createdAt: Date; updatedAt: Date; settings?: PlatformCredentialsSettings;
} & CredentialsKeys;

// export type PlatformAccount = {
//     id: string; uId: string; creadentials: PlatformCredentials[]; settings: any;
//     disabled: boolean; status?: string; createdAt: Date; updatedAt: Date;
// }
// type PlatformCredentialsType = { id: string; type: ServiceCredentialsType; label?: string; description?: string; note?: string; disabled?: boolean | string; settings?: PlatformCredentialsSettings; createdAt: Date; updatedAt: Date; } & ServiceCredentialsKeys;

type AppSetting = { name: string; logo: string; favicon: string; mode: string; locale: string; timezone: string; currency: string; };
declare global {
    namespace PrismaJson {
        type StatusValue = { status: string; message: string; };
        type ChannelMetadata = {
            title: string; bio?: string; description?: string;
            cover?: string; image?: string; language: string; country: string; tags?: string[]; categories?: string[];
        };
        type ChannelPreferences = {
            theme: string; layout: string; color: string; font: string; fontSize: string; fontFamily: string;
        };
        type ChannelSettings = {
            metadata: ChannelMetadata; preferences: ChannelPreferences;
        };
        type ImagePath = { src: string; size?: string; orientation?: string; } | string;
        PlatformCredentials;
        type AppSettingsValues =
            // app, integration, pl
            { name: string; logo: ImagePath; favicon: ImagePath; mode: string; locale: string; timezone: string; currency: string }
            | ServiceCredentialsValues[];
    }
}
