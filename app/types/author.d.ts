interface AddAuthor {
  name: string;
}

interface UpdateAuthor {
  id: number;
  name: string;
  modified: string;
}

interface ChangeStatusAuthor {
  id: number;
  is_active: boolean;
}

interface Author {
  id: number;
  name: string;
  created: string;
  is_active: boolean;
  modified: string;
}
