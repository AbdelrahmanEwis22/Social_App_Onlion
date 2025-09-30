"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = require("../../DB/model/User.model");
const user_repository_1 = require("../../DB/repository/user.repository");
const error_response_1 = require("../../utils/response/error.response");
const hash_security_1 = require("../../utils/security/hash.security");
class AuthenticationService {
    userModel = new user_repository_1.UserRepository(User_model_1.UserModel);
    constructor() {
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
    }
    signup = async (req, res) => {
        const { username, email, password } = req.body;
        console.log({ username, email, password });
        const checkUserExists = await this.userModel.findOne({
            filter: { email },
            select: "email",
            options: {
                lean: false,
            }
        });
        console.log({ checkUserExists });
        if (checkUserExists) {
            throw new error_response_1.ConflictException("User already exists");
        }
        const user = await this.userModel.createUser({
            data: [{ username, email, password: await (0, hash_security_1.generateHash)(password) }],
        });
        return res.status(201).json({ message: "Done", data: { user } });
    };
    login = (req, res) => {
        return res.json({ message: "Done", data: req.body });
    };
}
exports.default = new AuthenticationService();
