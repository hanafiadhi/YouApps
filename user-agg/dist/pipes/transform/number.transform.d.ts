import { PipeTransform } from '@nestjs/common';
export declare class NumberTransformPipe implements PipeTransform {
    transform(value: number): number;
}
