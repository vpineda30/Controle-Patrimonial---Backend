import { randomUUID } from "crypto";
import { prisma } from "../../../../prisma/prisma";
import type { UserDTO } from "../dtos/user.dto";
import bcrypt from "bcrypt";

export class UserRepository {
    public async CreateUser(data: Omit<UserDTO, "id" | "role" | "createdAt">): Promise<void> {
        const userId = randomUUID()
        const passwordHash = await bcrypt.hash(data.password, 10);
        await prisma.user.create({
            data: {
                id: userId,
                name: data.name,
                email: data.email,
                password: passwordHash,
            },
        });
    }

    public async LoginUser(email: string, password: string): Promise<UserDTO | null> {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) return null;
        const isMatch = await bcrypt.compare(password, user.password);

        return isMatch ? user : null;
    }

    public async GetUserByEmail(email: string): Promise<UserDTO | null> {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        return user;
    }

    public async updatePassword(email: string, password: string) {
        const user = await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                password: await bcrypt.hash(password, 10),
            },
        });
        return user;
    }
}