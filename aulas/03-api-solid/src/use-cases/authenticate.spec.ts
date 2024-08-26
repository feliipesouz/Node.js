import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import bcrypt from "bcryptjs";
import { InvalidCredential } from "./errors/invalid-credentials-error";

describe("Authenticate Use Case", () => {
  it("Should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "Felipe",
      email: "felipesouzaero@gmail.com",
      password_hash: await bcrypt.hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "felipesouzaero@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("Should not be able to authenticate with wrong email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await expect(() =>
      sut.execute({
        email: "felipesouzaero@gmail.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredential);
  });

  it("Should not be able to authenticate with wrong password", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await expect(() =>
      sut.execute({
        email: "felipesouzaero@gmail.com",
        password: "123123",
      }),
    ).rejects.toBeInstanceOf(InvalidCredential);
  });
});
