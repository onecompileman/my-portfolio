import { Component } from '@angular/core';
import { Banner } from '../../shared/models/banner.model';

@Component({
  selector: 'oc-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})
export class BlogDetailsComponent {
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
      active: true
    }
  ]
}
