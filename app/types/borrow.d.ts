interface AddBorrow {
  userId: number;
  book_id: number[];
  borrower_profile_id: number;
  borrow_date: string;
}

interface ReturnBorrow {
  id: number;
  borrow_status: number;
  returned_date: string;
  modified: string;
}

interface Borrow {
  id: number;
  borrow_status: 1 | 2;
  borrow_date: string;
  returned_date: string;
  created: string;
  modified: string;
  borrow_items: BorrowItem[];
  profile: Member;
}
