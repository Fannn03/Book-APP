import { Module } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { CategoryService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaService } from 'src/prisma.service';
import { BookService } from 'src/books/books.service';

@Module({
  controllers: [
    CategoriesController
  ],
  providers: [
    JwtService,
    CategoryService,
    BookService,
    PrismaService
  ],
  exports: [CategoryService]
})
export class CategoriesModule {}
