import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("Should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    console.log(checkIn.created_at);

    expect(checkIn.id).toEqual(expect.any(String));
  });

  // red, green, refactor

  it("Should not be able to check in twice in the same day.", async () => {
    vi.setSystemTime(new Date(2024, 7, 27, 14, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it("Should be able to check in twice but in different day.", async () => {
    vi.setSystemTime(new Date(2024, 7, 26, 14, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    vi.setSystemTime(new Date(2024, 7, 27, 14, 0, 0));

    const { checkIn } = sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
