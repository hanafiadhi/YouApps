"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidRole = void 0;
const class_validator_1 = require("class-validator");
function IsValidRole(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isValidRole',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const allowedValues = ['root', 'admin', 'dashboard'];
                    return (Array.isArray(value) &&
                        value.every((v) => allowedValues.includes(v)));
                },
                defaultMessage(args) {
                    return `Each element in ${args.property} must be one of the following values: ${[
                        'root',
                        'admin',
                        'dashboard',
                    ].join(', ')}`;
                },
            },
        });
    };
}
exports.IsValidRole = IsValidRole;
//# sourceMappingURL=IsValidRole.js.map