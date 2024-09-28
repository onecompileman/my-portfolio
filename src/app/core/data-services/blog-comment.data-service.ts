import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogComment } from '../../shared/models/blog-comment.model';
import { ResponseBodyList } from '../../shared/models/response-body-list.model';

@Injectable({
  providedIn: 'root',
})
export class BlogCommentDataService {
  constructor(private http: HttpClient) {}

  insertBlogComment(
    blogComment: BlogComment,
    blogId: number
  ): Observable<BlogComment> {
    return this.http.post<BlogComment>('blog-comment', {
      ...blogComment,
      blog: { id: blogId },
    });
  }

  getAllBlogCommentsByBlogId(
    blogId: number,
    skip: number = 0,
    limit: number = 10,
    query: string = '',
    tags: string = ''
  ): Observable<ResponseBodyList<BlogComment>> {
    return this.http.get<ResponseBodyList<BlogComment>>(
      'blog-comment/' + blogId,
      {
        params: {
          skip,
          limit,
          query,
          tags,
        },
      }
    );
  }

  deleteCommentById(id: number): Observable<any> {
    return this.http.delete('blog-comment/' + id);
  }
}
