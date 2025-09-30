import type { Request, Response } from "express";
import type { ISignupBodyInputsDto } from "./auth.dto";
import { UserModel } from "../../DB/model/User.model";
import { UserRepository } from "../../DB/repository/user.repository";
import { ConflictException } from "../../utils/response/error.response";
import { generateHash } from "../../utils/security/hash.security";



class AuthenticationService {
    private userModel = new UserRepository(UserModel);
    //Constructor
    constructor() {
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
    }
    //Signup
    signup = async (req: Request, res: Response): Promise<Response> => {
        const { username, email, password }: ISignupBodyInputsDto = req.body;
        console.log({ username, email, password });
        const checkUserExists = await this.userModel.findOne({
            filter: { email },
            select: "email",
            options:{
                lean: false,
            }
        });
        console.log({ checkUserExists });
        if (checkUserExists) {
            throw new ConflictException("User already exists");
        }

        const user = await this.userModel.createUser({
            data: [{ username, email, password: await generateHash(password) }],
        });
        return res.status(201).json({ message: "Done", data: { user } });
        // throw new BadRequestException("Fail",{extra:"Extra Information"})

    }
    //Login
    login = (req: Request, res: Response): Response => {
        return res.json({ message: "Done", data: req.body });
    }
}
export default new AuthenticationService();