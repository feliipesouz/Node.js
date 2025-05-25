import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth-guard";
import type { Request } from 'express'

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
    constructor() { }

    @Post()
    async handle(@Req() request: Request) {

        return "ok"
    }
}