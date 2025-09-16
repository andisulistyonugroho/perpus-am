interface AddBook {
  title: string;
  author_id: number;
  genre_id: number;
  num_of_page: number;
  year: number;
}

interface Book {
  id: number;
  title: string;
  author_id: number;
  genre_id: number;
  num_of_page: number;
  year: number;
  state: number;
  borrowed: number;
  created: string;
  is_active: boolean;
  modified: string;
  author: Author;
  genre: Genre;
}

interface UpdateBook {
  id: number;
  title: string;
  author_id: number;
  genre_id: number;
  num_of_page: number;
  year: number;
}

interface ChangeBookStatus {
  id: number;
  is_active: boolean;
}
