import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';


export type BookDocument = Book & Document;

@Schema()
export class Book {
    @Prop({ required: true })
    public title: string;

    @Prop()
    public description: string;

    @Prop()
    public authors: string;

    @Prop()
    public favorite: boolean;

    @Prop()
    public fileCover?: string;

    @Prop()
    public fileName?: string;


    
}

export const BookSchema = SchemaFactory.createForClass(Book);