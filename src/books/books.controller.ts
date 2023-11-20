// src/books/book.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, ConflictException } from '@nestjs/common';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Book> {
    const book = await this.booksService.findById(+id);
    if (!book) {
      throw new NotFoundException('Book does not exist!');
    }
    return book;
  }

  @Post()
  async create(@Body() book: CreateBookDto): Promise<Book> {
    const exists = await this.booksService.findByISBN(book.isbn);
    if (exists) {
      throw new ConflictException('Book exist!');
    }
    return this.booksService.create(book);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() book: Book): Promise<Book> {
    return this.booksService.update(+id, book);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    const book = await this.booksService.findById(+id);
    if (!book) {
      throw new NotFoundException('Book does not exist!');
    }
    return this.booksService.delete(+id);
  }
}
