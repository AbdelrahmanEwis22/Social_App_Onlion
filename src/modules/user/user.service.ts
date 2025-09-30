import type { Request, Response } from "express";

class UserService {
    //Constructor
    constructor() {}
    //Get All Users
    getAllUsers = (req: Request, res: Response): Response => {
        return res.json({ message: "Done", data: req.body });
    }
}
export default new UserService();