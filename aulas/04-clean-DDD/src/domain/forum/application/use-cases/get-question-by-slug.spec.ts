import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { CreateQuestionUseCase } from "./create-question";
import { GetQuestionBySlug } from "./get-question-by-slug";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { Question } from "../../enterprise/entities/question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";


let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlug

describe('Get Question By Slug', () => {
  beforeEach(()=> {
     inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
     sut = new GetQuestionBySlug(inMemoryQuestionsRepository);
  })
  
  it("should be able to get a question by slug", async () => {
    
    const newQuestion = await Question.create({
        authorId: new UniqueEntityID(),
        title: "Example-question",
        slug: Slug.create('example-question'),
        content: 'Example content'
      });

      inMemoryQuestionsRepository.create(newQuestion)
      
      const { question } = await sut.execute({
        slug: 'example-question'
      });
  
  expect(question.id).toBeTruthy();
  expect(question.title).toEqual(newQuestion.title)
});
})
