import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';

describe('BooksController', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create a book', () => {
    const isbn = "ABCD-123";
    const title = "first book";
    const newBook = controller.create({
      isbn, title
    });
    expect(newBook).toEqual({
      id: 1,
      isbn,
      title,
      isDeleted: false,
    });
  });
});
