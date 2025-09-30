"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mongoose_1 = require("mongoose");
const User_model_1 = require("./model/User.model");
const connection = async () => {
    try {
        const result = await (0, mongoose_1.connect)(process.env.DB_URI, {
            serverSelectionTimeoutMS: 30000,
        });
        await User_model_1.UserModel.syncIndexes();
        console.log(result.models);
        console.log("Connected to MongoDB  successfully ✅🚀 ");
    }
    catch (error) {
        console.log(`Fail to connect to MongoDB ❌ ${error}`);
    }
};
exports.connection = connection;
exports.default = exports.connection;
