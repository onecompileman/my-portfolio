import { Component, OnInit } from '@angular/core';
import { Banner } from '../shared/models/banner.model';
import { BlogDataService } from '../core/data-services/blog.data-service';
import { Blog } from '../shared/models/blog.model';
import { RichTextParseService } from '../core/services/rich-text-parse.service';
import { BlogTag } from '../shared/models/blog-tag.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, startWith } from 'rxjs';

@Component({
  selector: 'oc-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent implements OnInit {
  banners: Banner[] = [
    {
      name: 'Home',
      route: ['/'],
    },
    {
      name: 'Blogs',
      route: [],
      active: true,
    },
  ];

  blogs: Blog[] = [];
  maxItemsPerPage: number = 5;

  searchForm: FormGroup;

  searchQuery: string;

  constructor(
    private blogDataService: BlogDataService,
    private richTextParseService: RichTextParseService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllBlogs();

    this.route.queryParams.subscribe((query) => {
      if (query['tags'] !== this.searchForm.get('tags').value) {
        this.searchForm.get('tags').patchValue(query['tags']);
      }
    });
  }

  private getAllBlogs() {
    this.spinner.show();
    this.searchForm.valueChanges
      .pipe(startWith(this.searchForm.value), debounceTime(200))
      .subscribe(({ query, page, tags }) => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { query, page: page + 1 },
          queryParamsHandling: 'merge',
        });
        this.blogDataService
          .getAllPublishedBlogs(
            page * this.maxItemsPerPage,
            this.maxItemsPerPage,
            query,
            tags
          )
          .subscribe(
            (blogResponse) => {
              this.blogs = blogResponse.data.map((blog) => {
                blog.content = this.richTextParseService.removeAllImagesHtml(
                  blog.content
                );
                return blog;
              });
              setTimeout(() => {
                this.spinner.hide();
              }, 1000)
            },
            () => this.spinner.hide()
          );
      });
  }

  private initForm() {
    const page = this.route.snapshot.queryParams['page'];
    this.searchQuery = this.route.snapshot.queryParams['query'] || '';
    this.searchForm = this.formBuilder.group({
      query: [this.searchQuery],
      page: [page ? +page - 1 : 0],
      tags: [this.route.snapshot.queryParams['tags'] || ''],
    });
  }
}
