import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  private checkInsRepository;

  constructor(checkInsRepository: CheckInsRepository) {
    this.checkInsRepository = checkInsRepository;
  }

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    );

    if (checkInOnSameDay) {
      throw new Error();
    }

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return { checkIn };
  }
}
