"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.login = void 0;
const zod_1 = require("zod");
const validation_middleware_1 = require("../../middleware/validation.middleware");
exports.login = {
    body: zod_1.z.strictObject({
        email: validation_middleware_1.generalFields.email,
        password: validation_middleware_1.generalFields.password,
    })
};
exports.signup = {
    body: exports.login.body.extend({
        username: validation_middleware_1.generalFields.username,
        confirmPassword: validation_middleware_1.generalFields.confirmPassword,
    }).superRefine((data, ctx) => {
        console.log(data, ctx);
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                code: "custom",
                path: ["confirmPassword"],
                message: "Password and Confirm Password must be the same",
            });
        }
        if (data.username?.split(" ")?.length != 2) {
            ctx.addIssue({
                code: "custom",
                path: ["username"],
                message: "Username must be in the format of First Name Last Name",
            });
        }
        if (data.email?.split("@")?.length != 2) {
            ctx.addIssue({
                code: "custom",
                path: ["email"],
                message: "Email must be in the format of example@example.com",
            });
        }
    }),
};
