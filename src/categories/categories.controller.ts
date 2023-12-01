import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoryService
  ) {}

  @Post()
  async createCategory (@Body() data: CreateCategoryDto) {
    return this.categoriesService.create({
      name: data.name
    })
  }
}
