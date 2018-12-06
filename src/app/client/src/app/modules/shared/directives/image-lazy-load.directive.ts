import { AfterViewInit, Directive, OnInit, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: 'img[appImageLazyLoad]'
})
export class ImageLazyLoadDirective implements OnInit, AfterViewInit {
  @HostBinding('attr.src') srcAttr = null;
  @Input() src: string;
  @Input() defaultImage: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.defaultImage) {
        this.loadImage(this.defaultImage);
    }
  }

  ngAfterViewInit() {
    this.canLazyLoad() ? this.lazyLoadImage() : this.loadImage('');
  }

  private canLazyLoad() {
    return window && 'IntersectionObserver' in window;
  }

  private lazyLoadImage() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting) {
          this.loadImage('');
          obs.unobserve(this.el.nativeElement);
        }
      });
    });
    obs.observe(this.el.nativeElement);
  }

  private loadImage(defaultimage) {
    this.srcAttr = defaultimage || this.src;
  }

}
