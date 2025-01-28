import { Injectable, Logger, OnModuleInit, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';


@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit{

  private readonly logger = new Logger(ProductsService.name);

  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the DATABASE');

  }

  create(createProductDto: CreateProductDto) {
    return  this.product.create({
      data: createProductDto
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    const totalPages = await this.product.count({ 
      where: { available: true } 
    });
    const lastPage = Math.ceil(totalPages / limit);

    return {
      data: await this.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { available: true }
      }),
      meta: {
        total: totalPages,
        page,
        lastPage,
      }
    }
  }

  async findOne(id: number) {
    if (!id) {
      throw new NotFoundException('Product ID is required');
    }
    if (typeof id !== 'number') {
      throw new NotFoundException('Invalid Product ID, must be a number');
    }

    const product = await this.product.findUnique({
      where: { id , available: true }
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    return this.product.update({
      where: { id },
      data: updateProductDto
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    const product = await this.product.update({
      where: { id },
      data: { 
        available: false 
      }
    });
    return {product, message: 'Product deleted successfully'};
  }
}
