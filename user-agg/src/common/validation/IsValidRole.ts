import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsValidRole(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidRole',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const allowedValues = ['root', 'admin', 'dashboard'];
          return (
            Array.isArray(value) &&
            value.every((v) => allowedValues.includes(v))
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `Each element in ${
            args.property
          } must be one of the following values: ${[
            'root',
            'admin',
            'dashboard',
          ].join(', ')}`;
        },
      },
    });
  };
}
