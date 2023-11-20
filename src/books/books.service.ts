// src/books/book.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    return this.bookRepository.findOne({ where: { id } });
  }

  async create(book: Book): Promise<Book> {
    const newbook = this.bookRepository.create(book);
    return this.bookRepository.save(newbook);
  }

  async update(id: number, book: Book): Promise<Book> {
    await this.bookRepository.update(id, book);
    return this.bookRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
