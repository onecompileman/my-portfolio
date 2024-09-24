import { Component } from '@angular/core';
import { Banner } from '../shared/models/banner.model';

@Component({
  selector: 'oc-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent {
  banners: Banner[] = [
    {
      name: 'Home',
      route: ['/'],

    },
    {
      name: 'Blogs',
      route: [],
      active: true
    }
  ]
}
