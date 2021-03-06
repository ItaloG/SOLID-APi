import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    try {
      const user = await this.createUserUseCase.execute({
        name,
        email,
        password,
      });

      return response.status(200).send(user);
    } catch (err: any) {
      return response.status(400).json({
        message: err.message || "Unexpocted error.",
      });
    }
  }
}
