import { Component, OnInit } from '@angular/core';
import { BlogDataService } from '../../core/data-services/blog.data-service';
import { BlogTag } from '../../shared/models/blog-tag.model';

@Component({
  selector: 'oc-blog-author',
  templateUrl: './blog-author.component.html',
  styleUrl: './blog-author.component.scss'
})
export class BlogAuthorComponent implements OnInit {
  blogTags: BlogTag[] = [];

  constructor(
    private blogDataService: BlogDataService
  ) {}

  ngOnInit(): void {
    this.getAllBlogTags();
  }

  private getAllBlogTags() {
    this.blogDataService.getAllBlogTags().subscribe((blogTagsResponse: { tags: BlogTag[]}) => {
      this.blogTags = blogTagsResponse.tags;
    })
  }
}
