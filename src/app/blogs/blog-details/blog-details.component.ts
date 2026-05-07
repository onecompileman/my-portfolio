import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Banner } from '../../shared/models/banner.model';
import { Blog } from '../../shared/models/blog.model';
import { ActivatedRoute } from '@angular/router';
import { BlogDataService } from '../../core/data-services/blog.data-service';
import PhotoSwipeLightbox from 'photoswipe/lightbox';

@Component({
  selector: 'oc-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss',
})
export class BlogDetailsComponent implements OnInit, AfterViewInit {
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
    private blogDataService: BlogDataService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.blog = this.route.snapshot.data['blog'];
    this.blogDataService.viewBlog(this.blog.id).subscribe();
  }

  ngAfterViewInit(): void {
    // Quill renders asynchronously, give it a tick before scanning images
    setTimeout(() => this.initBlogImageLightbox(), 300);
  }

  onHeaderImageLoad(img: HTMLImageElement, link: HTMLAnchorElement): void {
    if (img.naturalWidth) {
      link.setAttribute('data-pswp-width', String(img.naturalWidth));
      link.setAttribute('data-pswp-height', String(img.naturalHeight));
    }
  }

  private initBlogImageLightbox(): void {
    const richContent: HTMLElement = this.elementRef.nativeElement.querySelector('.oc-blogs__blog-rich');
    const imgs: HTMLImageElement[] = richContent
      ? Array.from(richContent.querySelectorAll('img'))
      : [];

    const wrapImage = (img: HTMLImageElement) => {
      if (img.parentElement?.classList.contains('pswp-blog-image')) return;

      const a = document.createElement('a');
      a.className = 'pswp-blog-image';
      a.href = img.src;
      a.setAttribute('data-pswp-width', String(img.naturalWidth || 1200));
      a.setAttribute('data-pswp-height', String(img.naturalHeight || 800));

      img.parentNode?.insertBefore(a, img);
      a.appendChild(img);
    };

    const initLightbox = () => {
      const lightbox = new PhotoSwipeLightbox({
        gallery: '.oc-blogs__blog-content',
        children: '.pswp-blog-image',
        pswpModule: () => import('photoswipe'),
      });
      lightbox.init();
    };

    if (!imgs.length) {
      initLightbox();
      return;
    }

    const loadPromises = imgs.map(img => {
      if (img.complete && img.naturalWidth > 0) {
        wrapImage(img);
        return Promise.resolve();
      }
      return new Promise<void>(resolve => {
        img.onload = () => { wrapImage(img); resolve(); };
        img.onerror = () => resolve();
      });
    });

    Promise.all(loadPromises).then(initLightbox);
  }
}
