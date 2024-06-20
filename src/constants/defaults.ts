import { SanitizerOptions } from '../types';

export const DEFAULT_OPTIONS: SanitizerOptions = {
  from: 'all',
  sanitize: 'all',
  throwError: true,
  logger: null,
};
