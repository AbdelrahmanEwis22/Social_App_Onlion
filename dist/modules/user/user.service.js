"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserService {
    constructor() { }
    getAllUsers = (req, res) => {
        return res.json({ message: "Done", data: req.body });
    };
}
exports.default = new UserService();
