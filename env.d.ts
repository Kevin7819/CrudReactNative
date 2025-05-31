// Declaration of a virtual module called '@env'.
// This tells TypeScript that when we import from '@env',
// there will be a module containing the constants defined below.
declare module '@env' {
  export const API_KEY: string; // Firebase API key (or any service key) as a text string
  export const AUTH_DOMAIN: string;
  export const PROJECT_ID: string;
  export const STORAGE_BUCKET: string;
  export const MESSAGING_SENDER_ID: string;
  export const APP_ID: string;
  export const MEASUREMENT_ID: string;
}
