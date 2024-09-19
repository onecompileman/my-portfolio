import { Component } from '@angular/core';
import { Banner } from '../shared/models/banner.model';

@Component({
  selector: 'oc-talks',
  templateUrl: './talks.component.html',
  styleUrl: './talks.component.scss'
})
export class TalksComponent {
  banners: Banner[] = [
    {
      name: 'Home',
      route: ['/'],

    },
    {
      name: 'Talks',
      route: [],
      active: true
    }
  ]
}
