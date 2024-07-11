import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsValidApplication(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidApplication',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const allowedValues = ['website', 'admin', 'dashboard'];
          return (
            Array.isArray(value) &&
            value.every((v) => allowedValues.includes(v))
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `Each element in ${
            args.property
          } must be one of the following values: ${[
            'website',
            'admin',
            'dashboard',
          ].join(', ')}`;
        },
      },
    });
  };
}
