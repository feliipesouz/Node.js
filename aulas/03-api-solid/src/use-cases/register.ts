import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";

interface registerUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ name, email, password }: registerUseCaseRequest) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new Error("E-mail already exists.");
    }

    await this.usersRepository.create({ name, email, password_hash });
  }
}
