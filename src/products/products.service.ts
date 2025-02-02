import { Injectable, Logger, OnModuleInit, HttpStatus } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { RpcException } from '@nestjs/microservices';


@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit{

  private readonly logger = new Logger(ProductsService.name);

  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the DATABASE');

  }

  create(createProductDto: CreateProductDto) {
    this.logger.log('Creating a new product');
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

    this.logger.log(`Fetching products for page ${page} of ${lastPage}`);

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
    
    const product = await this.product.findFirst({
      where: { id, available: true }
    });
    this.logger.log(`Fetching product with ID ${id}`);

    if (!product) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message:`Product with ID ${id} not found.!!`
      });
    }
    this.logger.log(`Product with ID ${id} found`);
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    const { id: productId, ...data } = updateProductDto;

    await this.findOne(id);
    this.logger.log(`Updating product with ID ${id}`);
    return this.product.update({
      where: { id },
      data: data
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    this.logger.log(`Deleting product with ID ${id}`);
    const product = await this.product.update({
      where: { id },
      data: { 
        available: false 
      }
    });
    this.logger.log(`Product with ID ${id} deleted`);
    return {product, message: 'Product deleted successfully'};
  }
}
