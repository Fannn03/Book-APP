import { Body, Controller, Get, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryInterface } from './interfaces/category.interface';
import { Response } from 'express';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoryService
  ) {}

  @Get()
  async getAllCategory (
    @Res() response: Response
  ): Promise<Response> {
    const categories: CategoryInterface[] = await this.categoriesService.findAll();

    return response.json({
      code: 200,
      result: 'ok',
      data: categories
    })
  }

  @Post()
  async createCategory (
    @Body() data: CreateCategoryDto,
    @Res() response: Response
    ) {
    try {
      const category: CategoryInterface = await this.categoriesService.create({
        name: data.name
      })

      return response.json({
        code: 201,
        result: 'created',
        data: category
      })
    } catch (err) {
      return response.status(err.status).json({
        code: err.response.code,
        result: err.response.result,
        message: err.response.message
      })
    }
  }

  @Patch(':id')
  async updateCategory (
    @Param() params: any,
    @Body() data: CreateCategoryDto,
    @Res() response: Response
  ) {
    try {
      const category = await this.categoriesService.update(Number(params.id), {
        name: data.name
      })

      return response.json({
        code: 200,
        result: 'ok',
        data: category
      })
    } catch (err) {
      return response.status(err.status).json({
        code: err.response.code,
        result: err.response.result,
        message: err.response.message
      })
    }
  }
}
