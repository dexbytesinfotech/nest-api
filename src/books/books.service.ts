// src/books/book.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({ where: { isDeleted: false }});
  }

  async findById(id: number): Promise<Book> {
    return this.bookRepository.findOne({ where: { id, isDeleted: false } });
  }

  async findByISBN(isbn: string): Promise<Book> {
    return this.bookRepository.findOne({ where: { isbn, isDeleted: false } });
  }

  async create(book: CreateBookDto): Promise<Book> {
    const newbook = this.bookRepository.create({
      title: book.title,
      isbn: book.isbn,
      isDeleted: false
    });
    return this.bookRepository.save(newbook);
  }

  async update(id: number, book: Book): Promise<Book> {
    await this.bookRepository.update(id, book);
    return this.bookRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.bookRepository.update(id, {
      isDeleted: true
    });
  }

  async deleteByIsbn(isbn: string): Promise<void> {
    await this.bookRepository.update({
      isbn
    }, {
      isDeleted: true
    });
  }

  async cleanDatabase() {
    return this.bookRepository.delete({});
  }
}
