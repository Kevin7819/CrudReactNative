/**
 * This file defines mock environment variables (mocks) for tests.
 * When Jest runs tests, instead of reading the real variables from .env,
 * it will use these dummy values so that calls to Firebase will not fail
 * for lack of real credentials.
 */
module.exports = {
  API_KEY: 'test-api-key',
  AUTH_DOMAIN: 'test-auth-domain',
  PROJECT_ID: 'test-project-id',
  STORAGE_BUCKET: 'test-storage-bucket',
  MESSAGING_SENDER_ID: 'test-sender-id',
  APP_ID: 'test-app-id',
  MEASUREMENT_ID: 'test-measurement-id',
};
