import {connect} from "mongoose";
import { UserModel } from "./model/User.model";

export const connection = async (): Promise<void> => {
    try {
        const result = await connect(process.env.DB_URI as string,{
            serverSelectionTimeoutMS: 30000,
        });
        await UserModel.syncIndexes();
        console.log(result.models);
        console.log("Connected to MongoDB  successfully ✅🚀 ");
    } catch (error) {
        console.log(`Fail to connect to MongoDB ❌ ${error}`);
    }
}

export default connection;