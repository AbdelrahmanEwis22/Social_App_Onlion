
import { z } from "zod";
import { generalFields } from "../../middleware/validation.middleware";


export const login = {
    body: z.strictObject({
        email: generalFields.email,
        password: generalFields.password,
    })
}

export const signup = {
    body: login.body.extend({
        username: generalFields.username,
        confirmPassword: generalFields.confirmPassword,
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
}