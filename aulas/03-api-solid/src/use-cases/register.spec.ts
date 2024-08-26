import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";

describe("Register Use Case", () => {
  it("Should hash user password upon registration", async () => {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(prismaUsersRepository);
    console.log("oi");
    const { user } = await registerUseCase.execute({
      name: "Felipe Arruda",
      email: "felipesoauzaero2aaaa1@gmail.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
