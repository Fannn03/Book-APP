import { Module } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { BooksController } from './books.controller';
import { BookService } from './books.service';
import { PrismaService } from 'src/prisma.service';
import { CategoryService } from 'src/categories/categories.service';

@Module({
  controllers: [
    BooksController
  ],
  providers: [
    JwtService,
    BookService,
    PrismaService,
    CategoryService
  ],
  exports: [BookService]
})
export class BooksModule {}
