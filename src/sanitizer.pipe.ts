import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { SanitizerOptions } from './types';

@Injectable()
export class SanitizerPipe implements PipeTransform {
  constructor(private readonly options?: SanitizerOptions) {
    console.log(this.options);
  }

  transform(value: any, metadata: ArgumentMetadata) {
    console.log('metadata:', metadata);
    console.log('value:', value);

    throw new Error('Method not implemented.');
  }
}
