import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoryInterface } from './interfaces/category.interface';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class CategoryService {
  constructor (private prisma: PrismaService) {}

  async create (data: Prisma.CategoryCreateInput): Promise<CategoryInterface> {
    try {
      return await this.prisma.category.create({
        data
      })
    } catch (err) {
      if(err instanceof PrismaClientKnownRequestError) {
        if(err.code == "P2002" && err.meta?.target == "categories_name_key") {
          throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: "Category name already exist"
          }, HttpStatus.BAD_REQUEST)
        }
      } else {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: err.message
        }, HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }
}
