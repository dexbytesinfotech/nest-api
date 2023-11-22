import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { BooksService } from '../../books.service';
import { CreateBookDto } from '../../dto/create-book.dto';

describe('BooksService Integration', () => {
    let service: BooksService;
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        service = moduleRef.get(BooksService);
        await service.cleanDatabase();
    });

    describe('Workflow test', () => {
        let userId: number;
        const dto1: CreateBookDto = {
          title: 'First book',
          isbn: 'ABC-123',
        };
        const dto2: CreateBookDto = {
            title: 'Second book',
            isbn: 'ABC-124',
          };
        it('should create book', async () => {
          await service.create(dto1);
        });
        it('should count number of books as 1', async () => {
          const books = await service.findAll();
          expect(books.length).toBe(1);
        });
        it('should create another book', async () => {
          await service.create(dto2);
        });
        it('should count number of books as 2', async () => {
          const books = await service.findAll();
          expect(books.length).toBe(2);
        });
        it('should delete book', async () => {
          await service.deleteByIsbn(dto1.isbn);
        });
        it('should count number of books as 1', async () => {
          const books = await service.findAll();
          expect(books.length).toBe(1);
        });
      });
});