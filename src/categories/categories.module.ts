import { Module } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [
    CategoriesController
  ],
  providers: [
    CategoryService,
    PrismaService
  ],
  exports: [CategoryService]
})
export class CategoriesModule {}
