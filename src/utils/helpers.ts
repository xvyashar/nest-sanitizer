import {
  CustomQuery,
  InputSelector,
  SanitizerInput,
  SanitizerTarget,
} from '../types';
import { DEFAULT_OPTIONS } from '../constants';

export class Helpers {
  static simplifyFromQuery(
    input?: SanitizerInput | SanitizerInput[],
  ): SanitizerInput | SanitizerInput[] | undefined {
    if (!input) return DEFAULT_OPTIONS.from; // input is undefined

    // input is defined
    if (!Array.isArray(input)) return input; // input is not array

    // input is an array
    if (input.length <= 0) return DEFAULT_OPTIONS.from; // input is empty
    if (input.length === 1) return input[0]; // input has one member

    // input is not empty
    if (input.includes('all')) return 'all';

    const customQueries: CustomQuery[] = input.filter(
      (i) => typeof i === 'object',
    ) as CustomQuery[];
    let mergedQueries: CustomQuery = customQueries[0];

    if (customQueries.length <= 1 && input.length === 1) return input; // input does not contain or its just one custom queries there

    // Merge custom queries
    if (customQueries.length > 1)
      mergedQueries = {
        body: this.deepMerge(
          {},
          ...(customQueries.map((q) => q.body) as InputSelector[]),
        ),
        query: this.deepMerge(
          {},
          ...(customQueries.map((q) => q.query) as InputSelector[]),
        ),
        param: this.deepMerge(
          {},
          ...(customQueries.map((q) => q.param) as InputSelector[]),
        ),
      }; // input contains multiple custom queries

    const predefinedTags = this.uniqueArray(
      input.filter((i) => typeof i === 'string'),
    ) as Exclude<CustomQuery, InputSelector>[];

    if (mergedQueries)
      for (const tag of predefinedTags) {
        if (tag === 'body') delete mergedQueries.body;
        else if (tag === 'query') delete mergedQueries.query;
        else if (tag === 'param') delete mergedQueries.param;
      }

    return mergedQueries && Object.keys(mergedQueries).length
      ? [...predefinedTags, mergedQueries]
      : predefinedTags;
  }

  static simplifySanitizerTargets(
    targets: SanitizerTarget | SanitizerTarget[] | undefined,
  ): SanitizerTarget | SanitizerTarget[] | undefined {
    if (!targets) return DEFAULT_OPTIONS.sanitize;

    if (!Array.isArray(targets)) return targets; // input is not array

    if (targets.includes('all')) return 'all';

    return this.uniqueArray(targets);
  }

  static uniqueArray<T>(arr: T[]): T[] {
    if (arr.length) return Array.from(new Set(arr));
    else return [];
  }

  static deepMerge(
    target: InputSelector | undefined,
    ...sources: InputSelector[]
  ): InputSelector | undefined {
    if (!sources.length) return target;
    const source = sources.shift();

    if (target !== true && source !== true) {
      for (const key in source) {
        if (source[key] !== true) {
          if (target !== undefined && !target?.[key])
            Object.assign(target, { [key]: {} });
          this.deepMerge(target?.[key], source[key]);
        } else if (target !== undefined) {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }

    return this.deepMerge(target, ...sources);
  }
}
