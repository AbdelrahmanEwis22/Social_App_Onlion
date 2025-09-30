//Setup ENV
import { resolve } from "node:path";
import { config } from "dotenv";
config({ path: resolve("./config/.env.development") });

//Load Express And Types
import type { Request, Express, Response } from "express"
import express from "express";

//Third-Party-Middlewares
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

//Import Modules
import authController from "./modules/auth/auth.controller";
import userController from "./modules/user/user.controller";
import { globalErrorHandler } from "./utils/response/error.response";

//Import DB Connection
import connection from "./DB/connection.db";

//Handle Rate Limit
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 20000,
    message: { error: "Too many requests, please try again later." },
    statusCode: 429,
});

//Bootstrap Function App Start Point
const bootstrap = async (): Promise<void> => {
    //Express App
    const app: Express = express();
    const port: number | string = process.env.PORT || 5000;
    // Middlewares
    app.use(cors(), express.json(), helmet(), limiter);
    //App Routes
    app.get("/", (req: Request, res: Response) => {
        res.json({ message: `Welcome To ${process.env.APPLICATION_NAME}👍 Backend Landing Page 🤝` });
    });
    //Sub-App-Routes-Modules
    app.use("/auth", authController);
    app.use("/user", userController);
    //Invalid Route
    app.use("{/*dummy}", (req: Request, res: Response) => {
        return res.status(404).json({ message: "Invalid Application Route 😭" });
    });
    //Global Error Handler
    app.use(globalErrorHandler);
    //Connect to DB
    await connection();
    // Server
    app.listen(port, () => {
        console.log(`Server is running on port :::${port} 😁👍`);
    });
};
export default bootstrap;
