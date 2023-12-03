import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    PrismaService,
    JwtService,
    UsersService
  ],
  exports: [UsersService]
})
export class UsersModule {}
