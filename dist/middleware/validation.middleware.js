"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalFields = exports.validation = void 0;
const error_response_1 = require("../utils/response/error.response");
const zod_1 = __importDefault(require("zod"));
const validation = (schema) => {
    return (req, res, next) => {
        console.log(schema);
        console.log(Object.keys(schema));
        const validationErrors = [];
        for (const key of Object.keys(schema)) {
            if (!schema[key])
                continue;
            const validatedData = schema[key].safeParse(req[key]);
            if (!validatedData.success) {
                const errors = validatedData.error;
                validationErrors.push({
                    key,
                    issues: errors.issues.map((issue) => {
                        return { message: issue.message, path: issue.path[0] };
                    })
                });
            }
        }
        if (validationErrors.length) {
            throw new error_response_1.BadRequestException("Validation error", {
                validationErrors,
            });
        }
        return next();
    };
};
exports.validation = validation;
exports.generalFields = {
    username: zod_1.default
        .string({
        error: "Username is required",
    })
        .min(3, { error: "Username must be at least 3 characters long" })
        .max(20, { error: "Username must be at most 20 characters long" }),
    email: zod_1.default
        .email({
        error: "Email is required",
    }),
    password: zod_1.default
        .string({
        error: "Password is required",
    })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    confirmPassword: zod_1.default
        .string({
        error: "Confirm Password is required",
    }),
};
