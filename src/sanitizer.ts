import { UsePipes, applyDecorators } from '@nestjs/common';

import { SanitizerPipe } from './sanitizer.pipe';
import { SanitizerOptions } from './types';
import { DEFAULT_OPTIONS } from './constants';
import { Helpers } from './utils';

export function UseSanitizer(options: SanitizerOptions = {}) {
  // default values
  options.from = Helpers.simplifyFromQuery(options.from); // simplify inputs to avoid user bad inputs
  options.sanitize = Helpers.simplifySanitizerTargets(options.sanitize);
  if (!options.throwError) options.throwError = DEFAULT_OPTIONS.throwError;
  if (!options.logger) options.logger = DEFAULT_OPTIONS.logger;

  return applyDecorators(UsePipes(new SanitizerPipe(options)));
}
