import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CategoryService } from './categories/categories.service';
import { CategoriesController } from './categories/categories.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot()
  ],
  controllers: [AppController, CategoriesController],
  providers: [
    AppService,
    CategoryService,
    PrismaService
  ],
})
export class AppModule {}
