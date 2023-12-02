import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoryInterface } from './interfaces/category.interface';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class CategoryService {
  constructor (private prisma: PrismaService) {}

  async findAll (): Promise<CategoryInterface[]> {
    return await this.prisma.category.findMany({})
  }

  async create (data: Prisma.CategoryCreateInput): Promise<CategoryInterface> {
    try {
      return await this.prisma.category.create({
        data
      })
    } catch (err) {
      if(err instanceof PrismaClientKnownRequestError) {
        if(err.code == "P2002" && err.meta?.target == "categories_name_key") {
          throw new HttpException({
            code: 400,
            result: 'bad request',
            message: "Category name already exist"
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

  async update (id: number, data: Prisma.CategoryUpdateInput): Promise<CategoryInterface> {
    try {
      return await this.prisma.category.update({
        data: data,
        where: {
          id: id
        }
      })
    } catch (err) {
      if(err instanceof PrismaClientKnownRequestError) {
        if(err.code == "P2002" && err.meta?.target == "categories_name_key") {
          throw new HttpException({
            code: 400,
            result: 'bad request',
            message: "Category name already exist"
          }, HttpStatus.BAD_REQUEST)
        } else if(err.code == "P2025") {
          throw new HttpException({
            code: 404,
            result: 'not found',
            message: 'record to update not found'
          }, HttpStatus.NOT_FOUND)
        }else {
          throw new HttpException({
            code: 500,
            result: 'internal server error',
            message: err.message
          }, HttpStatus.INTERNAL_SERVER_ERROR)
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
