import { UsePipes, applyDecorators } from '@nestjs/common';

import { SanitizerPipe } from './sanitizer.pipe';
import { SanitizerOptions } from './types';

export function UseSanitizer(options?: SanitizerOptions) {
  return applyDecorators(UsePipes(new SanitizerPipe(options)));
}
