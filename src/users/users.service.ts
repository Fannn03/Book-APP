import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserLoginInterface } from './interfaces/user-login.interface';

@Injectable()
export class UsersService {
  constructor (
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}
  
  async create (data: Prisma.UserCreateInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    try {
      const user =  await this.prisma.user.create({
        data: data
      })

      return {
        id: user.id,
        username: user.username
      }
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

  async login (data: UserLoginInterface) {
    const user =  await this.prisma.user.findFirst({
      where: { username: data.username }
    })
    if(!user) throw new HttpException({
      code: 404,
      result: 'not found',
      message: 'user not found'
    }, HttpStatus.NOT_FOUND);
  
    const comparePassword = await bcrypt.compare(data.password, user.password);
    if(!comparePassword) throw new HttpException({
      code: 400,
      result: 'bad request',
      message: 'invalid password'
    }, HttpStatus.BAD_REQUEST);

    const payload = {
      id: user.id,
      username: user.username
    }

    return {
      username: user.username,
      token: await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET })
    };
  }
}
