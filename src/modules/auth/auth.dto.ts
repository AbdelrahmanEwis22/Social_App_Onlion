// export interface ISignupBodyInputsDto {
//     username: string,
//     email: string,
//     password: string
// }

import * as validators  from "./auth.validation";
import {z} from "zod";

export type ISignupBodyInputsDto = z.infer<typeof validators.signup.body>