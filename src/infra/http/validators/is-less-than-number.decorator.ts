import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function IsLessThanNumber(
  propertyToCompare: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isLessThanNumber',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [propertyToCompare],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];

          if (typeof value !== 'number' || typeof relatedValue !== 'number') {
            return false;
          }

          return value < relatedValue;
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return `${args.property} must be less than ${relatedPropertyName}`;
        },
      },
    });
  };
}
