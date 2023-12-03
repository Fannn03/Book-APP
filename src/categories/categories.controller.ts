import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryInterface } from './interfaces/category.interface';
import { Response, response } from 'express';
import { BookService } from 'src/books/books.service';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoryService,
    private readonly booksService: BookService
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

  @Delete(':id')
  async deleteCategory (
    @Param() params: any,
    @Res() response: Response
  ) {
    try {
      const category = await this.categoriesService.delete(Number(params.id));

      return response.json({
        code: 200,
        result: 'ok',
        message: 'record deleted',
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

  @Get(':id/books')
  async getAllCategoryBooks (
    @Param() params: any,
    @Res() response: Response
  ) {
    const books = await this.booksService.findAllByCategoryId(Number(params.id));

    if(!books) return response.status(404).json({
      code: 404,
      result: 'not found',
      message: 'category id not found',
      data: books
    })
    
    return response.json({
      code: 200,
      result: 'ok',
      message: 'success fetch data',
      data: books
    })
  }
}
