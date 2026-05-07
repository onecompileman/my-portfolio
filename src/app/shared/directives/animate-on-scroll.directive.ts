import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[animateOnScroll]',
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  @Input() animateOnScroll = 'animate__fadeInUp';
  @Input() animateDelay = '';

  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.style.opacity = '0';

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.el.nativeElement.style.opacity = '';
          if (this.animateDelay) {
            this.el.nativeElement.style.animationDelay = this.animateDelay;
          }
          this.el.nativeElement.classList.add('animate__animated', this.animateOnScroll);
          this.observer?.unobserve(this.el.nativeElement);
        }
      },
      { threshold: 0.15 }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
