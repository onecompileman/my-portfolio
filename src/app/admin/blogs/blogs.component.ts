import { Component, OnInit } from '@angular/core';
import { BlogDataService } from '../../core/data-services/blog.data-service';
import { Blog } from '../../shared/models/blog.model';
import { ResponseBodyList } from '../../shared/models/response-body-list.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, startWith } from 'rxjs';

@Component({
  selector: 'oc-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent implements OnInit {
  blogs: Blog[];

  totalCount: number;
  pages: number[] = [];
  paginationForm: FormGroup;

  constructor(
    private blogDataService: BlogDataService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getBlogList();
  }

  async deleteBlog(blog: Blog) {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are deleting this blog:' + blog.title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    });

    if (!result.isConfirmed) return;

    this.blogDataService.removeBlog(blog.id).subscribe(
      () => {
        this.toastrService.success('Successfully deleted blog!');
        this.paginationForm
          .get('query')
          .patchValue(this.paginationForm.get('query').value);
      },
      () => {
        this.toastrService.error('Error deleting blog');
      }
    );
  }

  private getBlogList() {
    this.paginationForm.valueChanges
      .pipe(
        startWith({
          page: 0,
          limit: 10,
          query: '',
        }),
        debounceTime(200)
      )
      .subscribe(({ page, limit, query }) => {
        this.blogDataService
          .getAllBlogs(page * limit, limit, query)
          .subscribe((blogResponse: ResponseBodyList<Blog>) => {
            this.blogs = blogResponse.data;
            this.totalCount = blogResponse.count;
            console.log(Math.ceil(blogResponse.count / limit));
            this.pages = Array(Math.ceil(blogResponse.count / limit) || 1).fill(0).map(
              (n, i) => i + 1
            );
          });
      });
  }

  private initForm() {
    this.paginationForm = this.formBuilder.group({
      page: [0],
      limit: [10],
      query: [''],
    });
  }
}
