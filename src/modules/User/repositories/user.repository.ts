import { randomUUID } from "crypto";
import { prisma } from "../../../../prisma/prisma";
import type { UserDTO } from "../dtos/user.dto";

export class UserRepository {
    public async CreateUser(data: UserDTO) {
        const userId = randomUUID()
        await prisma.user.create({
            data: {
                id: userId,
                name: data.name,
                email: data.email,
                password: data.password,
            },
        });
    }

    public async LoginUser(email: string, password: string) {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) throw new Error("User not found");
        return user;
    }
}