interface Writer {
  id: number;
  nickname: string;
  image?: string;
}

export interface BoardList {
  id: number;
  title: string;
  content: string;
  image?: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
}

export interface Comment {
  writer: Writer;
  createdAt: string;
  updatedAt: string;
  content: string;
  id: number;
}
