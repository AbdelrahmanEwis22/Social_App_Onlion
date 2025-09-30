import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";
import { BadRequestException } from "../utils/response/error.response";
import z from "zod";


type KeyReqType = keyof Request  //"body" | "params" | "query" | "headers" | "files" | "cookies" | "raw";
type SchemaType = Partial<Record<KeyReqType, ZodType>>;
type ValidationErrorType = Array<{
    key: KeyReqType;
    issues: Array<{
        message: string;
        path: string | number | symbol | undefined
    }>
}>;

export const validation = (schema: SchemaType) => {
    return (req: Request, res: Response, next: NextFunction): NextFunction => {
        console.log(schema);
        console.log(Object.keys(schema));
        const validationErrors: ValidationErrorType = [];
        for (const key of Object.keys(schema) as KeyReqType[]) {
            if (!schema[key]) continue;
            const validatedData = schema[key].safeParse(req[key]);
            if (!validatedData.success) {
                const errors = validatedData.error as ZodError;
                validationErrors.push({
                    key,
                    issues: errors.issues.map((issue) => {
                        return { message: issue.message, path: issue.path[0] }
                    })
                });
            }
        }
        if (validationErrors.length) {
            throw new BadRequestException("Validation error", {
                validationErrors,
            });
        }

        return next() as unknown as NextFunction;
    }
}

export const generalFields = {
    username: z
        .string({
            error: "Username is required",
        })
        .min(3, { error: "Username must be at least 3 characters long" })
        .max(20, { error: "Username must be at most 20 characters long" }),
    email: z
        .email({
            error: "Email is required",
        }),
    password: z
        .string({
            error: "Password is required",
        })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    confirmPassword: z
        .string({
            error: "Confirm Password is required",
        }),
}