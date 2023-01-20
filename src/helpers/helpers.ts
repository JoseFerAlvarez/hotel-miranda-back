import bcrypt from "bcrypt";

export async function getHashPass(pass: string): Promise<string> {
    return await bcrypt.hash(pass, 10)
        .then((result) => result);
}

export async function comparePassHash(userpass: string, dbpass: string): Promise<boolean> {
    return await bcrypt.compare(userpass, dbpass);
}
