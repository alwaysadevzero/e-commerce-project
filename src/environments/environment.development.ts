export const environment = {
  production: true,
  PROJECT_KEY: import.meta.env['CTP_PROJECT_KEY'],
  CLIENT_SECRET: import.meta.env['CTP_CLIENT_SECRET'],
  CLIENT_ID: import.meta.env['CTP_CLIENT_ID'],
  AUTH_URL: import.meta.env['CTP_AUTH_URL'],
  API_URL: import.meta.env['CTP_API_URL'],
}
