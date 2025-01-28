import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { QuestionComment } from "../../enterprise/entities/question-comment";

export interface AnswerCommentsRepository {
    findById(id: string): Promise<AnswerComment | null>
    findManyByAnswerId(answerId: string, params: PaginationParams): Promise<AnswerComment[]>
    create(answerComment: AnswerComment): Promise<void> 
    delete(answerComment: AnswerComment): Promise<void>
}