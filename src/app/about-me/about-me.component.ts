import { Component } from '@angular/core';
import { Banner } from '../shared/models/banner.model';

@Component({
  selector: 'oc-about-me',
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  banners: Banner[] = [
    {
      name: 'Home',
      route: [],

    },
    {
      name: 'About Me',
      route: [],
      active: true
    }
  ]
}
