interface AddBook {
  title: string;
  author_id: number;
  genre_id: number;
  num_of_page: number;
}

interface Book {
  id: number;
  title: string;
  author_id: number;
  genre_id: number;
  num_of_page: number;
  created: string;
  is_active: boolean;
  modified: string;
}

interface UpdateBook {
  id: number;
  title: string;
  author_id: number;
  genre_id: number;
  modified: string;
}

interface ChangeBookStatus {
  id: number;
  is_active: boolean;
}
