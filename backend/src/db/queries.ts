import { prisma } from "./prisma.js";

interface reqTypes {
    username: string,
    password: string,
    email: string,
}

export const createUser = async ({username, password, email}: reqTypes) => {
    const user = await prisma.user.create({
        data: {
            username: username,
            password: password,
            email: email,
        },
        select: {
            id: true,
            username: true,
            email: true,
        }
    });
    return user;
}
