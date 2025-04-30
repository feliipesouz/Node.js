import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from './create-account-controller'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { JwtStrategy } from './auth/jwt.strategy'

@Module({
  imports: [ConfigModule.forRoot({
    validate: (env) => envSchema.parse(env),
    isGlobal: true
  })],
  controllers: [CreateAccountController, AuthenticateController, CreateQuestionController],
  providers: [PrismaService, JwtStrategy],
})
export class AppModule { }
