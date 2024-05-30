interface Writer {
  id: number;
  nickname: string;
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
