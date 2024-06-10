import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class SanitizerPipe implements PipeTransform {
  constructor(private readonly options: any) {}

  transform(value: any, metadata: ArgumentMetadata) {
    console.log('metadata:', metadata);
    console.log('value:', value);

    throw new Error('Method not implemented.');
  }
}
