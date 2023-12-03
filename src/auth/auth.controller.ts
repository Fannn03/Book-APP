import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserRegisterDto } from './dto/user-register.dto';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';

@Controller()
export class AuthController {
  constructor (
    private readonly userService: UsersService
  ) {}

  @Post('/register')
  async register (
    @Body() data: UserRegisterDto,
    @Res() response: Response
  ) {
    try {
      const user = await this.userService.create({
        username: data.username,
        password: data.password
      });
      
      return response.json({
        code: 201,
        result: 'created',
        message: 'record created',
        data: user
      })
    } catch (err) {
      console.log(err);
      return response.status(err.status).json({
        code: err.response.code,
        result: err.response.result,
        message: err.response.message
      })
    }
  }
}
