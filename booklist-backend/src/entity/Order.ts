import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Book } from './Book';
@Entity()
export class Order implements Order {

  @PrimaryGeneratedColumn()
  Orderid: number;
  
  @Column()
  bookId: number;

  @Column()
  quantity: number;
    
  @Column()
  createdAt: Date;
  
  // Relations
  @ManyToOne(() => Book, book => book.orders)
  book: Book;
}