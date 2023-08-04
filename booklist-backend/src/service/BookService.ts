import { AppDataSource } from "../database";
import { Book } from "../entity/Book";
import { Order } from "../entity/Order";
import { Repository } from "typeorm";

export class BookService {
  private bookRepository: Repository<Book>;
  private orderRepository: Repository<Order>;

  constructor() {
    this.bookRepository = AppDataSource.getRepository(Book);
    this.orderRepository = AppDataSource.getRepository(Order);
  }
  async getAll() {
    const bookRepository = AppDataSource.getRepository(Book);
    const books = await bookRepository.find();
    return books;
  }

  async buyBook(bookId: number, quantity: number) {
    const now = new Date();
    const book = await this.bookRepository.findOne({ where: { id: bookId} });
    if(!book){
      return 'there is not book with this id'
    }
    
     if (book.stock >= quantity) {
      book.stock -= quantity;
      const order = await this.orderRepository.create({
        book: book,
        quantity: quantity,
        createdAt: now
        
      });

      await this.bookRepository.save(book);
      await this.orderRepository.save(order);
    } else {
      throw new Error("Not enough stock");
    }
    return book;
  }
    // const manager = getManager();
    // await manager.transaction(async (transactionalEntityManager) => {
      
    //   const book = await bookRepo.findOne({ where: { id: bookId} });
    //    console.log(book)
    //   if (book.stock >= quantity) {
    //     book.stock -= quantity;
    //     const order = await orderRepo.create({
    //       book: book,
    //       quantity: quantity,
    //     });
      
        // await transactionalEntityManager.save(book);
        // await transactionalEntityManager.save(order);
        
      // } else {
      //   throw new Error("Not enough stock");
      // }
    // });
  // }
}
