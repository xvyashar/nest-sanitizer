import { UsePipes, applyDecorators } from '@nestjs/common';
import { SanitizerPipe } from './sanitizer.pipe';

export function UseSanitizer(options: any) {
  return applyDecorators(UsePipes(new SanitizerPipe(options)));
}
