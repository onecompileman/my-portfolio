export interface Blog {
  id?: number;
  title: string;
  imageHeaderUrl: string;
  tags: string;
  tagClass: string;
  content: string;
  publishDate?: string;
  createdAt?: string;
  updatedAt?: string;
  views?: number;
}
