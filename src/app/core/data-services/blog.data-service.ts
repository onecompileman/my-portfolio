import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadResponse } from '../../shared/models/file-upload-response.model';
import { Blog } from '../../shared/models/blog.model';
import { ResponseBodyList } from '../../shared/models/response-body-list.model';
import { BlogTag } from '../../shared/models/blog-tag.model';
import { removeNullProperties } from '../utils/remove-null-properties.util';

@Injectable({
  providedIn: 'root',
})
export class BlogDataService {
  constructor(private http: HttpClient) {}

  blogFileUpload(file: File): Observable<FileUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<FileUploadResponse>(
      'blogs/blog-file-upload',
      formData
    );
  }

  insertBlog(blog: Blog, isPublish: boolean = false): Observable<Blog> {
    return this.http.post<Blog>('blogs', blog, {
      params: {
        isPublish,
      },
    });
  }

  updateBlog(blog: Blog, isPublish: boolean = false): Observable<Blog> {
    return this.http.put<Blog>('blogs/' + blog.id, blog, {
      params: {
        isPublish,
      },
    });
  }

  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>('blogs/' + id);
  }

  getAllBlogs(
    skip: number = 0,
    limit: number = 10,
    query: string = '',
    tags: string = ''
  ): Observable<ResponseBodyList<Blog>> {
    return this.http.get<ResponseBodyList<Blog>>('blogs', {
      params: {
        skip,
        limit,
        query,
        tags,
      },
    });
  }

  viewBlog(blogId: number): Observable<any> {
    return this.http.get('blogs/' + blogId + '/view');
  }

  getAllPublishedBlogs(
    skip: number = 0,
    limit: number = 10,
    query: string = '',
    tags: string = ''
  ): Observable<ResponseBodyList<Blog>> {
    return this.http.get<ResponseBodyList<Blog>>('blogs/published', {
      params: removeNullProperties({
        skip,
        limit,
        tags,
        query,
      }),
    });
  }

  removeBlog(id: number): Observable<any> {
    return this.http.delete<Blog>('blogs/' + id);
  }

  getAllBlogTags(): Observable<{ tags: BlogTag[] }> {
    return this.http.get<{ tags: BlogTag[] }>('blogs/tags');
  }
}
