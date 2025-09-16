interface AddMember {
  fullname: string;
  gender: string;
  age: number;
}

interface Member {
  id: number;
  user_id: number;
  fullname: string;
  gender: string;
  age: number;
  borrowing: number;
  created_at: string;
  is_active: boolean;
  modified: string;
}

interface UpdateMember {
  id: number;
  fullname: string;
  gender: string;
  age: number;
}
