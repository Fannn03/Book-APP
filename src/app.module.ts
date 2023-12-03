import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CategoryService } from './categories/categories.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CategoriesModule } from './categories/categories.module';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: './public'
    }),
    CategoriesModule,
    BooksModule,
    UsersModule
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
