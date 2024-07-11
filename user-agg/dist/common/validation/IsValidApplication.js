"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidApplication = void 0;
const class_validator_1 = require("class-validator");
function IsValidApplication(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isValidApplication',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const allowedValues = ['website', 'admin', 'dashboard'];
                    return (Array.isArray(value) &&
                        value.every((v) => allowedValues.includes(v)));
                },
                defaultMessage(args) {
                    return `Each element in ${args.property} must be one of the following values: ${[
                        'website',
                        'admin',
                        'dashboard',
                    ].join(', ')}`;
                },
            },
        });
    };
}
exports.IsValidApplication = IsValidApplication;
//# sourceMappingURL=IsValidApplication.js.map