
import { DatabaseRepository } from "./database.repository";
import { IUser as TDocument } from "../model/User.model";
import { CreateOptions, HydratedDocument, Model } from "mongoose";
import { BadRequestException } from "../../utils/response/error.response";


export class UserRepository extends DatabaseRepository<TDocument> {
    //Constructor
    constructor(protected override readonly model: Model<TDocument>) {
        super(model);   
    }
    //Create User
    async createUser({
        data,
        options,
    }: {
        data: Partial<TDocument>[],
        options?: CreateOptions,
    }): Promise<HydratedDocument<TDocument>> {
        const [user] = await this.create( {data, options }) || [];
        if (!user) {
            throw new BadRequestException("Failed to create user");
        }
        return user;
    }
}