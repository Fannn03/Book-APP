import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CategoryService } from './categories/categories.service';
import { CategoriesController } from './categories/categories.controller';
import { PrismaService } from './prisma.service';
import { BooksController } from './books/books.controller';
import { BookService } from './books/books.service';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: './public'
    })
  ],
  controllers: [
    AppController,
    CategoriesController,
    BooksController
  ],
  providers: [
    AppService,
    PrismaService,
    CategoryService,
    BookService
  ],
})
export class AppModule {}
