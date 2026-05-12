import type { Request, Response } from "express";
import { UserService } from "../services/user.service";
import type { HTTP_RESPONSE } from "../dtos/user.dto";

const service = new UserService();

export class UserHandler {
    public async createUser(req: Request, res: Response) {
        await service.createUser(req.body);
        const response: HTTP_RESPONSE = {
            success: true,
            status: 201,
            message: "User created successfully"
        }
        return res.status(201).json(response);
    }

    public async loginUser(req: Request, res: Response) {
        const { user, token } = await service.loginUser(req.body.email, req.body.password);
        const response: HTTP_RESPONSE = {
            success: true,
            status: 200,
            message: { user, token }
        }
        return res.json({ user, token });
    }

    public async forgotPassword(req: Request, res: Response) {
        await service.forgotPassword(req.body.email);
        const response: HTTP_RESPONSE = {
            success: true,
            status: 200,
            message: "Password reset email sent"
        }
        return res.json(response);
    }

    public async updatePassword(req: Request, res: Response) {
        const user = await service.updatePassword(req.body.email, req.body.password);
        const response: HTTP_RESPONSE = {
            success: true,
            status: 200,
            message: user
        }
        return res.json(response);
    }
}