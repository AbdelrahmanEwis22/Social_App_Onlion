import { model, models, Schema } from "mongoose";

export enum GenderEnum {
    male = "male",
    female = "female",
}
export enum RoleEnum {
    admin = "admin",
    user = "user",
}
export interface IUser {
    // _id: Types.ObjectId;

    username: string;
    firstName: string;
    lastName: string;

    email: string;
    confirmEmailOtp: string;
    confirmAt?: Date;

    password: string;
    resetPasswordOtp?: string;
    changeCredentialsTime?: Date;

    phone?: string;
    address?: string;

    gender: GenderEnum,
    role: RoleEnum,

    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

const userSchema = new Schema<IUser>(
    {
        firstName: { type: String, required: true, minlength: 2, maxlength: 25 },
        lastName: { type: String, required: true, minlength: 2, maxlength: 25 },

        email: { type: String, required: true, unique: true },
        confirmEmailOtp: { type: String },
        confirmAt: { type: Date },

        password: { type: String, required: true },
        resetPasswordOtp: { type: String },
        changeCredentialsTime: { type: Date },

        phone: { type: String },
        address: { type: String },

        gender: { type: String, enum: GenderEnum, default: GenderEnum.male },
        role: { type: String, enum: RoleEnum, default: RoleEnum.user },
    },

    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

userSchema.virtual("username").set(function (value: string) {
    const [firstName, lastName] = value.split(" ") || [];
    this.set("firstName", firstName);
    this.set("lastName", lastName);
}).get(function () {
    return this.firstName + " " + this.lastName;
});



export const UserModel = models.User || model<IUser>("User", userSchema);
