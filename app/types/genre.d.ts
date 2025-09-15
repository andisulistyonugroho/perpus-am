interface AddGenre {
  title: string;
}

interface UpdateGenre {
  id: number;
  title: string;
}

interface ChangeGenreStatus {
  id: number;
  is_active: boolean;
}

interface Genre {
  id: number;
  title: string;
  created: string;
  is_active: boolean;
  modified: string;
}
