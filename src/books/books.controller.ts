// src/books/book.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { Book } from './book.entity';
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
    const book = await this.booksService.findOne(+id);
    if (!book) {
      throw new NotFoundException('Book does not exist!');
    }
    return book;
  }

  @Post()
  create(@Body() book: Book): Promise<Book> {
    return this.booksService.create(book);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() book: Book): Promise<Book> {
    return this.booksService.update(+id, book);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    const book = await this.booksService.findOne(+id);
    if (!book) {
      throw new NotFoundException('Book does not exist!');
    }
    return this.booksService.delete(+id);
  }
}
