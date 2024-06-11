type InputSelector = true | { [key: string]: InputSelector }; // recursive true value

export type SanitizerInput =
  | 'body'
  | 'query'
  | 'param'
  | 'all'
  | {
      body?: InputSelector;
      query?: InputSelector;
      param?: InputSelector;
    };

export type SanitizerTarget = 'html' | 'xml' | 'json' | 'sql' | 'mongo' | 'all';

export interface SanitizerOptions {
  from?: SanitizerInput | SanitizerInput[];
  sanitize?: SanitizerTarget | SanitizerTarget[];
  includes?: string[];
  excludes?: string[];
  logger?: (message: string, ...args: any[]) => any;
}
