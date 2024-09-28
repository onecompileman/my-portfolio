import { Component, Input, OnInit } from '@angular/core';
import { BlogCommentDataService } from '../../core/data-services/blog-comment.data-service';
import { BlogComment } from '../../shared/models/blog-comment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'oc-blog-comment',
  templateUrl: './blog-comment.component.html',
  styleUrl: './blog-comment.component.scss',
})
export class BlogCommentComponent implements OnInit {
  @Input() blogId: number;

  blogComments: BlogComment[] = [];

  blogCommentForm: FormGroup;

  isSending: boolean;

  successSend: boolean;
  errorSend: boolean;

  isLoggedIn: boolean;

  constructor(
    private blogCommentDataService: BlogCommentDataService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllBlogComments();
    this.isLoggedIn = !!localStorage.getItem('authToken');
  }

  async deleteBlogComment(blogComment: BlogComment) {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are delete the blog comment from: ' + blogComment.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    });

    if (!result.isConfirmed) return;

    this.blogCommentDataService.deleteCommentById(blogComment.id).subscribe(
      () => {
        const indexToDelete = this.blogComments.findIndex(
          (comment) => comment.id === blogComment.id
        );
        this.blogComments.splice(indexToDelete, 1);
      },
      () => {
        this.toastrService.error('Error deleting blog comment');
      }
    );
  }

  sendBlogComment() {
    this.blogCommentForm.markAllAsTouched();

    if (this.blogCommentForm.valid && !this.isSending) {
      this.isSending = true;
      this.successSend = false;
      this.errorSend = false;

      this.blogCommentDataService
        .insertBlogComment(this.blogCommentForm.value, this.blogId)
        .subscribe(
          (blogComment: BlogComment) => {
            this.blogCommentForm.reset();
            this.blogComments.push(blogComment);
            this.successSend = true;
            this.isSending = false;
          },
          () => {
            this.errorSend = true;
            this.isSending = false;
          }
        );
    }
  }

  private getAllBlogComments() {
    this.blogCommentDataService
      .getAllBlogCommentsByBlogId(this.blogId, 0, 100)
      .subscribe((blogCommentResponse) => {
        this.blogComments = blogCommentResponse.data;
      });
  }

  private initForm() {
    this.blogCommentForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      comment: [null, [Validators.required]],
    });
  }
}
