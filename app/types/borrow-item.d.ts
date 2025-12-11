interface BorrowItem {
  id: number;
  borrow_id: number;
  book_id: number;
  current_borrow_item_status: 1 | 2;
  created: string;
  modified: string;
  book: Book;
}
