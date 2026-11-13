import { Module } from '@nestjs/common';
import { BookController } from './book.controller.js';
import { BookService } from './book.service.js';
import { BookSchema, Book } from './schemas/book.schema.js';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([
                { name: Book.name, schema: BookSchema }
            ]
        )
    ],
    controllers: [BookController],
    providers: [BookService],
    exports: [BookService],
})
export class BookModule {}
