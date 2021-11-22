import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly configService: ConfigService,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productRepository.save(createProductDto);
  }

  async findAll() {
    const userProducts = await this.productRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.weeklyProducts', 'pw')
      .where('pw.active = :active', { active: true })
      .getMany();

    return userProducts;
  }

  findOne(findOneOptions: FindOneOptions) {
    return this.productRepository.findOne(findOneOptions);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.findOne({
      where: { id: id },
    });
    if (!productToUpdate.id) return `There is no product with id #${id}`;
    await this.productRepository.update(id, updateProductDto);
    return this.productRepository.findOne({ where: { id: id } });
  }

  async remove(id: number) {
    const productToDelete = await this.productRepository.findOne({
      where: { id: id },
    });

    if (!productToDelete.id) {
      return `There is no product with id #${id}`;
    } else {
      await this.productRepository.delete(id);
      return `The product with the id #${id} was removed`;
    }
  }
}
