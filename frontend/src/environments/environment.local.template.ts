/**
 * adapt this file to your need and rename it "environment.local.ts"
 * It is excluded from git so no change will be shared with your team.
 */
import { Environment } from './environment.interface';

export const environment: Environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  dateLocale: 'de-CH',
  useDevMode: true
};
