export type InputSelector = true | { [key: string]: InputSelector }; // recursive true value
export type CustomQuery = {
  body?: InputSelector;
  query?: InputSelector;
  param?: InputSelector;
};

export type SanitizerInput = 'body' | 'query' | 'param' | 'all' | CustomQuery;
export type SanitizerTarget = 'html' | 'xml' | 'json' | 'sql' | 'mongo' | 'all';

export interface SanitizerOptions {
  from?: SanitizerInput | SanitizerInput[];
  sanitize?: SanitizerTarget | SanitizerTarget[];
  includes?: string[];
  excludes?: string[];
  throwError?: boolean;
  logger?: ((message: string, ...args: any[]) => any) | null;
}
