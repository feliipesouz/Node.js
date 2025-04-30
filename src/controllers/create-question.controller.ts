import { Controller, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth-guard";

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
    constructor() { }

    handle() {

    }
}