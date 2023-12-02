import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from "fs";
import slugify from 'slugify';
import { PrismaService } from 'src/prisma.service';
import { CategoryService } from 'src/categories/categories.service';
import { BookInterface } from './interfaces/book.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { Thickness } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { QueryBookInterface } from './interfaces/query-book.interface';

@Injectable()
export class BookService {
  constructor (
    private readonly prisma: PrismaService,
    private readonly category: CategoryService
  ) {}

  async findAll (params: QueryBookInterface): Promise<BookInterface[]> {
    const query = [];
    const orderBy = {};

    if(params.title) query.push({ title: params.title });
    if(params.minYear) query.push({ release_year: { gte: Number(params.minYear) } });
    if(params.maxYear) query.push({ release_year: { lte: Number(params.maxYear) } });
    if(params.minPage) query.push({ release_year: { gte: Number(params.minPage) } });
    if(params.maxPage) query.push({ release_year: { lte: Number(params.maxPage) } });
    if(params.sortByTitle) orderBy["title"] = params.sortByTitle;

    return await this.prisma.book.findMany({
      where: {
        AND: query,
      },
      orderBy: [
        orderBy
      ]
    })
  }

  async create (category_id: number, file: Express.Multer.File, data: CreateBookDto) {
    const category = await this.category.findOne(Number(category_id));
    if(category == null) return null;
    let thickness: Thickness;
    const filename: string = slugify(`${data.title}.${file.mimetype.split('/')[1]}`);

    if(data.total_page <= 100) thickness = "tipis";
    else if(data.total_page >= 101 && data.total_page <= 200) thickness = 'sedang';
    else if(data.total_page >= 201) thickness = "tebal";

    try {
      const book = await this.prisma.book.create({
        data: {
          category_id: Number(data.category_id),
          title: data.title,
          description: data.description,
          image_url: filename,
          release_year: Number(data.release_year),
          price: Number(data.price),
          total_page: Number(data.total_page),
          thickness: thickness
        }
      })

      if(!fs.existsSync('./public/books')) fs.mkdirSync('./public/books', { recursive: true });
      fs.writeFileSync(`./public/books/${book.image_url}`, file.buffer);

      const response = {
        id: book.id,
        title: book.title,
        description: book.description,
        image: `books/${book.image_url}`,
        release_year: book.release_year,
        price: book.price,
        total_pages: book.total_page,
        thickness: book.thickness
      }

      return response;
    } catch (err) {
      if(err instanceof PrismaClientKnownRequestError) {
        if(err.code == "P2002" && err.meta?.target == "books_title_key") {
          throw new HttpException({
            code: 400,
            result: 'bad request',
            message: "Book name already exist"
          }, HttpStatus.BAD_REQUEST)
        }
      } else {
        throw new HttpException({
          code: 500,
          result: 'internal server error',
          message: err.message
        }, HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }
}
