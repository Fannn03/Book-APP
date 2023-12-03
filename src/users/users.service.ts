import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor (
    private readonly prisma: PrismaService
  ) {}
  
  async create (data: Prisma.UserCreateInput) {
    try {
      return await this.prisma.user.create({
        data: data
      })
    } catch (err) {
      if(err instanceof PrismaClientKnownRequestError) {
        if(err.code == "P2002" && err.meta?.target == "users_username_key") {
          throw new HttpException({
            code: 400,
            result: 'bad request',
            message: "Username already exist"
          }, HttpStatus.BAD_REQUEST)
        }
      } else {
        throw new HttpException({
          code: 500,
          result: 'internal server error',
          message: err.message
        }, HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }
}
