import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment";

export function makeQuestionAttachment(override: Partial<QuestionAttachment> = {}, id?: UniqueEntityID) {
    const questionAttachment = QuestionAttachment.create(
        {
        questionId: new UniqueEntityID(),
        attachmentId: new UniqueEntityID(),
        ...override
        }, 
        id,
    );

    return questionAttachment
}