import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question, QuestionProps } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";
import {faker} from '@faker-js/faker'

export function MakeQuestion(override: Partial<QuestionProps>, id?: UniqueEntityID) {
    const newQuestion = Question.create({
        authorId: new UniqueEntityID(),
        title: faker.lorem.sentence(),
        slug: Slug.create('example-question'),
        content: faker.lorem.text(),
        ...override
    }, 
    id
);

    return newQuestion
}