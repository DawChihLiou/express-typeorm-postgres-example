import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator'

/**
 * Custom validation decorator
 * @param property
 * @param validationOptions
 */
export function IsBadgeAlignedWith(
  property: string,
  validationOptions?: ValidationOptions
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isBadgeColorAlignedWith',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          const relatedValue = (args.object as any)[relatedPropertyName]
          const isTypesCorrect =
            typeof value === 'string' && typeof relatedValue === 'number'

          if (relatedValue <= 300) {
            return isTypesCorrect && value === 'awf'
          }
          if (relatedValue <= 700) {
            return isTypesCorrect && value === 'meh'
          }
          return isTypesCorrect && value === 'awesome'
        },
      },
    })
  }
}
