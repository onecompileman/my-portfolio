import { Component, OnInit } from '@angular/core';
import { BlogDataService } from '../../../core/data-services/blog.data-service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RichTextParseService } from '../../../core/services/rich-text-parse.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../../../shared/models/blog.model';
import Swal from 'sweetalert2';
import { Observable, zip } from 'rxjs';

@Component({
  selector: 'oc-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.scss',
})
export class BlogFormComponent implements OnInit {
  tagClasses: string[] = ['info', 'primary', 'success', 'warning'];
  imageSrc: string = null;
  imageHeaderFile: File;

  isImageHeaderError: boolean;
  isSavingDraft: boolean;
  isSavingPublish: boolean;

  blogForm: FormGroup;

  blog: Blog;

  constructor(
    private blogDataService: BlogDataService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private richTextParseService: RichTextParseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.blog = this.route.snapshot.data['blog'];
    this.initForm();
  }

  async save(isPublish: boolean) {
    console.log('here', this.blogForm.value);
    this.blogForm.markAllAsTouched();

    if (isPublish) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You are publishing this blog, this will be visible on the public site.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Publish',
      });

      if (!result.isConfirmed) return;
    }

    if (this.blogForm.valid && this.imageSrc) {
      const blog = {
        ...this.blog,
        ...this.blogForm.value,
      };

      blog.content = await this.parseContent(blog.content).toPromise();
      if (!this.imageSrc.includes('http')) {
        this.blogDataService
          .blogFileUpload(this.imageHeaderFile)
          .subscribe((fileResponse) => {
            blog.imageHeaderUrl = fileResponse.fileUrl;

            if (this.blog) {
              this.blogDataService
                .updateBlog(blog, isPublish)
                .subscribe((blog) => {
                  this.toastrService.success('Updated blog successfully');
                  this.router.navigate(['/admin/blogs']);
                });
            } else {
              this.blogDataService
                .insertBlog(blog, isPublish)
                .subscribe((blog) => {
                  this.toastrService.success('Added blog successfully');
                  this.router.navigate(['/admin/blogs']);
                });
            }
          });
      } else {
        if (this.blog) {
          blog.imageHeaderUrl = this.imageSrc;

          this.blogDataService.updateBlog(blog, isPublish).subscribe((blog) => {
            this.toastrService.success('Updated blog successfully');
            this.router.navigate(['/admin/blogs']);
          });
        } else {
          this.blogDataService.insertBlog(blog, isPublish).subscribe((blog) => {
            this.toastrService.success('Added blog successfully');
            this.router.navigate(['/admin/blogs']);
          });
        }
      }
    } else {
      this.isImageHeaderError = !this.imageSrc;
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.imageHeaderFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = <string>reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  private parseContent(html: string): Observable<string> {
    return new Observable((observer) => {
      const filesToUpload =
        this.richTextParseService.getImagesFileFromHTML(html);

      if (!filesToUpload.length) {
        observer.next(html);
        observer.complete();
      }

      const filesUploaded$ = zip(
        filesToUpload.map((file) => this.blogDataService.blogFileUpload(file))
      );

      filesUploaded$.subscribe((files) => {
        observer.next(
          this.richTextParseService.replaceBase64ImagesWithFileUrl(
            html,
            files.map((file) => file.fileUrl)
          )
        );
        observer.complete();
      });
    });
  }

  private initForm() {
    this.imageSrc = this.blog?.imageHeaderUrl;
    this.blogForm = this.formBuilder.group({
      title: [this.blog?.title, [Validators.required, Validators.minLength(10)]],
      imageHeaderUrl: [this.blog?.imageHeaderUrl],
      tags: [this.blog?.tags, [Validators.required]],
      tagClass: [this.blog?.tagClass, [Validators.required]],
      content: [this.blog?.content, [Validators.required, Validators.minLength(50)]],
    });
  }
}
