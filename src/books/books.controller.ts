import { Body, Controller, FileTypeValidator,  Get,  ParseFilePipe, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BookService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { sortByTitle } from './interfaces/query-book.interface';

@Controller('books')
export class BooksController {
  constructor (
    private readonly booksService: BookService
  ) {}

  @Get()
  async findAllBook (
    @Query('title') title: string,
    @Query('minYear') minYear: number,
    @Query('maxYear') maxYear: number,
    @Query('minPage') minPage: number,
    @Query('maxPage') maxPage: number,
    @Query('sortByTitle') sortByTitle: sortByTitle,
    @Res() response: Response
  ) {
    const books = await this.booksService.findAll({
      title: title,
      minYear: minYear,
      maxYear: maxYear,
      minPage: minPage,
      maxPage: maxPage,
      sortByTitle: sortByTitle
    });

    return response.json({
      code: 200,
      result: 'ok',
      message: 'success get record data',
      data: books
    })
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createBook (
    @Body() data: CreateBookDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg)' })
        ]
      })
    ) file: Express.Multer.File,
    @Res() response: Response
  ) {
    try {
      const category = await this.booksService.create(data.category_id, file, data);
      if(!category) return response.status(404).json({
        code: 404,
        result: 'not found',
        message: 'category id not found'
      })

      return response.status(201).json({
        code: 201,
        result: 'created',
        message: 'record created',
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
