import { Body, Controller, FileTypeValidator, HttpStatus, ParseFilePipe, ParseFilePipeBuilder, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BookService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, response } from 'express';

@Controller('books')
export class BooksController {
  constructor (
    private readonly booksService: BookService
  ) {}

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

    }
  }
}
