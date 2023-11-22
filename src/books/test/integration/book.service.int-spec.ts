import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { BooksService } from 'src/books/books.service';
import { CreateBookDto } from 'src/books/dto/create-book.dto';

describe('BooksService Integration', () => {
    let service: BooksService;
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        service = moduleRef.get(BooksService);
        await service.cleanDatabase();
    });
});