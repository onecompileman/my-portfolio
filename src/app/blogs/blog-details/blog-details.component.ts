import { Component, OnInit } from '@angular/core';
import { Banner } from '../../shared/models/banner.model';
import { Blog } from '../../shared/models/blog.model';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { BlogDataService } from '../../core/data-services/blog.data-service';

@Component({
  selector: 'oc-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss',
})
export class BlogDetailsComponent implements OnInit {
  banners: Banner[] = [
    {
      name: 'Home',
      route: ['/'],
    },
    {
      name: 'Blogs',
      route: ['/blogs'],
    },
    {
      name: 'Blogs Details',
      route: ['/blogs'],
      active: true,
    },
  ];

  blog: Blog;

  constructor(
    private route: ActivatedRoute,
    private blogDataService: BlogDataService
  ) {}

  ngOnInit(): void {
    this.blog = this.route.snapshot.data['blog'];
    this.blogDataService.viewBlog(this.blog.id).subscribe();
  }
}
