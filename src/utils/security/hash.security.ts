import {compare, hash} from "bcrypt";

//Generate Hash
export const generateHash = async (plaintext: string, salt: number = Number(process.env.SALT)): Promise<string> => {
    return await hash(plaintext, salt);
}
//Compare Hash
export const compareHash = async (plaintext: string, hash: string): Promise<boolean> => {
    return await compare(plaintext, hash);
}