import { Request, Response } from "express";
import { BookService } from "../service/BookService";
import { getManager } from "typeorm";
import { Order } from "../entity/Order";
import { Book } from "../entity/Book";
export class BookController {
  private bookService = new BookService();
  
  async getAll(req: Request, res: Response) {
    const books = await this.bookService.getAll();
    res.json(books); 
  }
  async buyBook(req: Request, res: Response) {
    const bookId = +req.params.id;
  const  {quantity}  = req.body; 
  
  const response= await this.bookService.buyBook(bookId, quantity);
  res.json(response); 
}
}
