import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BookService } from './books.service';
import { PrismaService } from 'src/prisma.service';
import { CategoryService } from 'src/categories/categories.service';

@Module({
  controllers: [
    BooksController
  ],
  providers: [
    BookService,
    PrismaService,
    CategoryService
  ]
})
export class BooksModule {}
