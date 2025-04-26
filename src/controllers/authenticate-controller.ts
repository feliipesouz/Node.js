import { Post } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export class AuthenticateController {
    constructor(private jwt: JwtService) { }

    @Post()
    async handle() {
        const token = this.jwt.sign({ sub: 'user-id' })

        return token
    }
}